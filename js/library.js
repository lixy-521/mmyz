/**
 * library.js — 图书管理系统（拼音/汉字兼容搜索）
 */

// 拼音兼容
const BORROWER_PINYIN = {
  "刘天清": "刘天清", "liutianqing": "刘天清", "ltq": "刘天清",
  "林小雨": "林小雨", "linxiaoyu": "林小雨", "lxy": "林小雨",
  "王嘉宇": "王嘉宇", "wangjiayu": "王嘉宇",
  "陈思雨": "陈思雨", "chensiyu": "陈思雨"
};
const BOOK_PINYIN = {
  "都市传说研究": "都市传说研究", "dushi": "都市传说研究", "dushichuanshuo": "都市传说研究",
  "异常心理学": "异常心理学", "xinlixue": "异常心理学", "yichang": "异常心理学",
  "建筑结构安全": "建筑结构安全", "jianzhu": "建筑结构安全", "jiegou": "建筑结构安全",
  "逆向思维训练": "逆向思维训练", "nixiang": "逆向思维训练", "逆向": "逆向思维训练",
  "klein有机化学": "Klein有机化学", "klein": "Klein有机化学",
  "有机化学": "Klein有机化学", "youjihuaxue": "Klein有机化学",
  "校园安全手册": "校园安全手册", "anquan": "校园安全手册",
  "监控系统原理": "监控系统原理", "jiankong": "监控系统原理",
  "高中数学竞赛指南": "高中数学竞赛指南", "suxue": "高中数学竞赛指南"
};

function resolveName(raw) {
  const q = raw.trim().toLowerCase().replace(/\s/g, "");
  for (const [k, v] of Object.entries(BORROWER_PINYIN)) {
    if (q === k.toLowerCase()) return v;
  }
  return raw.trim();
}
function resolveBook(raw) {
  const q = raw.trim().toLowerCase().replace(/\s/g, "");
  for (const [k, v] of Object.entries(BOOK_PINYIN)) {
    if (q === k.toLowerCase()) return v;
  }
  return raw.trim();
}

const BORROWER_DB = {
  "刘天清": [
    { title: "都市传说研究", category: "社会学", status: "已还", statusClass: "success" },
    { title: "异常心理学", category: "心理学", status: "已还", statusClass: "success" },
    { title: "建筑结构安全", category: "工程", status: "已还", statusClass: "success" },
    { title: "逆向思维训练", category: "心理学", status: "已还", statusClass: "success" }
  ],
  "林小雨": [
    { title: "Klein有机化学", category: "化学", status: "逾期未还（75天）", statusClass: "danger" }
  ],
  "王嘉宇": [
    { title: "高中数学竞赛指南", category: "数学", status: "已还", statusClass: "success" }
  ],
  "陈思雨": [
    { title: "英语写作范文精选", category: "语文", status: "已还", statusClass: "success" }
  ]
};

const BOOK_DB = {
  "都市传说研究": {
    isbn: "978-7-01-334455-2",
    category: "社会学",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      { user: "刘天清", date: "10月20日", returnDate: "11月1日",
        comment: "第三章「封闭建筑的地下结构」——学校的老楼通常比档案记录的更深。" }
    ]
  },
  "异常心理学": {
    isbn: "978-7-01-556677-9",
    category: "心理学",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      { user: "刘天清", date: "10月25日", returnDate: "11月5日",
        comment: "记忆干预章节。人在深度诱导状态下，思维数据是可以被外部设备读取的。这不是科幻。" }
    ]
  },
  "建筑结构安全": {
    isbn: "978-7-04-778899-5",
    category: "工程",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      { user: "刘天清", date: "11月3日", returnDate: "11月12日",
        comment: "旧实验楼1998年档案记录为「拆除」，但图纸显示地下B层结构完整保留。图书馆有没有1997年之前的校园建筑档案？" }
    ]
  },
  "逆向思维训练": {
    isbn: "978-7-01-234567-8",
    category: "心理学",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      { user: "刘天清", date: "11月8日", returnDate: "11月15日",
        comment: "「把参数重置到起点」——逆向。这个词，记住。" }
    ]
  },
  "Klein有机化学": {
    isbn: "978-7-04-567890-1",
    category: "化学",
    status: "借出（逾期未还）",
    currentBorrower: "林小雨（逾期 53 天）",
    history: [
      { user: "刘天清", date: "11月5日", returnDate: "11月15日",
        comment: "这本书上次dxf借的，还的时候夹了张便条没取走。便条是北境神经工程研究院（bnei.edu）的内部联系单，上面写着dxf的系统密码：Lbyz@dxf2023! 。研究院统一管理合作学校的账号，难怪密码格式这么奇怪。" }
    ]
  },
  "校园安全手册": {
    isbn: "978-7-05-112233-1",
    category: "管理",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      { user: "", date: "12月1日", returnDate: "—", comment: "" }
    ],
    newArrival: true
  },
  "监控系统原理": {
    isbn: "978-7-05-445566-8",
    category: "工程",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      { user: "刘天清", date: "11月18日", returnDate: "11月19日",
        comment: "114.255.14.191" }
    ],
    newArrival: true
  },
  "高中数学竞赛指南": {
    isbn: "978-7-01-998877-3",
    category: "数学",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      { user: "王嘉宇", date: "10月10日", returnDate: "10月25日", comment: "好书！" },
      { user: "刘天清", date: "11月1日", returnDate: "11月8日", comment: "" }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      this.classList.add("active");
      document.getElementById(this.dataset.tab)?.classList.add("active");
    });
  });

  const borrowerBtn = document.getElementById("borrower-search-btn");
  const borrowerInput = document.getElementById("borrower-search-input");
  if (borrowerBtn) borrowerBtn.addEventListener("click", () => searchBorrower(borrowerInput?.value));
  if (borrowerInput) borrowerInput.addEventListener("keydown", e => { if (e.key === "Enter") searchBorrower(borrowerInput.value); });

  const bookBtn = document.getElementById("book-search-btn");
  const bookInput = document.getElementById("book-search-input");
  if (bookBtn) bookBtn.addEventListener("click", () => searchBook(bookInput?.value));
  if (bookInput) bookInput.addEventListener("keydown", e => { if (e.key === "Enter") searchBook(bookInput.value); });
});

function searchBorrower(name) {
  if (!name) return;
  const q = resolveName(name);
  const resultEl = document.getElementById("borrower-result");
  if (!resultEl) return;

  const records = BORROWER_DB[q];
  if (!records) {
    resultEl.innerHTML = `<div class="campus-alert campus-alert-info">系统中无此人借阅记录，请确认姓名</div>`;
    return;
  }

  const rows = records.map(r => `
    <tr>
      <td>${r.title}</td>
      <td>${r.category}</td>
      <td><span class="campus-badge campus-badge-${r.statusClass}">${r.status}</span></td>
    </tr>`).join("");

  resultEl.innerHTML = `
    <div class="campus-alert campus-alert-success mb-16">找到 <strong>${q}</strong> 的 ${records.length} 条借阅记录</div>
    <table class="campus-table">
      <thead><tr><th>书名</th><th>分类</th><th>状态</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="text-muted mt-12" style="font-size:12px">如需查看书籍详细留言，请切换到「书籍状态查询」</p>`;
}

function searchBook(title) {
  if (!title) return;
  const q = resolveBook(title);
  const resultEl = document.getElementById("book-result");
  if (!resultEl) return;

  const book = BOOK_DB[q];
  if (!book) {
    resultEl.innerHTML = `<div class="campus-alert campus-alert-info">系统中无「${title}」的记录，请确认书名</div>`;
    return;
  }

  const historyRows = book.history.map(h => {
    // 关键留言的显示：看起来像普通备注，不特殊高亮
    const commentHtml = h.comment
      ? `<div style="margin-top:8px;background:#fffbf0;border-left:3px solid #c8962e;padding:8px 12px;border-radius:4px;font-size:13px;font-family:'Courier New',monospace;color:#1e2d3d;word-break:break-all;">
           读者留言：${h.comment}
         </div>`
      : `<div style="margin-top:4px;font-size:12px;color:#6b7f93">（无留言）</div>`;
    return `
      <tr>
        <td>${h.user}</td>
        <td>${h.date}</td>
        <td>${h.returnDate}</td>
        <td style="max-width:320px">${commentHtml}</td>
      </tr>`;
  }).join("");

  resultEl.innerHTML = `
    <div class="campus-alert campus-alert-success mb-16">书籍查询结果：<strong>${q}</strong></div>
    <div class="campus-card mb-16">
      <div class="campus-card-header">书籍基本信息</div>
      <div class="campus-card-body">
        <table class="campus-table">
          <tr><th width="100">书名</th><td>${q}</td></tr>
          <tr><th>ISBN</th><td class="text-mono">${book.isbn}</td></tr>
          <tr><th>分类</th><td>${book.category}</td></tr>
          <tr><th>当前状态</th><td><span class="campus-badge ${book.status.includes("逾期") ? "campus-badge-danger" : "campus-badge-success"}">${book.status}</span>${book.newArrival ? ' <span class="campus-badge campus-badge-danger" style="margin-left:6px;font-size:10px">11月新到馆</span>' : ""}</td></tr>
          <tr><th>当前借阅人</th><td>${book.currentBorrower}</td></tr>
        </table>
      </div>
    </div>
    <div class="campus-card">
      <div class="campus-card-header">借阅历史记录</div>
      <div class="campus-card-body" style="padding:0;overflow:auto">
        <table class="campus-table">
          <thead><tr><th>借阅人</th><th>借阅日期</th><th>归还日期</th><th>读者留言</th></tr></thead>
          <tbody>${historyRows}</tbody>
        </table>
      </div>
    </div>`;
}
