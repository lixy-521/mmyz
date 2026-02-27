/**
 * forum.js — 校园论坛：固定帖 + ID搜索（拼音/汉字兼容）
 */

// ─── 拼音映射（关键ID） ───
const PINYIN_MAP = {
  "liutianqing": "ltq2007", "刘天清": "ltq2007",
  "ltq": "ltq2007", "ltq2007": "ltq2007",
  "dongxinfei": "dxf_teacher", "董新飞": "dxf_teacher",
  "dxf": "dxf_teacher", "dxf_teacher": "dxf_teacher",
  "admin": "admin_jw", "jiaowuchu": "admin_jw", "admin_jw": "admin_jw",
  "stu9981": "stu_9981", "stu_9981": "stu_9981"
};

function resolveId(raw) {
  const q = raw.trim().toLowerCase().replace(/[\s_-]/g, "");
  for (const [key, val] of Object.entries(PINYIN_MAP)) {
    if (q === key.toLowerCase().replace(/[\s_-]/g, "")) return val;
  }
  return raw.trim();
}

// ─── 固定帖子 ───
const FIXED_POSTS = [
  {
    id: "post-1",
    title: "[求助] 高中数学竞赛有没有好的资料推荐？",
    time: "10月5日 14:22",
    authorId: "stu_2233",
    views: 312, replies: 8,
    body: `最近想自学高中数学竞赛的内容，不知道从哪里入手，求各位推荐一下资料！`,
    comments: [
      { id: "stu_4401", text: "《初等数学问题》挺适合入门的，各大网站有电子版。" },
      { id: "ltq2007", text: "《高中数学竞赛指南》第三版挺好，图书馆有一本，我借过。" },
      { id: "stu_0071", text: "感谢楼上！" },
      { id: "stu_8812", text: "AMC的题也很有用。" },
      { id: "stu_2233", text: "谢谢大家！" },
      { id: "stu_6601", text: "ltq2007 你最近研究什么呢，上次说在研究别的方向？" },
      { id: "ltq2007", text: "……说了你也不一定感兴趣。跟记忆有关的东西。" },
      { id: "stu_6601", text: "记忆？心理学吗" }
    ]
  },
  {
    id: "post-2",
    title: "旧实验楼那边最近是不是有什么情况",
    time: "10月12日 23:08",
    authorId: "stu_5514",
    views: 876, replies: 9,
    body: `今晚从操场回宿舍路过旧实验楼，黑灯瞎火的但能看到地下室窗子有光透出来。\n学校不是说禁止进入整修吗？\n而且感觉能听到低频的声音，不知道是机器还是什么。\n有没有人也注意到了？`,
    comments: [
      { id: "stu_1102", text: "整修工程加班很正常吧" },
      { id: "stu_5514", text: "整修加班到晚上十一点？" },
      { id: "stu_7732", text: "可能是设备测试，别想太多。" },
      { id: "stu_0334", text: "我也看见过，不止一次了，上周也有。" },
      { id: "stu_2291", text: "上周？那不是整修刚开始没多久吗" },
      { id: "stu_0334", text: "对，感觉从10月初就有了，但禁止进入通知是10月10号发的……" },
      { id: "stu_5514", text: "这个顺序有点奇怪" },
      { id: "stu_1102", text: "别疑神疑鬼了，可能早就开始整修只是晚公告。" },
      { id: "stu_anon_x", text: "……树洞有个帖子也说了类似的事，不只你一个人注意到。" }
    ]
  },
  {
    id: "post-3",
    pinned: true,
    title: "【公告】请不要在校园论坛上评价老师！",
    time: "9月20日 08:00",
    authorId: "admin_jw",
    views: 2847, replies: 5,
    body: `近期发现部分同学在论坛发表对老师的不当评论，严重影响校园秩序。\n请所有同学谨记：本论坛为学习交流平台，禁止发表涉及教职工的评价内容，违者将由教务处处理。`,
    comments: [
      { id: "stu_anon", text: "……知道了。" },
      { id: "stu_9981", text: `评论老师去树洞，匿名的。<a href="hole/index.html" style="color:#1a3a5c;font-weight:600;text-decoration:underline">hole.lbyz.internal</a>` },
      { id: "stu_3301", text: "👆 那个网站学生自己搭的，有意思的东西挺多。" },
      { id: "stu_0071", text: "树洞能看什么" },
      { id: "stu_9981", text: "各种，什么都有。自己去看。" }
    ]
  }
];

// ─── ID搜索数据库 ───
const ID_POSTS = {
  "ltq2007": [
    {
      title: "[思考] 关于「还原」的一道思维题",
      time: "10月9日 23:11",
      body: `睡不着，随手想到一道题，欢迎讨论。

一个三维物体被沿某轴做了完整的镜像翻转，等价于把它的所有坐标参数都乘以了 -1。

如果你想把这个物体「完整还原」到翻转之前的状态，你需要对那些参数做什么操作？

说明：这不是数学题，也不是物理题。答案是一个日常的中文词。你不需要计算，只需要理解那个「操作的本质」。`,
      comments: [
        { id: "stu_0044", text: "乘以-1？那不就还是原来了……" },
        { id: "ltq2007", text: "对，但那个「操作」叫什么名字？" },
        { id: "stu_7821", text: "回退？撤销？" },
        { id: "ltq2007", text: "方向对了，再想想，更精确的词，跟「参数」有关。" },
        { id: "stu_3302", text: "感觉这题不只是在问数学……" },
        { id: "ltq2007", text: "你说对了。" }
      ]
    },
    {
      title: "[分享] 几本最近读的书",
      time: "9月25日 21:03",
      body: `最近从图书馆借了几本跨领域的书，分享一下感想：

《社会性动物》：人在群体中的行为模式，读完之后感觉很多事情有了不同解释。
《行为分析导论》：比较学术，有点难啃，但某些章节很关键。
《逆向思维训练》：书名一般，但里面有一句话我觉得挺有意思，大意是说真正的逆向不是反方向走，而是「把参数重置到起点」。

如果有人读过类似方向的书欢迎聊聊。`,
      comments: [
        { id: "stu_8812", text: "你读这些干嘛，心理学方向的？" },
        { id: "ltq2007", text: "不完全是……在研究一个问题。" },
        { id: "stu_8812", text: "什么问题" },
        { id: "ltq2007", text: "暂时不方便说。" }
      ]
    },
    {
      title: "[物理竞赛] 波动光学备考整理",
      time: "9月18日 16:45",
      body: `整理了波动光学的竞赛考点，分享给有需要的同学。\n涵盖：干涉条件、衍射、偏振、光程差计算。\n个人笔记可能有疏漏，欢迎指正。`,
      comments: [
        { id: "stu_8812", text: "谢谢！你最近状态有点奇怪，没什么事吧？" },
        { id: "ltq2007", text: "没事，就是在想一些东西。" }
      ]
    }
  ],

  "dxf_teacher": [
    {
      title: "[招募] 格致科研项目志愿者 · 截止9月10日",
      time: "9月1日 09:00",
      body: `同学们好，

为配合学校与科研机构的合作项目（格致计划），现招募健康数据采集志愿者若干名。

时间：9月12日（周四）晚7:30
地点：旧实验楼 B1 层
项目：无创健康检测，采集基础生理数据，全程约3小时
奖励：50元超市购物券

名额有限，有意向的同学请在本帖回复，截止9月10日。
参与者须签署知情同意书。`,
      comments: [
        { id: "stu_6612", text: "报名！" },
        { id: "stu_0091", text: "报名+1" },
        { id: "lxy_2024", text: "我参加！" },
        { id: "stu_2244", text: "什么叫「基础生理数据」" },
        { id: "dxf_teacher", text: "心率、皮肤电导、脑电基线等常规指标，无创，完全安全。" },
        { id: "stu_5514", text: "旧实验楼不是说要整修吗" },
        { id: "dxf_teacher", text: "B1实验室不受影响，已与维修方协调。" },
        { id: "stu_anon2", text: "旧实验楼晚上……感觉怪怪的" },
        { id: "dxf_teacher", text: "全程有人陪同，请放心报名 😊" }
      ]
    }
  ],

  // 干扰项
  "stu_9981": [
    {
      title: "树洞那个地址是什么",
      time: "9月22日 11:30",
      body: `有人说有个匿名网站，在哪里？`,
      comments: [
        { id: "stu_3301", text: "hole.lbyz.internal，直接在地址栏输就行。" },
        { id: "stu_9981", text: "谢了" }
      ]
    }
  ],
  "admin_jw": [
    {
      title: "【通知】期中考试安排",
      time: "10月16日 08:00",
      body: `期中考试时间：10月20日（周日）\n座位安排请查阅教学楼公告栏\n考试纪律请同学们认真遵守\n\n教务处`,
      comments: []
    }
  ]
};

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
  bindToggle();
}

function renderPost(post) {
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
      ${post.pinned ? '<span class="campus-badge campus-badge-danger" style="margin-right:6px">置顶</span>' : ""}
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
      <button class="forum-toggle-btn" data-target="${post.id}-replies">
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
        <button class="forum-toggle-btn" data-target="${tmpId}-replies">
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
  bindToggle();
}

function bindToggle() {
  document.querySelectorAll(".forum-toggle-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const target = document.getElementById(this.dataset.target);
      if (!target) return;
      const isOpen = target.classList.toggle("open");
      this.textContent = isOpen
        ? this.textContent.replace("展开", "收起").replace("▾", "▴")
        : this.textContent.replace("收起", "展开").replace("▴", "▾");
    });
  });
}

function hashColor(str) {
  const colors = ["#1a3a5c", "#2e4a7c", "#3a6080", "#1e5a3a", "#5a1e3a", "#3a3a1e", "#1e3a5a", "#4a2e6a"];
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) & 0xff;
  return colors[h % colors.length];
}
