"""Vertex-clustering decimation of the Nightjar STL files for the web viewer.

usage: python3 scripts/decimate_stl.py <in.stl> <out.stl> <cell_mm>
Binary STL in, binary STL out (mm). Dependencies: numpy only.
"""
import sys
import numpy as np


def read_stl(path):
    d = open(path, 'rb').read()
    n = int.from_bytes(d[80:84], 'little')
    a = np.frombuffer(d, dtype=np.dtype([('n', '<f4', 3), ('v', '<f4', (3, 3)), ('a', '<u2')]), count=n, offset=84)
    return a['v'].astype(np.float64)  # (n,3,3)


def decimate(tris, cell):
    pts = tris.reshape(-1, 3)
    key = np.floor(pts / cell).astype(np.int64)
    key -= key.min(0)
    dim = key.max(0) + 1
    flat = (key[:, 0] * dim[1] + key[:, 1]) * dim[2] + key[:, 2]
    uniq, inv = np.unique(flat, return_inverse=True)
    sums = np.zeros((len(uniq), 3))
    np.add.at(sums, inv, pts)
    cnt = np.bincount(inv).astype(float)[:, None]
    verts = sums / cnt
    idx = inv.reshape(-1, 3)
    ok = (idx[:, 0] != idx[:, 1]) & (idx[:, 1] != idx[:, 2]) & (idx[:, 0] != idx[:, 2])
    return verts[idx[ok]]


def write_stl(path, tris):
    n = len(tris)
    e1, e2 = tris[:, 1] - tris[:, 0], tris[:, 2] - tris[:, 0]
    nm = np.cross(e1, e2)
    nm /= np.maximum(np.linalg.norm(nm, axis=1, keepdims=True), 1e-12)
    rec = np.zeros(n, dtype=np.dtype([('n', '<f4', 3), ('v', '<f4', (3, 3)), ('a', '<u2')]))
    rec['n'], rec['v'] = nm, tris
    with open(path, 'wb') as f:
        f.write(b'LELEK nightjar, decimated for web'.ljust(80, b' '))
        f.write(n.to_bytes(4, 'little'))
        f.write(rec.tobytes())


if __name__ == '__main__':
    src, dst, cell = sys.argv[1], sys.argv[2], float(sys.argv[3])
    t = read_stl(src)
    o = decimate(t, cell)
    write_stl(dst, o)
    print(f'{src}: {len(t)} -> {len(o)} triangles')
