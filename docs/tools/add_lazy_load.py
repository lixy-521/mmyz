import os
import glob
import re

def add_lazy_loading(root_dir):
    print("Adding loading='lazy' to images...")
    
    html_files = glob.glob(os.path.join(root_dir, '**/*.html'), recursive=True)
    for file_path in html_files:
        if 'node_modules' in file_path or 'assets_backup' in file_path:
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 不要给 logo 和 a1 轮播首图加 lazy
        def replace_img(match):
            img_tag = match.group(0)
            if 'loading=' in img_tag:
                return img_tag
            if 'logo.webp' in img_tag or 'a1.webp' in img_tag:
                return img_tag
            return img_tag.replace('<img ', '<img loading="lazy" ')

        new_content = re.sub(r'<img [^>]+>', replace_img, content)

        # 在 index.html 添加预加载
        if os.path.basename(file_path) == 'index.html':
            if '<link rel="preload"' not in new_content:
                preload_tags = """
    <link rel="preload" href="css/base.css" as="style" />
    <link rel="preload" href="css/layout.css" as="style" />
    <link rel="preload" href="css/mobile.css" as="style" />
    <link rel="preload" href="assets/index/a1.webp" as="image" />
    <link rel="preload" href="assets/logo.webp" as="image" />"""
                new_content = new_content.replace('</title>', f'</title>\n{preload_tags}')
                
        if content != new_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {os.path.basename(file_path)}")

if __name__ == '__main__':
    base_dir = r"c:\Users\21934\Desktop\tuozhu\mmyz"
    add_lazy_loading(base_dir)
    print("Lazy loading and preload setup complete!")
