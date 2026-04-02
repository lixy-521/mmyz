import os
import re

endings_dir = "endings"
if not os.path.exists(endings_dir):
    os.makedirs(endings_dir)

files = ["ending0.html", "ending1.html", "ending2.html"]

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace relative links pointing to root files/assets with ../
        # E.g., src="assets/" -> src="../assets/"
        # href="css/" -> href="../css/"
        content = re.sub(r'(src|href)="((?!http|https|#|data:))', r'\1="../', content)
        # But wait, what if it's already ../ or something else?
        # A safer pattern: match specific directories and root HTML files
        content = re.sub(r'(src|href)="\.\./', r'\1="!!__UP__!!', content) # Temporary shield
        content = re.sub(r'(src|href)="(assets/|css/|js/|[^/]+\.html)', r'\1="../\2', content)
        content = content.replace("!!__UP__!!", "../")
        
        with open(os.path.join(endings_dir, f), 'w', encoding='utf-8') as file:
            file.write(content)
        
        os.remove(f)

# Update principal.js to point to endings/endingX.html 
p_file = "js/principal.js"
if os.path.exists(p_file):
    with open(p_file, "r", encoding='utf-8') as f:
        p_content = f.read()
    p_content = re.sub(r'window\.location\.href = "ending(\d)\.html"', r'window.location.href = "endings/ending\1.html"', p_content)
    with open(p_file, "w", encoding='utf-8') as f:
        f.write(p_content)

print("Endings moved and updated successfully.")
