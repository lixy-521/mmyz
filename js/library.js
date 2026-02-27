/**
 * library.js — 图书管理系统（拼音/汉字兼容搜索）
 */

// 拼音兼容
const BORROWER_PINYIN = {
  "刘天清": "刘天清", "liutianqing": "刘天清", "ltq": "刘天清",
  "林小雨": "林小雨", "linxiaoyu": "林小雨", "lxy": "林小雨"
};
const BOOK_PINYIN = {
  "社会性动物": "社会性动物", "shehui": "社会性动物",
  "行为分析导论": "行为分析导论", "xingwei": "行为分析导论",
  "逆向思维训练": "逆向思维训练", "nixiang": "逆向思维训练", "逆向": "逆向思维训练",
  "klein有机化学": "Klein有机化学", "klein": "Klein有机化学",
  "有机化学": "Klein有机化学", "youjihuaxue": "Klein有机化学"
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
    { title: "社会性动物", category: "心理学", status: "已还", statusClass: "success" },
    { title: "行为分析导论", category: "心理学", status: "已还", statusClass: "success" },
    { title: "逆向思维训练", category: "心理学", status: "已还", statusClass: "success" }
  ],
  "林小雨": [
    { title: "Klein有机化学", category: "化学", status: "逾期未还", statusClass: "danger" }
  ],
  "王嘉宇": [
    { title: "高中数学竞赛指南", category: "数学", status: "在馆", statusClass: "success" }
  ],
  "陈思雨": [
    { title: "英语写作范文精选", category: "语文", status: "已还", statusClass: "success" }
  ]
};

const BOOK_DB = {
  "逆向思维训练": {
    isbn: "978-7-01-234567-8",
    category: "心理学",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      { user: "刘天清", date: "10月2日", returnDate: "10月10日",
        comment: "书里有句话我一直记着：「真正的逆向，不是反方向走，而是把参数重置到起点。」——这句话以后或许有用。" }
    ]
  },
  "Klein有机化学": {
    isbn: "978-7-04-567890-1",
    category: "化学",
    status: "借出（逾期未还）",
    currentBorrower: "林小雨（逾期 12 天）",
    history: [
      { user: "刘天清", date: "9月20日", returnDate: "9月28日",
        comment: "董mima：Lbyz@dxf2023！" }
    ]
  },
  "社会性动物": {
    isbn: "978-7-01-112233-4",
    category: "心理学",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      { user: "刘天清", date: "9月5日", returnDate: "9月20日", comment: "" }
    ]
  },
  "行为分析导论": {
    isbn: "978-7-01-445566-7",
    category: "心理学",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      { user: "刘天清", date: "9月22日", returnDate: "10月1日", comment: "" }
    ]
  },
  "高中数学竞赛指南": {
    isbn: "978-7-01-998877-3",
    category: "数学",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      { user: "王嘉宇", date: "9月10日", returnDate: "9月25日", comment: "好书！" }
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
          <tr><th>当前状态</th><td><span class="campus-badge ${book.status.includes("逾期") ? "campus-badge-danger" : "campus-badge-success"}">${book.status}</span></td></tr>
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
