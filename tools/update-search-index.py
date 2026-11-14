"""Rebuild the site's embedded search index: python3 tools/update-search-index.py.
Only index.html and pages/**/*.html are indexed; backups and AppleDouble files are excluded.
"""
from pathlib import Path
from html.parser import HTMLParser
import json,re,sys
ROOT=Path(__file__).resolve().parents[1]
SKIP={'script','style','header','footer','nav','form','template'}
class Page(HTMLParser):
 def __init__(self):
  super().__init__(convert_charrefs=True);self.stack=[];self.body=False;self.text=[];self.headings=[];self.paragraphs=[];self.active=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='body':self.body=True
  hidden=any(s[1] for s in self.stack) or tag in SKIP or 'hidden' in a or a.get('aria-hidden')=='true'
  if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:self.stack.append((tag,hidden))
  if self.body and not hidden:
   if tag in {'h1','h2','h3','h4','p'}:self.active.append([tag,[]])
   for key in ['alt','aria-label']:
    value=a.get(key,'')
    if value and not re.match(r'(?:FOMU project visual \d|Preview of .+ project)',value,re.I):self.text.append(value)
   if tag in {'source','video','a'}:
    from urllib.parse import unquote,urlsplit
    path=urlsplit(a.get('src',a.get('href',''))).path
    if Path(path).suffix.lower() in {'.mp4','.pdf'}:self.text.append(unquote(Path(path).stem))
 def handle_endtag(self,tag):
  if self.active and self.active[-1][0]==tag:
   kind,parts=self.active.pop();value=' '.join(' '.join(parts).split())
   if value:(self.paragraphs if kind=='p' else self.headings).append(value)
  for i in range(len(self.stack)-1,-1,-1):
   if self.stack[i][0]==tag:self.stack=self.stack[:i];break
  if tag=='body':self.body=False
 def handle_data(self,data):
  if self.body and not any(s[1] for s in self.stack):
   data=' '.join(data.split())
   if data:
    self.text.append(data)
    for _,parts in self.active:parts.append(data)
META={
'ANT.html':('ANT — Communication After the Blackout','Branding Project','ANT blackout branding communicatie interest tokens campaign video logo animaties neighbourhood map 2035'),
'index.html':('Home','Page','home start portfolio diensten services motion video digital digitaal showreel contact'),
'Projects.html':('Projects','Page','projecten werk portfolio projectenoverzicht'),
'Motion.html':('Motion Projects','Category','motion animatie animaties video films montage videomontage vfx nabewerking'),
'branding.html':('Branding Projects','Category','branding huisstijl grafisch ontwerp logo visuele identiteit'),
'about.html':('About','Page','over mij sieben nopens opleiding ervaring vaardigheden software tools'),
'contact.html':('Contact','Page','contact contacteren email e mail telefoon bellen freelance samenwerken inhuren'),
"Gerry's Fietsatelier.html":("Gerry’s Fietsatelier",'Motion Project','gerry gerrys atelier fiets fietsen fietsenwinkel fietscafe reels zichtbaarheid veiligheid woom unboxing'),
'bliss boost.html':('Bliss Boost','Branding Project','blissboost smoothie smoothies drankjes blikjes verpakking verpakkingen huisstijl logo kleuren kleurenpalet caregiver everyman'),
'FOMU.html':('FOMU Leporello','Branding Project','fomu museum fotografie fotograaf fotoboek vouwfolder brochure leporello yaquine yaqine hamzaoui'),
'Circet.html':('Circet Explainer Videos','Motion Project','circet uitleg uitlegvideo instructievideo animatie telecom'),
'Kasteel van Laarne.html':('Kasteel van Laarne','Motion Project','kasteel laarne monument monumentvideo erfgoed geschiedenis castle'),
'999.html':('Eastpak × Juice WRLD','Branding Project','eastpak juice wrld juicewrld 999 rugzak backpack branding samenwerking'),
'Devils.html':('Belgian Red Devils','Branding Project','belgian red devils rode duivels voetbal belgie belgium'),
'car review.html':('SEAT Ibiza Review','Motion Project','seat ibiza auto autoreview review affiliate autovideo'),
'sneaker.html':('Nike Air Force 1','Motion Project','nike af1 air force sneaker sneakers schoenen commercial productvideo'),
'C-fire.html':('C-fire Corporate Video','Motion Project','cfire c fire bedrijfsfilm bedrijfsvideo corporate interview'),
'loops.html':('Loop Earplugs × Lokerse Feesten','Motion Project','loop loops oordoppen oordopjes lokerse feesten productanimatie 3d'),
'tahiti.html':('Tahiti Dynamic Machine','Motion Project','tahiti zeep soap dynamische machine rigid body cinema 4d'),
'AR.html':('AR Sports Watch','Motion Project','ar sporthorloge horloge hologram augmented reality vfx'),
'edea.html':('Edea Ice Skates Commercial','Motion Project','edea schaatsen schaats kunstschaatsen sport commercial'),
'winterwonderland.html':('Winter Wonderland','VFX Project','winter wonderland sneeuw seizoen vfx compositing'),
'walk in the park.html':('A Walk in the Park','Motion Project','walk park wandeling wandelen 2d illustratie animatie')
}
def build(root):
 records=[]
 for file in [root/'index.html',*sorted((root/'pages').rglob('*.html'))]:
  if file.name.startswith('.') or not file.is_file():continue
  page=Page();page.feed(file.read_text(encoding='utf-8'))
  fallback=page.headings[0].rstrip('.') if page.headings else file.stem
  title,category,aliases=META.get(file.name,(fallback,'Project' if 'Projects' in file.parts else 'Page',file.stem))
  records.append({'title':title,'category':category,'path':file.relative_to(root).as_posix(),'headings':' '.join(page.headings),'text':' '.join(page.text),'description':next((p for p in page.paragraphs if len(p)>60),''),'aliases':aliases})
 return records
if __name__=='__main__':
 root=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else ROOT
 records=build(root);file=root/'scroll-fade.js';source=file.read_text(encoding='utf-8')
 start='/* SEARCH_INDEX_START */';end='/* SEARCH_INDEX_END */'
 if start not in source or end not in source:raise SystemExit('Search index markers are missing from scroll-fade.js.')
 prefix=source.split(start,1)[0];suffix=source.split(end,1)[1]
 embedded='\n    const searchRecords = '+json.dumps(records,ensure_ascii=False,separators=(',',':'))+';\n    '
 file.write_text(prefix+start+embedded+end+suffix,encoding='utf-8')
 print(f'Indexed {len(records)} pages and projects.')
