import os
import re

campus_dir = "campus"
if not os.path.exists(campus_dir):
    os.makedirs(campus_dir)

campus_files = ["alumni.html", "forum.html", "security.html", "library.html", "staff.html"]

# Step 1: Fix links inside the 5 campus files and move them
for f in campus_files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # We need to prepend ../ to assets, css, js, article, hole, login.html, index.html, bnei.html, principal.html, teacher.html
        # We DO NOT prepend ../ to campus_files because they will all be siblings in campus/
        
        # Shield absolute/external links
        # This regex looks for src="X" or href="X".
        def replace_in_campus(match):
            attr = match.group(1)
            link = match.group(2)
            
            # If it's pure anchor, external, or data URI, keep it
            if link.startswith('http') or link.startswith('#') or link.startswith('data:'):
                return f'{attr}="{link}"'
            
            # If it's one of the campus files, no need to change (they stay siblings)
            # e.g., href="forum.html" -> href="forum.html"
            for cf in campus_files:
                if link == cf or link.startswith(cf + '#') or link.startswith(cf + '?'):
                    return f'{attr}="{link}"'
            
            # Otherwise, it's something in root (like css/..., js/..., index.html, login.html).
            # We must prepend ../ EXCEPT if it already starts with ../ (which shouldn't happen here since they were in root)
            if link.startswith('../'):
                return f'{attr}="{link}"'
            
            return f'{attr}="../{link}"'
            
        content = re.sub(r'(src|href)="([^"]+)"', replace_in_campus, content)
        
        with open(os.path.join(campus_dir, f), 'w', encoding='utf-8') as file:
            file.write(content)
        
        os.remove(f)

print("Campus files moved and their internal links updated.")

# Step 2: Fix links pointing TO campus files from all other HTML files in the project
# This includes root files (index.html, login.html), endings/ endingX.html, article/ articleX.html, hole/ etc.

def update_links_to_campus(file_path, depth):
    # depth is how many folders deep the file is from root. 0 for root, 1 for endings/, article/
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        
    original = content
    
    def replacer(match):
        attr = match.group(1)
        link = match.group(2)
        
        # If the link matches exactly one of the campus files (or with # / ?)
        for cf in campus_files:
            if link == cf or link.startswith(cf + '#') or link.startswith(cf + '?'):
                # The file is at root, but referencing campus file which was also at root.
                # Now the campus file is at campus/cf
                # If we are at root (depth 0), we change to campus/cf
                # If we are at depth 1 (e.g. endings/ending0.html), it was pointing to ../cf.
                # Wait, if the link in ending was pointing to `../cf`, the regex below handles it? NO.
                if depth == 0:
                    return f'{attr}="campus/{link}"'
                
        # What if it's pointing from endings/ending0.html which has href="../staff.html"?
        # Actually my script in refactor_endings already converted href="staff.html" to href="../staff.html".
        # So link will be "../staff.html"
        for cf in campus_files:
            if link == f"../{cf}" or link.startswith(f"../{cf}#") or link.startswith(f"../{cf}?"):
                return f'{attr}="../campus/{link[3:]}"'
            if link.startswith(f"../../{cf}"): # depth 2?
                return f'{attr}="../../campus/{link[6:]}"'
                
        return f'{attr}="{link}"'
        
    content = re.sub(r'(src|href)="([^"]+)"', replacer, content)
    
    # Check JS window.location.href="staff.html"
    for cf in campus_files:
        if depth == 0:
            content = content.replace(f'window.location.href = "{cf}"', f'window.location.href = "campus/{cf}"')
        elif depth == 1:
            content = content.replace(f'window.location.href = "../{cf}"', f'window.location.href = "../campus/{cf}"')
    
    if original != content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated references in {file_path}")

# Scan all html/js files in the project
for root, dirs, files in os.walk('.'):
    # ignore .git, campus
    if '.git' in root or 'campus' in root:
        continue
    
    depth = root.replace('.', '').count(os.sep)
    
    for f in files:
        if f.endswith('.html') or f.endswith('.js'):
            update_links_to_campus(os.path.join(root, f), depth)

print("All external references to campus files updated.")
