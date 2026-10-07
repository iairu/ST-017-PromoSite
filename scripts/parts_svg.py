"""Generate the simple 3D-style vector drawings of the kit parts into public/img/parts/*.svg.
Oblique projection: lit top face, darker front, darkest side. Fixed colours (theme independent).
Run: python3 scripts/parts_svg.py"""
import os
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'img', 'parts')
os.makedirs(OUT, exist_ok=True)
MONO = "font-family='IBM Plex Mono, monospace'"
DEFS = """<defs>
<linearGradient id='sh' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#fff' stop-opacity='.55'/><stop offset='1' stop-color='#fff' stop-opacity='0'/></linearGradient>
<radialGradient id='cone' cx='.4' cy='.35' r='.8'><stop offset='0' stop-color='#4f5560'/><stop offset='1' stop-color='#1b1e24'/></radialGradient>
<linearGradient id='metal' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#f4f4f2'/><stop offset='.5' stop-color='#c9ccd0'/><stop offset='1' stop-color='#98a0a8'/></linearGradient>
<linearGradient id='can' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#3b66c0'/><stop offset='.35' stop-color='#4d7ad2'/><stop offset='1' stop-color='#1a3470'/></linearGradient>
</defs>"""

def box(x, y, w, h, dx, dy, top, front, side, extra=''):
    """Oblique box: front face at (x,y,w,h), depth offset (dx,-dy) going up-right."""
    return (f"<path d='M{x} {y} L{x+dx} {y-dy} H{x+w+dx} L{x+w} {y}Z' fill='{top}'/>"
            f"<path d='M{x} {y} H{x+w} V{y+h} H{x}Z' fill='{front}'/>"
            f"<path d='M{x+w} {y} L{x+w+dx} {y-dy} V{y+h-dy} L{x+w} {y+h}Z' fill='{side}'/>"
            f"<path d='M{x} {y} L{x+dx} {y-dy} H{x+w+dx} L{x+w} {y}Z' fill='url(#sh)' opacity='.4'/>" + extra)

def wrap(body):
    return (f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 160'>{DEFS}"
            f"<ellipse cx='120' cy='142' rx='88' ry='8' fill='#2b2118' opacity='.13'/>{body}</svg>")

P = {}

# DFPlayer Pro: dark blue board, IC, USB-C, two pin rows
g = box(44, 62, 140, 46, 24, 24, '#2b3a5c', '#1c2640', '#121a2e')
g += "<rect x='62' y='73' width='84' height='23' rx='2' fill='#14171d' stroke='#444a55'/>"
g += ''.join(f"<line x1='{70+i*9.5}' y1='73' x2='{70+i*9.5}' y2='69' stroke='#9aa0a8' stroke-width='1.5'/><line x1='{70+i*9.5}' y1='96' x2='{70+i*9.5}' y2='100' stroke='#9aa0a8' stroke-width='1.5'/>" for i in range(8))
g += ''.join(f"<rect x='{50+i*7}' y='64' width='3.5' height='3.5' fill='#e0a431'/><rect x='{148+i*5.5}' y='64' width='3.5' height='3.5' fill='#e0a431'/>" for i in range(6))
g += "<rect x='152' y='73' width='28' height='14' rx='2' fill='url(#metal)'/><rect x='156' y='77' width='20' height='6' rx='3' fill='#2a2e35'/>"
g += f"<text x='66' y='104' {MONO} font-size='6.5' fill='#e0a431'>DFR0768</text>"
P['dfplayer'] = g

# Speaker: 40 mm round, dark cone, two leads to solder
g = "<ellipse cx='120' cy='98' rx='64' ry='30' fill='#0d0f13'/><path d='M56 80 V98 A64 30 0 0 0 184 98 V80Z' fill='#15181d'/>"
g += "<ellipse cx='120' cy='80' rx='64' ry='30' fill='#2b2f36'/><ellipse cx='120' cy='80' rx='55' ry='25' fill='url(#cone)'/>"
g += "<ellipse cx='120' cy='79' rx='38' ry='17' fill='none' stroke='#5d6470' stroke-width='1.2'/><ellipse cx='120' cy='79' rx='22' ry='10' fill='none' stroke='#5d6470' stroke-width='1.2'/><ellipse cx='120' cy='78' rx='9' ry='4.2' fill='#0d0f13'/>"
g += "<path d='M176 98 q26 4 28 26 t-10 18' fill='none' stroke='#d6a437' stroke-width='2.4' stroke-linecap='round'/><path d='M170 102 q34 2 38 28 t-20 16' fill='none' stroke='#b83a2e' stroke-width='2.4' stroke-linecap='round'/>"
P['speaker'] = g

# LiPo cell with JST plug
g = box(54, 58, 112, 54, 22, 20, '#f6f3ea', '#d9d5c9', '#aeaa9c')
g += "<rect x='66' y='72' width='66' height='5' fill='#8f8c80' opacity='.55'/><rect x='66' y='83' width='46' height='5' fill='#8f8c80' opacity='.45'/><rect x='66' y='94' width='30' height='4' fill='#8f8c80' opacity='.35'/>"
g += "<path d='M78 38 q-8 -12 4 -22 h20' fill='none' stroke='#c0392b' stroke-width='2.4' stroke-linecap='round'/><path d='M90 38 q-4 -10 6 -14 h12' fill='none' stroke='#1d2026' stroke-width='2.4' stroke-linecap='round'/>"
g += "<rect x='104' y='8' width='28' height='22' rx='2' fill='#f1ebdb' stroke='#bfb79f'/><rect x='110' y='14' width='16' height='10' fill='#bfb79f'/>"
P['battery'] = g

# Electrolytic capacitor
g = "<path d='M108 128 L106 154 M132 128 L134 154' stroke='#c9ccd0' stroke-width='3' stroke-linecap='round'/>"
g += "<path d='M86 50 V116 A34 12 0 0 0 154 116 V50Z' fill='url(#can)'/>"
g += "<path d='M132 55 V126 A34 12 0 0 0 148 121 V54Z' fill='#d3d6da' opacity='.9'/>"
g += f"<text x='138' y='62' {MONO} font-size='9' fill='#1a3470' transform='rotate(90 138 62)'>- - - - -</text>"
g += f"<text x='94' y='88' {MONO} font-size='9' font-weight='700' fill='#e8eefc'>470µF</text><text x='94' y='100' {MONO} font-size='7' fill='#e8eefc'>16V</text>"
g += "<ellipse cx='120' cy='50' rx='34' ry='12' fill='url(#metal)'/><path d='M105 49 l15 -5 l15 5 M120 44 v12' stroke='#7f858d' stroke-width='1.2' fill='none'/>"
P['capacitor'] = g

# Resistors on a taped strip
g = ''
for i in range(5):
    y = 42 + i * 18
    g += (f"<g transform='rotate(-4 120 80)'><line x1='26' y1='{y}' x2='214' y2='{y}' stroke='#b9bdc2' stroke-width='2'/>"
          f"<rect x='94' y='{y-7}' width='52' height='14' rx='7' fill='#4f8fb8'/><rect x='94' y='{y-7}' width='52' height='6' rx='3' fill='#fff' opacity='.28'/>"
          f"<rect x='105' y='{y-7}' width='4' height='14' fill='#6b3b1d'/><rect x='114' y='{y-7}' width='4' height='14' fill='#111'/><rect x='123' y='{y-7}' width='4' height='14' fill='#111'/><rect x='135' y='{y-7}' width='3' height='14' fill='#c9a23a'/></g>")
g += "<g transform='rotate(-4 120 80)'><rect x='56' y='28' width='20' height='84' fill='#d9bf8e' opacity='.9'/><rect x='170' y='28' width='20' height='84' fill='#d9bf8e' opacity='.9'/></g>"
P['resistors'] = g

# Tact switch
g = box(54, 90, 112, 28, 26, 22, '#3a3d44', '#1e2126', '#121418')
g += ''.join(f"<line x1='{x}' y1='118' x2='{x}' y2='138' stroke='#c9ccd0' stroke-width='3' stroke-linecap='round'/>" for x in (64, 156))
g += "<ellipse cx='122' cy='76' rx='28' ry='12' fill='#0f1115'/><path d='M94 76 V68 A28 12 0 0 1 150 68 V76 A28 12 0 0 1 94 76Z' fill='#23262c'/><ellipse cx='122' cy='68' rx='28' ry='12' fill='#3d414a'/><ellipse cx='116' cy='66' rx='13' ry='4' fill='#fff' opacity='.18'/>"
P['button'] = g

# Female header 1x40
g = box(20, 82, 180, 26, 20, 16, '#3a3d44', '#1a1c20', '#101215')
g += ''.join(f"<ellipse cx='{38+i*8.6}' cy='74' rx='2.6' ry='1.7' fill='#0b0c0e'/>" for i in range(20))
g += ''.join(f"<line x1='{30+i*8.6}' y1='108' x2='{30+i*8.6}' y2='128' stroke='#c9ccd0' stroke-width='1.8'/>" for i in range(20))
P['header-f'] = g

# Male pin headers (two strips)
g = ''
for k, ox in enumerate((0, 56)):
    g += ''.join(f"<line x1='{ox+66+i*6.4}' y1='98' x2='{ox+66+i*6.4}' y2='36' stroke='#d9a63a' stroke-width='2.4' stroke-linecap='round'/><line x1='{ox+66+i*6.4}' y1='108' x2='{ox+66+i*6.4}' y2='128' stroke='#c9ccd0' stroke-width='1.8'/>" for i in range(6))
    g += box(ox+60, 98, 40, 10, 6, 5, '#3a3d44', '#1a1c20', '#101215')
P['header-m'] = g

# Breadboard
g = box(22, 76, 168, 30, 30, 24, '#f6f5ef', '#d8d5c9', '#b4b1a4')
g += "<line x1='34' y1='73' x2='188' y2='73' stroke='#d0453b' stroke-width='1.4'/><line x1='34' y1='96' x2='188' y2='96' stroke='#3a74c4' stroke-width='1.2' opacity='.0'/>"
for r in range(5):
    g += ''.join(f"<rect x='{58+i*6.4-r*5.6}' y='{54+r*4.8}' width='2.4' height='2' fill='#7d7a6d'/>" for i in range(22))
g += ''.join(f"<rect x='{x}' y='106' width='10' height='5' fill='#d8d5c9'/>" for x in (60, 116, 168))
g += f"<text x='34' y='98' {MONO} font-size='6' fill='#8d897b'>A B C D E     F G H I J</text>"
P['breadboard'] = g

# microSD + adapter
g = "<path d='M44 46 H112 L132 66 V124 H44Z' fill='#1d2026'/><path d='M132 66 L142 58 V116 L132 124Z' fill='#101215'/><path d='M44 46 H112 L132 66 H44Z' fill='#33363c' opacity='.55'/>"
g += ''.join(f"<rect x='{50+i*6.4}' y='110' width='3.8' height='12' fill='#c9a23a'/>" for i in range(8))
g += f"<text x='56' y='84' {MONO} font-size='10' font-weight='700' fill='#ececec'>SanDisk</text><text x='56' y='98' {MONO} font-size='5.5' fill='#9aa0a8'>microSD ADAPTER</text>"
g += "<path d='M152 80 H180 V108 L173 116 H152Z' fill='#23262c'/><path d='M180 108 L190 99 V76 L180 80Z' fill='#101215'/>"
g += ''.join(f"<rect x='{155+i*4.6}' y='104' width='3' height='10' fill='#c9a23a'/>" for i in range(5))
g += "<rect x='158' y='86' width='16' height='9' fill='#e8e8e8' opacity='.85'/>"
P['sd'] = g

# Jumper wires
g = "<g fill='none' stroke-width='3.2' stroke-linecap='round'>"
g += "<path d='M46 112 C54 36 116 24 128 66 S178 118 196 50' stroke='#2f6bd0'/>"
g += "<path d='M46 120 C72 70 100 64 122 86 S164 130 196 62' stroke='#d94f3a'/>"
g += "<path d='M46 128 C62 100 90 112 120 102 S172 76 196 76' stroke='#39a05a'/></g>"
g += "<rect x='28' y='108' width='20' height='26' rx='2' fill='#1d2026'/><rect x='194' y='40' width='20' height='16' rx='2' fill='#1d2026'/><rect x='212' y='45' width='12' height='3' fill='#c9ccd0'/>"
g += "<g fill='#c9ccd0'><rect x='14' y='114' width='12' height='3'/><rect x='14' y='122' width='12' height='3'/></g>"
P['jumper'] = g

for k, v in P.items():
    open(os.path.join(OUT, k + '.svg'), 'w').write(wrap(v))
print(sorted(P))
