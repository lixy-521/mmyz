import os
import re
import shutil

staff_assets_dir = os.path.join("assets", "staff")
if not os.path.exists(staff_assets_dir):
    os.makedirs(staff_assets_dir)

moves = [
    ("assets/dxf.webp", "assets/staff/dxf.webp"),
    ("assets/liufang.webp", "assets/staff/liufang.webp"),
    ("assets/syq.webp", "assets/staff/syq.webp"),
    ("assets/wangmingde.webp", "assets/staff/wangmingde.webp"),
    ("assets/article_award/zhangguoqiang.webp", "assets/staff/zhangguoqiang.webp")
]

# Move the actual files
for src, dst in moves:
    src_path = os.path.join(*src.split('/'))
    dst_path = os.path.join(*dst.split('/'))
    if os.path.exists(src_path):
        os.rename(src_path, dst_path)

# Scan through all html and js files and replace the strings
for root, dirs, files in os.walk('.'):
    if '.git' in root:
        continue
    for f in files:
        if f.endswith('.html') or f.endswith('.js'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            original = content
            for src, dst in moves:
                # Direct string replace. This will match `assets/dxf.webp` -> `assets/staff/dxf.webp`
                content = content.replace(src, dst)
            if original != content:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(content)

print("Staff images classified and references updated.")
