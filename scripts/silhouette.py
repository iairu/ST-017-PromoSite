"""Side-view silhouette of the Nightjar CNC model as an SVG path (x forward, z up)."""
import sys, numpy as np
from shapely.geometry import Polygon
from shapely.ops import unary_union
sys.path.insert(0, 'scripts')
from decimate_stl import read_stl

t = read_stl('public/models/nightjar.stl')
polys = []
for tri in t:
    p = Polygon(tri[:, [0, 2]])
    if p.area > 1e-6 and p.is_valid:
        polys.append(p)
u = unary_union(polys).buffer(0.8).buffer(-0.8).simplify(0.12)
if u.geom_type == 'MultiPolygon':
    u = max(u.geoms, key=lambda g: g.area)
x0, z0, x1, z1 = u.bounds
H = z1 - z0
pts = [(x - x0, z1 - z) for x, z in u.exterior.coords]
d = 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts) + 'Z'
w = x1 - x0
open('src/assets/nightjar-silhouette.svg', 'w').write(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {H:.1f}"><path d="{d}" fill="currentColor"/></svg>')
print(w, H, len(pts))
