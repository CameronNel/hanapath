import base64, concurrent.futures as cf, hashlib, io, json, re, time
from pathlib import Path
from urllib.parse import urljoin
import requests
from PIL import Image, ImageOps

UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/125 Safari/537.36'
TL=requests.sessions.Session(); TL.headers.update({'User-Agent':UA,'Accept-Language':'en-US,en;q=0.9'})
TIMEOUT=14; TARGET=110; MAX_IMAGES=5
OUT=Path(__file__).with_name('index.html'); REPORT=Path(__file__).with_name('report.json')
EARLY=('immediate','on table','on-table','operating table','surgery day','day 1','day one','1 day post','2 days post','3 days post','4 days post','5 days post','6 days post','7 days post','1 week post','one week post','week post-op','cast off','cast-off','cast removal','post op day','post-op day','2 weeks post','two weeks post')
LATE=('1 month post','2 month','3 month','4 month','5 month','6 month','7 month','8 month','9 month','10 month','11 month','12 month','months post','month post-op','1 year','year post')
ALAR=('alar','nostril','upturned','retract','retraction','notch','pinch','columella','over-rotat','nostril show','alar rim')
TRUE_IMMEDIATE=('immediate','on table','on-table','operating table','surgery day','day 1','day one','1 day post','post op day 1','post-op day 1')
BAD=re.compile(r'(logo|avatar|icon|sprite|favicon|emoji|badge|placeholder|loading|tracking|pixel|doctor|author|profile|flag|stars|rating)',re.I)
ABS_REVIEW=re.compile(r'https?://(?:www\.)?realself\.com/review/[A-Za-z0-9_%?=&./\-]+',re.I)
REL_REVIEW=re.compile(r'(?:href=["\']|\]\()(/review/[A-Za-z0-9_%?=&./\-]+)',re.I)
RAW_REL=re.compile(r'(?<![A-Za-z0-9])(/review/[A-Za-z0-9_%?=&./\-]{8,})',re.I)
IMG_MD=re.compile(r'!\[[^\]]*\]\((https?://[^)\s]+)',re.I)
IMG_RAW=re.compile(r'https?://[^\s\"\'<>\\]+?\.(?:jpe?g|png|webp)(?:\?[^\s\"\'<>\\]*)?',re.I)

def session():
    # Requests sessions are not guaranteed thread-safe; make a lightweight per-call session.
    s=requests.Session(); s.headers.update({'User-Agent':UA,'Accept-Language':'en-US,en;q=0.9'}); return s

def fetch(url):
    try:
        r=session().get(url,timeout=TIMEOUT,allow_redirects=True)
        if r.ok and len(r.text)>400:return r.text
    except Exception: pass
    return ''

def jina(url):
    j='https://r.jina.ai/http://'+url.split('://',1)[-1]
    try:
        r=session().get(j,timeout=TIMEOUT,allow_redirects=True)
        if r.ok and len(r.text)>400:return r.text
    except Exception: pass
    return ''

def discover_page(p):
    url='https://www.realself.com/reviews/rhinoplasty'+(f'?page={p}' if p>1 else '')
    txt=fetch(url)
    # RealSelf's SSR uses relative links. The previous builder only looked for absolute URLs.
    clean=txt.replace('\\/','/')
    found=set(ABS_REVIEW.findall(clean))
    for path in REL_REVIEW.findall(clean)+RAW_REL.findall(clean): found.add(urljoin('https://www.realself.com',path))
    if len(found)<4:
        md=jina(url).replace('\\/','/')
        found.update(ABS_REVIEW.findall(md))
        for path in REL_REVIEW.findall(md)+RAW_REL.findall(md): found.add(urljoin('https://www.realself.com',path))
    return sorted(u.rstrip(').,\"\'') for u in found if '/review/' in u)

def discover():
    allu=[]; seen=set()
    with cf.ThreadPoolExecutor(max_workers=12) as ex:
        fs={ex.submit(discover_page,p):p for p in range(1,151)}
        for f in cf.as_completed(fs):
            try: urls=f.result()
            except Exception: urls=[]
            for u in urls:
                if u not in seen: seen.add(u); allu.append(u)
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
'https://www.realself.com/review/rhinoplasty-6-months-big-hooked-nose-6-months-swelling-tip',
'https://www.realself.com/review/rhinoplasty-great-results-two-months-after-surgery',
'https://www.realself.com/review/rhinoplasty-2-months-post-op-results',
'https://www.realself.com/review/rhinoplasty-great-results-amazing-care-swelling-fast-recovery',
'https://www.realself.com/review/rhinoplasty-6-months-post-op-comfortable-results',
'https://www.realself.com/review/rhinoplasty-natural-profile-straight-features-process-happy',
'https://www.realself.com/review/rhinoplasty-the-journey',
'https://www.realself.com/review/rhinoplasty-2-weeks-post-op-bump-hook-bridge',
'https://www.realself.com/review/rhinoplasty-2-weeks-post-op-swollen-profile-healing-bruising',
'https://www.realself.com/review/rhinoplasty-2-months-post-op-loving-results',
'https://www.realself.com/review/rhinoplasty-crippling-insecurity-boost-confidence',
'https://www.realself.com/review/rhinoplasty-months-post-op-1',
'https://www.realself.com/review/rhinoplasty-nostrils-huge-after-rhinoplasti',
'https://www.realself.com/review/rhinoplasty-swollen-thick-skin-no-bruising-swelling',
'https://www.realself.com/review/rhinoplasty-poc-experience',
'https://www.realself.com/review/rhinoplasty-bump-deviated-septum-perfect-breathing']
    return seeds+[u for u in allu if u not in seeds]

def has_timeline(txt):
    s=re.sub(r'\s+',' ',txt).lower()
    return any(k in s for k in EARLY) and any(k in s for k in LATE)

def image_urls(md,raw):
    out=[]
    def add(u):
        u=u.replace('&amp;','&').rstrip(').,\"\'')
        if not u.startswith('http') or BAD.search(u) or u in out:return
        # Prefer RealSelf-hosted content. Other domains are usually provider avatars/ads.
        if 'realself' not in u and 'cloudfront' not in u and 'amazonaws' not in u:return
        out.append(u)
    for u in IMG_MD.findall(md): add(u)
    for u in IMG_RAW.findall(md): add(u)
    for u in IMG_RAW.findall(raw.replace('\\/','/')): add(u)
    return out[:55]

def embed(u):
    try:
        r=session().get(u,timeout=TIMEOUT,headers={'User-Agent':UA,'Referer':'https://www.realself.com/'},allow_redirects=True)
        if not r.ok or len(r.content)<9000:return None
        im=Image.open(io.BytesIO(r.content)); im=ImageOps.exif_transpose(im).convert('RGB'); w,h=im.size
        if w<240 or h<180 or w*h<85000 or max(w/h,h/w)>5.5:return None
        im.thumbnail((760,760),Image.Resampling.LANCZOS)
        b=io.BytesIO(); im.save(b,'JPEG',quality=62,optimize=True,progressive=True); raw=b.getvalue()
        return base64.b64encode(raw).decode(),hashlib.sha1(raw).hexdigest()
    except Exception:return None

def title_from(md,url):
    m=re.search(r'^Title:\s*(.+)$',md,re.M|re.I)
    if m:return m.group(1).strip()[:180]
    m=re.search(r'^#\s+(.+)$',md,re.M)
    if m:return m.group(1).strip()[:180]
    return url.rsplit('/',1)[-1].replace('-',' ').title()[:180]

def process(url):
    md=jina(url)
    if len(md)<500:return None
    low=md.lower()
    if ('rhinoplasty' not in low and 'nose job' not in low) or not has_timeline(md):return None
    raw=fetch(url)
    urls=image_urls(md,raw)
    imgs=[]; hashes=set()
    for u in urls:
        e=embed(u)
        if not e or e[1] in hashes:continue
        hashes.add(e[1]); imgs.append('data:image/jpeg;base64,'+e[0])
        if len(imgs)>=MAX_IMAGES:break
    if len(imgs)<2:return None
    title=title_from(md,url)
    alar=any(k in low for k in ALAR)
    immediate=any(k in low for k in TRUE_IMMEDIATE)
    return {'title':title,'url':url,'alar':alar,'immediate':immediate,'images':imgs}

def build(cases):
    cases=sorted(cases,key=lambda c:(not c['alar'],not c['immediate'],c['title'].lower()))
    data=json.dumps(cases,ensure_ascii=False,separators=(',',':'))
    return '''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rhinoplasty Healing Gallery</title><style>:root{--bg:#0d1015;--p:#181c23;--l:#343c49;--t:#f3f5f7;--m:#a2acb9;--a:#91bdff;--hot:#ff9caf;--g:#8de4ae}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--t);font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial}header{position:sticky;top:0;z-index:3;background:#0d1015f2;border-bottom:1px solid var(--l);padding:12px 14px}h1{font-size:19px;margin:0}.sub,.small{font-size:12px;color:var(--m)}select,button{margin-top:9px;background:#222833;color:var(--t);border:1px solid var(--l);border-radius:10px;padding:9px 11px}main{max-width:1000px;margin:auto;padding:14px}.card{background:var(--p);border:1px solid var(--l);border-radius:16px;padding:15px}h2{font-size:21px;margin:7px 0}.badge{display:inline-block;border:1px solid var(--l);border-radius:99px;padding:4px 8px;font-size:11px;color:var(--m);margin-right:5px}.hot{color:var(--hot);border-color:#70424d}.green{color:var(--g);border-color:#356047}.photos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:12px}.photo{background:#090c10;border:1px solid var(--l);border-radius:13px;padding:7px;display:flex;align-items:center;justify-content:center;min-height:220px}img{display:block;max-width:100%;max-height:76vh;margin:auto;border-radius:9px}.nav{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.nav button{padding:13px;font-weight:700}a{color:var(--a)}@media(max-width:700px){.photos{grid-template-columns:1fr}}</style></head><body><header><h1>Rhinoplasty Healing Photo Library</h1><div class="sub">Patient photos are embedded in this HTML. No hot-linking required. Arrow keys work.</div><select id="f"><option value="all">All qualifying cases</option><option value="alar">High alar / nostril relevant</option><option value="immediate">Mentions immediate / on-table / day-1</option></select> <button id="r">Random</button><div id="count" class="small"></div></header><main><div class="card"><div id="num" class="small"></div><h2 id="title"></h2><div id="badge"></div><div id="photos" class="photos"></div><p class="small">Each accepted page contains an early postoperative stage plus a later month/year stage in its timeline. The embedded photos are shown in source-page order. Photography, swelling and angle can change apparent alar position.</p><p id="src" class="small"></p><div class="nav"><button id="p">← Previous</button><button id="n">Next →</button></div></div></main><script>const A='''+data+''';let V=[...A],i=0,$=x=>document.getElementById(x);function R(){let c=V[i];$('count').textContent=V.length+' cases';$('num').textContent='Case '+(i+1)+' of '+V.length;$('title').textContent=c.title;$('badge').innerHTML=(c.alar?'<span class="badge hot">High alar / nostril relevant</span>':'')+(c.immediate?'<span class="badge green">Immediate / on-table / day-1 mentioned</span>':'<span class="badge">Early → later timeline</span>');$('photos').innerHTML=c.images.map(s=>'<div class="photo"><img loading="lazy" src="'+s+'"></div>').join('');$('src').innerHTML='Original source: <a target=_blank rel=noopener href="'+c.url+'">'+c.url+'</a>'}$('p').onclick=()=>{i=(i-1+V.length)%V.length;R();scrollTo(0,0)};$('n').onclick=()=>{i=(i+1)%V.length;R();scrollTo(0,0)};$('r').onclick=()=>{i=Math.floor(Math.random()*V.length);R()};$('f').onchange=e=>{V=e.target.value==='alar'?A.filter(x=>x.alar):e.target.value==='immediate'?A.filter(x=>x.immediate):[...A];i=0;R()};onkeydown=e=>{if(e.key==='ArrowRight')$('n').click();if(e.key==='ArrowLeft')$('p').click()};R();</script></body></html>'''

def main():
    urls=discover(); print('candidate reviews',len(urls),flush=True)
    cases=[]; checked=0
    # Batch processing prevents waiting on hundreds of unnecessary slow requests after target is reached.
    for start in range(0,min(len(urls),1800),180):
        batch=urls[start:start+180]
        with cf.ThreadPoolExecutor(max_workers=18) as ex:
            for c in ex.map(process,batch):
                checked+=1
                if c:
                    cases.append(c); print('accepted',len(cases),'immediate' if c['immediate'] else 'early',c['title'][:90],flush=True)
        if len(cases)>=TARGET:break
    # Keep a manageable, high-value set, prioritising alar-relevant and immediate cases.
    cases=sorted(cases,key=lambda c:(not c['alar'],not c['immediate']))[:125]
    OUT.write_text(build(cases),encoding='utf-8')
    report={'qualifying_cases':len(cases),'high_alar_cases':sum(c['alar'] for c in cases),'immediate_cases':sum(c['immediate'] for c in cases),'candidate_reviews':len(urls),'checked':checked,'html_mb':round(OUT.stat().st_size/1048576,2),'generated_at':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())}
    REPORT.write_text(json.dumps(report,indent=2),encoding='utf-8')
    print('DONE',json.dumps(report),flush=True)
    if len(cases)<100:raise SystemExit('Fewer than 100 qualifying cases; refusing to call the gallery complete.')
if __name__=='__main__':main()
