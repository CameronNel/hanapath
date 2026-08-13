import base64, concurrent.futures as cf, hashlib, html, io, json, re, time
from pathlib import Path
import requests
from PIL import Image, ImageOps

UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/125 Safari/537.36'
S=requests.Session(); S.headers.update({'User-Agent':UA,'Accept-Language':'en-US,en;q=0.9'})
TIMEOUT=18; MAX_CASES=125; MAX_IMAGES=4
OUT=Path(__file__).with_name('index.html'); REPORT=Path(__file__).with_name('report.json')
EARLY=('immediate','on table','on-table','day 1','day one','1 day','2 day','3 day','4 day','5 day','6 day','7 day','days post','1 week','one week','week post','cast off','cast-off','cast removal','surgery day','post op day')
LATE=('1 month','2 month','3 month','4 month','5 month','6 month','7 month','8 month','9 month','10 month','11 month','12 month','months post','month post','1 year','year post')
ALAR=('alar','nostril','upturned','retract','retraction','notch','pinch','columella','over-rotat','nostril show')
BAD=re.compile(r'(logo|avatar|icon|sprite|favicon|emoji|badge|placeholder|loading|tracking|pixel|doctor|author|profile)',re.I)
IMG=re.compile(r'https?://[^\\s\\\"\\\'<>\\\\]+?\\.(?:jpe?g|png|webp)(?:\\?[^\\s\\\"\\\'<>\\\\]*)?',re.I)
REVIEW=re.compile(r'https?://(?:www\\.)?realself\\.com/review/[A-Za-z0-9_%?=&./\\-]+',re.I)

def get(url,jina=True):
    for u in ([url, 'https://r.jina.ai/http://'+url.split('://',1)[-1]] if jina else [url]):
        try:
            r=S.get(u,timeout=TIMEOUT,allow_redirects=True)
            if r.ok and len(r.text)>500:return r.text
        except Exception:pass
    return ''

def discover():
    found=[]; seen=set()
    for p in range(1,61):
        txt=get(f'https://www.realself.com/reviews/rhinoplasty?page={p}')
        if not txt: continue
        for u in REVIEW.findall(txt.replace('\\\\/','/')):
            u=u.rstrip(').,\\\"\\\'')
            if u not in seen:
                seen.add(u); found.append(u)
        print('index',p,'reviews',len(found),flush=True)
        if len(found)>=550:break
    seeds=[
      'https://www.realself.com/review/rhinoplasty-before-photos-1day-post-op',
      'https://www.realself.com/review/rhinoplasty-honest-review-weeks-post-op',
      'https://www.realself.com/review/revision-rhinoplasty-nose-grafting-alar-retraction',
      'https://www.realself.com/review/rhinoplasty-journey-drooping-tip-hump-swelling-asymmetry',
      'https://www.realself.com/review/rhinoplasty-anesthesia-breathing-recovery-dorsal-hump',
      'https://www.realself.com/review/honest-review-rhinoplasty-experience',
      'https://www.realself.com/review/22-yrs-mixed-race-rhinoplasty-north-west-uk',
      'https://www.realself.com/review/rhinoplasty-surgery-date-19-november',
      'https://www.realself.com/review/rhinoplasty-major-pre-surgery-anxiety',
      'https://www.realself.com/review/rhinoplasty-6-months-big-hooked-nose-6-months-swelling-tip']
    return seeds+[u for u in found if u not in seeds]

def timeline(txt):
    s=re.sub(r'\\s+',' ',txt).lower()
    return any(k in s for k in EARLY) and any(k in s for k in LATE)

def image_urls(txt):
    out=[]
    for u in IMG.findall(txt.replace('\\\\/','/')):
        if BAD.search(u):continue
        if u not in out:out.append(u)
    def score(u):
        x=u.lower(); n=0
        for w in ('realself','patient','review','photo','upload','before','after','rhinoplasty'):n+=3 if w in x else 0
        return -n
    return sorted(out,key=score)[:35]

def embed(u):
    try:
        r=S.get(u,timeout=TIMEOUT,headers={'User-Agent':UA,'Referer':'https://www.realself.com/'})
        if not r.ok or len(r.content)<12000:return None
        im=Image.open(io.BytesIO(r.content)); im=ImageOps.exif_transpose(im).convert('RGB'); w,h=im.size
        if w<260 or h<180 or w*h<100000 or max(w/h,h/w)>5:return None
        im.thumbnail((900,900),Image.Resampling.LANCZOS)
        b=io.BytesIO(); im.save(b,'JPEG',quality=72,optimize=True,progressive=True); raw=b.getvalue()
        return base64.b64encode(raw).decode(),hashlib.sha1(raw).hexdigest(),im.width,im.height
    except Exception:return None

def process(url):
    txt=get(url)
    if not txt or not timeline(txt):return None
    low=txt.lower()
    if 'rhinoplasty' not in low and 'nose job' not in low:return None
    imgs=[]; seen=set()
    for u in image_urls(txt):
        e=embed(u)
        if not e or e[1] in seen:continue
        seen.add(e[1]); imgs.append('data:image/jpeg;base64,'+e[0])
        if len(imgs)>=MAX_IMAGES:break
    if len(imgs)<2:return None
    title='Rhinoplasty recovery case'
    m=re.search(r'^Title:\\s*(.+)$',txt,re.M|re.I)
    if m:title=m.group(1).strip()[:180]
    else:
        m=re.search(r'^#\\s+(.+)$',txt,re.M)
        if m:title=m.group(1).strip()[:180]
    alar=any(k in (title+' '+low[:30000]).lower() for k in ALAR)
    return {'title':title,'url':url,'alar':alar,'images':imgs}

def build(cases):
    cases=sorted(cases,key=lambda c:(not c['alar'],c['title'].lower()))
    data=json.dumps(cases,ensure_ascii=False,separators=(',',':'))
    return f'''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rhinoplasty Healing Gallery</title><style>:root{{--bg:#0d1015;--p:#181c23;--l:#343c49;--t:#f3f5f7;--m:#a2acb9;--a:#91bdff;--hot:#ff9caf}}*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--t);font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial}}header{{position:sticky;top:0;z-index:3;background:#0d1015f2;border-bottom:1px solid var(--l);padding:12px 14px}}h1{{font-size:19px;margin:0}}.sub,.small{{font-size:12px;color:var(--m)}}select,button{{margin-top:9px;background:#222833;color:var(--t);border:1px solid var(--l);border-radius:10px;padding:9px 11px}}main{{max-width:980px;margin:auto;padding:14px}}.card{{background:var(--p);border:1px solid var(--l);border-radius:16px;padding:15px}}h2{{font-size:21px;margin:7px 0}}.badge{{display:inline-block;border:1px solid var(--l);border-radius:99px;padding:4px 8px;font-size:11px;color:var(--m)}}.hot{{color:var(--hot);border-color:#70424d}}.photos{{display:grid;gap:12px;margin-top:12px}}.photos.two{{grid-template-columns:1fr 1fr}}.photo{{background:#090c10;border:1px solid var(--l);border-radius:13px;padding:7px}}img{{display:block;max-width:100%;max-height:76vh;margin:auto;border-radius:9px}}.nav{{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}}.nav button{{padding:13px;font-weight:700}}a{{color:var(--a)}}@media(max-width:700px){{.photos.two{{grid-template-columns:1fr}}}}</style></head><body><header><h1>Rhinoplasty Healing Photo Library</h1><div class="sub">Photos are embedded in this HTML. Arrow keys work too.</div><select id="f"><option value="all">All qualifying cases</option><option value="alar">High alar / nostril relevant</option></select> <button id="r">Random</button><div id="count" class="small"></div></header><main><div class="card"><div id="num" class="small"></div><h2 id="title"></h2><div id="badge"></div><div id="photos" class="photos"></div><p class="small">These are public patient-photo timelines. Early images are not final outcomes; angle, swelling and lighting matter.</p><p id="src" class="small"></p><div class="nav"><button id="p">← Previous</button><button id="n">Next →</button></div></div></main><script>const A={data};let V=[...A],i=0,$=x=>document.getElementById(x);function R(){{let c=V[i];$('count').textContent=V.length+' cases';$('num').textContent='Case '+(i+1)+' of '+V.length;$('title').textContent=c.title;$('badge').innerHTML=c.alar?'<span class="badge hot">High alar / nostril relevant</span>':'<span class="badge">Rhinoplasty timeline</span>';$('photos').className='photos '+(c.images.length>1?'two':'');$('photos').innerHTML=c.images.map(s=>'<div class="photo"><img src="'+s+'"></div>').join('');$('src').innerHTML='Original source: <a target=_blank href="'+c.url+'">'+c.url+'</a>'}}$('p').onclick=()=>{{i=(i-1+V.length)%V.length;R();scrollTo(0,0)}};$('n').onclick=()=>{{i=(i+1)%V.length;R();scrollTo(0,0)}};$('r').onclick=()=>{{i=Math.floor(Math.random()*V.length);R()}};$('f').onchange=e=>{{V=e.target.value==='alar'?A.filter(x=>x.alar):[...A];i=0;R()}};onkeydown=e=>{{if(e.key==='ArrowRight')$('n').click();if(e.key==='ArrowLeft')$('p').click()}};R();</script></body></html>'''

def main():
    urls=discover(); print('candidate reviews',len(urls),flush=True)
    cases=[]
    with cf.ThreadPoolExecutor(max_workers=10) as ex:
        fs={ex.submit(process,u):u for u in urls[:500]}
        for f in cf.as_completed(fs):
            try:c=f.result()
            except Exception:c=None
            if c:
                cases.append(c); print('accepted',len(cases),c['title'],flush=True)
                if len(cases)>=MAX_CASES:break
    OUT.write_text(build(cases),encoding='utf-8')
    REPORT.write_text(json.dumps({'qualifying_cases':len(cases),'high_alar_cases':sum(c['alar'] for c in cases),'candidate_reviews':len(urls),'generated_at':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())},indent=2),encoding='utf-8')
    print('DONE',len(cases),'cases',round(OUT.stat().st_size/1048576,2),'MB',flush=True)
    if len(cases)<100:raise SystemExit('Fewer than 100 qualifying cases; refusing to call the gallery complete.')
if __name__=='__main__':main()
