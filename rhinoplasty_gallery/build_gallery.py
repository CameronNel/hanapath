import base64, io, json, time
from pathlib import Path
import requests
from PIL import Image, ImageOps

OUT=Path(__file__).with_name('index.html')
REPORT=Path(__file__).with_name('report.json')
DATASET='morlako/rhinoplasty_lora'
API='https://datasets-server.huggingface.co/rows'
SOURCE='https://huggingface.co/datasets/morlako/rhinoplasty_lora'
UA='Mozilla/5.0'

s=requests.Session(); s.headers.update({'User-Agent':UA})

def fetch_rows():
    rows=[]; features=None
    for off in range(0,508,100):
        r=s.get(API,params={'dataset':DATASET,'config':'default','split':'train','offset':off,'length':min(100,508-off)},timeout=30)
        r.raise_for_status(); j=r.json(); features=features or j.get('features'); rows.extend(j.get('rows',[]))
        print('rows',len(rows),flush=True)
    return features,rows

def label_names(features):
    for f in features or []:
        if f.get('name')=='label':
            t=f.get('type') or {}
            if isinstance(t,dict) and t.get('names'): return t['names']
    return ['after','before']

def to_jpeg(src):
    r=s.get(src,timeout=30); r.raise_for_status()
    im=Image.open(io.BytesIO(r.content)); im=ImageOps.exif_transpose(im).convert('RGB'); im.thumbnail((720,720),Image.Resampling.LANCZOS)
    b=io.BytesIO(); im.save(b,'JPEG',quality=63,optimize=True,progressive=True)
    return 'data:image/jpeg;base64,'+base64.b64encode(b.getvalue()).decode('ascii')

def build(pairs):
    data=json.dumps(pairs,separators=(',',':'))
    return f'''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rhinoplasty Photo Pairs</title><style>:root{{--bg:#0d1015;--p:#181c23;--l:#343c49;--t:#f4f6f8;--m:#a6afbc;--a:#8bbcff}}*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--t);font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial}}header{{position:sticky;top:0;background:#0d1015f4;border-bottom:1px solid var(--l);padding:12px 14px;z-index:2}}h1{{font-size:19px;margin:0}}.sub,.small{{font-size:12px;color:var(--m)}}main{{max-width:1050px;margin:auto;padding:14px}}.card{{background:var(--p);border:1px solid var(--l);border-radius:16px;padding:14px}}.photos{{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}}.photo{{background:#080b10;border:1px solid var(--l);border-radius:13px;padding:8px;text-align:center}}img{{max-width:100%;max-height:76vh;border-radius:9px}}.lab{{font-size:12px;color:var(--m);margin-top:6px}}.nav{{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}}button{{background:#222833;color:var(--t);border:1px solid var(--l);border-radius:10px;padding:13px;font-weight:700}}a{{color:var(--a)}}@media(max-width:700px){{.photos{{grid-template-columns:1fr}}}}</style></head><body><header><h1>Rhinoplasty Photo Pair Library</h1><div class="sub">Images are embedded in this HTML. Dataset license: CC BY-NC 4.0.</div><div id="count" class="small"></div></header><main><div class="card"><div id="num" class="small"></div><div class="photos"><div class="photo"><img id="before"><div class="lab">Before</div></div><div class="photo"><img id="after"><div class="lab">After</div></div></div><p class="small"><strong>Important:</strong> this licensed dataset contains before/after rhinoplasty pairs. It does not identify the postoperative image as operating-table, day-1, or a specific follow-up month, so this viewer does not pretend otherwise.</p><p class="small">Source: <a href="{SOURCE}" target="_blank">morlako/rhinoplasty_lora</a></p><div class="nav"><button id="p">← Previous</button><button id="n">Next →</button></div></div></main><script>const A={data};let i=0,$=x=>document.getElementById(x);function R(){{$('count').textContent=A.length+' paired cases';$('num').textContent='Case '+(i+1)+' of '+A.length;$('before').src=A[i].before;$('after').src=A[i].after}}$('p').onclick=()=>{{i=(i-1+A.length)%A.length;R();scrollTo(0,0)}};$('n').onclick=()=>{{i=(i+1)%A.length;R();scrollTo(0,0)}};onkeydown=e=>{{if(e.key==='ArrowRight')$('n').click();if(e.key==='ArrowLeft')$('p').click()}};R();</script></body></html>'''

def main():
    features,rows=fetch_rows(); names=label_names(features); print('labels',names,flush=True)
    groups={n:[] for n in names}
    for rr in rows:
        row=rr.get('row') or {}; lab=row.get('label'); name=names[lab] if isinstance(lab,int) and 0<=lab<len(names) else str(lab)
        im=row.get('image') or {}; src=im.get('src') if isinstance(im,dict) else None
        if src and name in groups: groups[name].append(src)
    before=groups.get('before',[]); after=groups.get('after',[])
    if not before or not after: raise SystemExit(f'Could not locate before/after classes: {{ {k:len(v) for k,v in groups.items()} }}')
    n=min(len(before),len(after),127); pairs=[]
    for i in range(n):
        try: pairs.append({'before':to_jpeg(before[i]),'after':to_jpeg(after[i])})
        except Exception as e: print('skip pair',i,type(e).__name__,flush=True)
        if len(pairs)%10==0: print('embedded pairs',len(pairs),flush=True)
    OUT.write_text(build(pairs),encoding='utf-8')
    rep={'paired_cases':len(pairs),'rows':len(rows),'classes':{k:len(v) for k,v in groups.items()},'html_mb':round(OUT.stat().st_size/1048576,2),'source':SOURCE,'license':'CC BY-NC 4.0','generated_at':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())}
    REPORT.write_text(json.dumps(rep,indent=2),encoding='utf-8'); print('DONE',json.dumps(rep),flush=True)
    if len(pairs)<100: raise SystemExit('Fewer than 100 embedded pairs; refusing to call this complete.')
if __name__=='__main__': main()
