/**
 * 文件名称：js/forum.js
 * 功能描述：校园论坛前端交互逻辑 - 处理帖子渲染、折叠回复及 ID 实时搜索
 * 依赖文件：
 *   - js/forum-data.js (提供底层数据映射)
 *   - css/forum.css (视图样式)
 * 维护部门：狼堡一中学生会 / 信息中心
 * 最后更新：2026-03-19
 */

document.addEventListener("DOMContentLoaded", () => {
  renderFixedPosts();
  const searchInput = document.getElementById("forum-search-input");
  const searchBtn = document.getElementById("forum-search-btn");
  if (searchBtn) searchBtn.addEventListener("click", () => doForumSearch(searchInput?.value));
  if (searchInput) searchInput.addEventListener("keydown", e => { if (e.key === "Enter") doForumSearch(searchInput.value); });
});

function renderFixedPosts() {
  const container = document.getElementById("forum-posts");
  if (!container) return;
  container.innerHTML = FIXED_POSTS.map(renderPost).join("");
}

function renderPost(post) {
  // 已删帖：显示删除痕迹
  if (post.deleted) {
    return `
  <div class="forum-post" style="opacity:0.55;border-left:3px solid #c0392b">
    <div class="forum-post-header">
      <span class="campus-badge campus-badge-danger" style="margin-right:6px">已删除</span>
      <div class="forum-post-title" style="color:#999;text-decoration:line-through">${post.title}</div>
      <div class="forum-post-meta">
        <span>👤 ${post.authorId}</span>
        <span>🕐 ${post.time}</span>
        <span style="color:#c0392b">⚠ 该帖子已被管理员删除</span>
      </div>
    </div>
    <div class="forum-post-body" style="color:#bbb;font-size:13px;font-style:italic">[ 此内容已被移除 ]</div>
  </div>`;
  }

  const repliesHtml = post.comments.map(c => `
    <div class="forum-reply">
      <div class="forum-reply-avatar" style="background:${hashColor(c.id)}">${c.id.charAt(0).toUpperCase()}</div>
      <div>
        <span class="forum-reply-id">${c.id}</span>
        <span style="font-size:13px;color:#2c3e50">${c.text}</span>
      </div>
    </div>`).join("");

  return `
  <div class="forum-post">
    <div class="forum-post-header">
      ${post.pinned ? '<span class="campus-badge campus-badge-danger" style="margin-right:6px">精华</span>' : ""}
      <div class="forum-post-title">${post.title}</div>
      <div class="forum-post-meta">
        <span>👤 ${post.authorId}</span>
        <span>🕐 ${post.time}</span>
        <span>👁 ${post.views}</span>
        <span>💬 ${post.replies || post.comments.length}</span>
      </div>
    </div>
    <div class="forum-post-body" style="white-space:pre-line">${post.body}</div>
    <div class="forum-post-footer">
      <button class="forum-toggle-btn" onclick="forumToggle('${post.id}-replies', this)">
        展开 ${post.comments.length} 条回复 ▾
      </button>
    </div>
    <div class="forum-replies" id="${post.id}-replies">
      <div class="forum-replies-inner">${repliesHtml}</div>
    </div>
  </div>`;
}

function doForumSearch(query) {
  if (!query) return;
  const resolved = resolveId(query);
  const resultArea = document.getElementById("forum-search-result");
  if (!resultArea) return;

  const posts = ID_POSTS[resolved];
  if (!posts) {
    resultArea.innerHTML = `
      <div class="campus-alert campus-alert-info" style="margin-bottom:16px">
        📭 未找到用户 "<strong>${query.trim()}</strong>" 的发帖记录
      </div>`;
    return;
  }

  const postsHtml = posts.map((p, i) => {
    const tmpId = `search-post-${i}`;
    const repliesHtml = p.comments.map(c => `
      <div class="forum-reply">
        <div class="forum-reply-avatar" style="background:${hashColor(c.id)}">${c.id.charAt(0).toUpperCase()}</div>
        <div>
          <span class="forum-reply-id">${c.id}</span>
          <span style="font-size:13px;color:#2c3e50">${c.text}</span>
        </div>
      </div>`).join("");

    return `
    <div class="forum-post">
      <div class="forum-post-header">
        <div class="forum-post-title">${p.title}</div>
        <div class="forum-post-meta">
          <span>👤 ${resolved}</span>
          <span>🕐 ${p.time}</span>
          <span>💬 ${p.comments.length}</span>
        </div>
      </div>
      <div class="forum-post-body" style="white-space:pre-line">${p.body}</div>
      <div class="forum-post-footer">
        <button class="forum-toggle-btn" onclick="forumToggle('${tmpId}-replies', this)">
          展开 ${p.comments.length} 条回复 ▾
        </button>
      </div>
      <div class="forum-replies" id="${tmpId}-replies">
        <div class="forum-replies-inner">${repliesHtml}</div>
      </div>
    </div>`;
  }).join("");

  resultArea.innerHTML = `
    <div class="campus-alert campus-alert-success mb-16">
      找到用户 "<strong>${resolved}</strong>" 的 ${posts.length} 条发帖记录
    </div>
    ${postsHtml}`;
}

function forumToggle(targetId, btn) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const isOpen = target.classList.toggle("open");
  btn.textContent = isOpen
    ? btn.textContent.replace("展开", "收起").replace("▾", "▴")
    : btn.textContent.replace("收起", "展开").replace("▴", "▾");
}

function hashColor(str) {
  const colors = ["#1a3a5c", "#2e4a7c", "#3a6080", "#1e5a3a", "#5a1e3a", "#3a3a1e", "#1e3a5a", "#4a2e6a"];
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) & 0xff;
  return colors[h % colors.length];
}
