#!/usr/bin/env python3
"""APCA CI gate for DTCG tokens. Exit 1 on any failing pair."""
import json, sys, re

TARGETS = {"body":75, "ui":60, "large":45, "nontext":45}  # APCA Lc per role

def lin(c): return (c/255.0)**2.4
def Yh(h):
    h=h.lstrip('#'); r,g,b=int(h[0:2],16),int(h[2:4],16),int(h[4:6],16)
    return 0.2126729*lin(r)+0.7151522*lin(g)+0.0721750*lin(b)
def clamp(y): return y+(0.022-y)**1.414 if y<0.022 else y
def apca(t,b):
    Yt,Yb=clamp(Yh(t)),clamp(Yh(b))
    if abs(Yb-Yt)<0.0005: return 0.0
    if Yb>Yt: S=(Yb**0.56-Yt**0.57)*1.14; o=0 if S<0.1 else S-0.027
    else: S=(Yb**0.65-Yt**0.62)*1.14; o=0 if S>-0.1 else S+0.027
    return round(o*100,1)

def load(path):
    return json.load(open(path))

def getnode(root, dotted):
    n=root
    for p in dotted.split('.'): n=n[p]
    return n

def resolve(root, val, mode):
    # follow {refs}, honor mode override in $extensions.modes
    seen=0
    while True:
        if isinstance(val, dict):
            ext=val.get("$extensions",{})
            if mode!="light" and "modes" in ext and mode in ext["modes"]:
                val=ext["modes"][mode]; continue
            val=val["$value"]; continue
        m=re.fullmatch(r"\{([^}]+)\}", val.strip()) if isinstance(val,str) else None
        if m:
            val=getnode(root, m.group(1)); seen+=1
            if seen>20: raise RuntimeError("ref loop")
            continue
        return val  # hex

def walk(root, node, path=""):
    for k,v in node.items():
        if k.startswith("$"): continue
        p=f"{path}.{k}".strip(".")
        if isinstance(v,dict) and "$value" in v:
            ext=v.get("$extensions",{}); apca_meta=ext.get("apca")
            if apca_meta: yield p, v, apca_meta
            if "modes" in ext or "$value" in v:  # also descend? leaves only
                pass
        if isinstance(v,dict):
            yield from walk(root, v, p)

def main(path):
    root=load(path)
    fails=0; rows=[]
    for p, node, meta in walk(root, root):
        role=meta["role"]; on=meta["on"]; target=TARGETS[role]
        for mode in ("light","dark"):
            txt=resolve(root, node, mode)
            bgnode=getnode(root, on)
            bg=resolve(root, bgnode, mode)
            lc=apca(txt,bg); ok=abs(lc)>=target
            rows.append((ok,p,mode,role,lc,target,txt,bg))
            if not ok: fails+=1
    w=max(len(r[1]) for r in rows)
    for ok,p,mode,role,lc,target,txt,bg in rows:
        print(f"[{'PASS' if ok else 'FAIL'}] {p:<{w}} {mode:5} {role:7} Lc={lc:7} (>={target}) {txt}/{bg}")
    print(f"\n{len(rows)} pairs, {fails} failing")
    sys.exit(1 if fails else 0)

if __name__=="__main__":
    main(sys.argv[1] if len(sys.argv)>1 else "flytrap.tokens.json")
