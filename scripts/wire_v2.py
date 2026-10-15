"""Wireframes of the Nightjar v2 enclosure for the bird page (public/img/wire-*.webp), drawn with the
v1 renderer's own functions (ST-017-MOTHERBOARD/enclosure/outdated/render.py): stacks of cross-sections.

usage: python3 scripts/wire_v2.py <render.py> <stl_v2 folder> <out folder>
       then convert the three PNGs to WebP into public/img/
needs: numpy, trimesh, matplotlib, pillow (and rtree / scipy for trimesh's sections)
The pocket pictures (public/img/pockets-*.webp) are render_v2.py's pockets_left / pockets_right.png."""
import sys, glob, os
import numpy as np, trimesh
R = sys.argv[1]; STL = sys.argv[2]; OUT = sys.argv[3]
ns = {}; exec(open(R).read(), ns)
import matplotlib; matplotlib.rcParams['savefig.dpi'] = 380      # the v1 images were about 1450 px wide
figure, BLUE, ORANGE, RED, GREEN, GREY = ns['figure'], ns['BLUE'], ns['ORANGE'], ns['RED'], ns['GREEN'], ns['GREY']
body = trimesh.load(os.path.join(STL, 'nightjar_v2_assembled.stl'))
btn = trimesh.load(os.path.join(STL, 'nightjar_v2_button.stl'))
lo, hi = body.bounds
pad = np.array([4, 4, 4])

# 1. assembled, three-quarter view from the left front (beak to the right)
figure(os.path.join(OUT, 'wire-assembled.png'),
       [dict(mesh=body, color=BLUE), dict(mesh=btn, color=ORANGE, step=1.5)],
       (lo - pad, hi + pad), elev=22, azim=-62)
# 2. from the other side and a little higher: the tail towards the viewer
figure(os.path.join(OUT, 'wire-front.png'),
       [dict(mesh=body, color=BLUE), dict(mesh=btn, color=ORANGE, step=1.5)],
       (lo - pad, hi + pad), elev=26, azim=128, size=(7.2, 4.6))
# 3. exploded: the halves pulled apart at the seam (y = 0), the button lifted, the parts in between
gap, lift = 75.0, 50.0
left = trimesh.intersections.slice_mesh_plane(body, plane_normal=[0, 1, 0], plane_origin=[0, 0, 0])
right = trimesh.intersections.slice_mesh_plane(body, plane_normal=[0, -1, 0], plane_origin=[0, 0, 0])
left.apply_translation([0, gap, 0]); right.apply_translation([0, -gap, 0])
b2 = btn.copy(); b2.apply_translation([0, 0, lift])
colors = {'board': GREEN, 'DFPlayer_Pro': BLUE, 'LiPo': RED, 'TP4056': GREEN, 'speaker': '#7b3fa0',
          'ESP32-S3': '#1f3a5f', 'MAX9814': '#2e8b57', 'C1': GREY, 'Q1': '#333333', 'SW1': ORANGE, 'U3': '#333333'}
items = [dict(mesh=left, color=BLUE), dict(mesh=right, color=BLUE), dict(mesh=b2, color=ORANGE, step=1.5)]
for f in sorted(glob.glob(os.path.join(STL, 'parts', 'part_*.stl'))):
    name = os.path.basename(f)[5:-4]
    items.append(dict(mesh=trimesh.load(f), color=colors.get(name, GREY), lw=0.5, step=1.6))
allb = np.vstack([m['mesh'].bounds for m in items])
figure(os.path.join(OUT, 'wire-exploded.png'), items, (allb.min(0) - pad, allb.max(0) + pad), elev=30, azim=-58, size=(9, 4.8))
print('ok')
