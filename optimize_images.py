import os
import glob
from PIL import Image

def optimize_images(directory):
    print(f"Optimizing images in {directory}...")
    
    # 查找所有的 png 和 jpg 文件
    for ext in ('**/*.png', '**/*.jpg', '**/*.jpeg'):
        for file_path in glob.glob(os.path.join(directory, ext), recursive=True):
            file_size_kb = os.path.getsize(file_path) / 1024
            # 如果图片大于 100KB，我们统统转 WebP ；对于 UI 小图可以保留
            if file_size_kb > 50:
                try:
                    img = Image.open(file_path)
                    webp_path = os.path.splitext(file_path)[0] + '.webp'
                    
                    # 转换并压缩为 WebP
                    img.save(webp_path, 'WEBP', quality=80, method=6)
                    
                    new_size_kb = os.path.getsize(webp_path) / 1024
                    print(f"Converted: {os.path.basename(file_path)} ({file_size_kb:.1f}KB -> {new_size_kb:.1f}KB)")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

def replace_references(root_dir):
    print("\nReplacing references in code files...")
    extensions = ('*.html', '*.css', '*.js')
    
    for ext in extensions:
        for file_path in glob.glob(os.path.join(root_dir, '**', ext), recursive=True):
            if 'node_modules' in file_path or 'assets_backup' in file_path:
                continue
                
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            # 全局替换资源路径的后缀。这有点暴力，但对于固定项目很有效
            # 我们只替换 assets 目录下的图片引用
            import re
            content = re.sub(r'(assets/[^"\'>]+\.)(png|jpg|jpeg)', r'\1webp', content, flags=re.IGNORECASE)
            
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated references in: {os.path.relpath(file_path, root_dir)}")

if __name__ == '__main__':
    base_dir = r"C:\Users\李翔宇\Desktop\tuozhu\mmyz"
    assets_dir = os.path.join(base_dir, "assets")
    
    # 执行压缩和替换
    optimize_images(assets_dir)
    replace_references(base_dir)
    print("Optimization complete!")
