import os
import re

admin_dir = "admin"
if not os.path.exists(admin_dir):
    os.makedirs(admin_dir)

admin_files = ["login.html", "teacher.html", "principal.html"]

for f in admin_files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        def replace_in_admin(match):
            attr = match.group(1)
            link = match.group(2)
            if link.startswith('http') or link.startswith('#') or link.startswith('data:'):
                return f'{attr}="{link}"'
            for af in admin_files:
                if link == af or link.startswith(af + '#') or link.startswith(af + '?'):
                    return f'{attr}="{link}"'
            if link.startswith('../'):
                return f'{attr}="{link}"'
            return f'{attr}="../{link}"'
            
        content = re.sub(r'(src|href)="([^"]+)"', replace_in_admin, content)
        with open(os.path.join(admin_dir, f), 'w', encoding='utf-8') as file:
            file.write(content)
        os.remove(f)

print("Admin files moved and internal links updated.")

def update_links_to_admin(file_path, depth):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    original = content
    def replacer(match):
        attr = match.group(1)
        link = match.group(2)
        for af in admin_files:
            if link == af or link.startswith(af + '#') or link.startswith(af + '?'):
                if depth == 0:
                    return f'{attr}="admin/{link}"'
        for af in admin_files:
            if link == f"../{af}" or link.startswith(f"../{af}#") or link.startswith(f"../{af}?"):
                return f'{attr}="../admin/{link[3:]}"'
            if link.startswith(f"../../{af}"):
                return f'{attr}="../../admin/{link[6:]}"'
        return f'{attr}="{link}"'
    content = re.sub(r'(src|href)="([^"]+)"', replacer, content)
    if original != content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated references to admin in {file_path}")

for root, dirs, files in os.walk('.'):
    # ignore .git, admin. But we do want to update campus, endings, etc.
    if '.git' in root or 'admin' in root:
        continue
    depth = root.replace('.', '').count(os.sep)
    for f in files:
        if f.endswith('.html'): # only fix HTML href, JS auth logic is handled manually
            update_links_to_admin(os.path.join(root, f), depth)

print("External links to admin updated.")
