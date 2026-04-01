/**
 * 文件名称：js/library.js
 * 功能描述：图书馆管理系统逻辑 - 处理图书检索、借阅记录查询及校园建筑档案解密展示
 * 主要功能：
 *   - 读者/书籍拼音模糊搜索 (BORROWER_DB, BOOK_DB)
 *   - 建筑档案渲染 (ARCHIVE_SVG) - 包含旧实验楼 1F/B1 平面图
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
  "高中数学竞赛指南": "高中数学竞赛指南", "suxue": "高中数学竞赛指南",
  "密码学基础": "密码学基础", "mimaxue": "密码学基础"
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
    { title: "密码学基础", category: "计算机", status: "已还", statusClass: "success" },
    { title: "都市传说研究", category: "社会学", status: "已还", statusClass: "success" },
    { title: "异常心理学", category: "心理学", status: "已还", statusClass: "success" },
    { title: "建筑结构安全", category: "工程", status: "已还", statusClass: "success" },
    { title: "逆向思维训练", category: "心理学", status: "已还", statusClass: "success" },
    { title: "高中数学竞赛指南", category: "数学", status: "已还", statusClass: "success" },
    { title: "监控系统原理", category: "工程", status: "已还", statusClass: "success" }
  ],
  "林小雨": [
    { title: "Klein有机化学", category: "化学", status: "已还", statusClass: "success" }
  ],
  "王嘉宇": [
    { title: "高中数学竞赛指南", category: "数学", status: "已还", statusClass: "success" }
  ],
  "陈思雨": [
    { title: "英语写作范文精选", category: "英语", status: "已还", statusClass: "success" }
  ]
};

const BOOK_DB = {
  "都市传说研究": {
    isbn: "978-7-01-334455-2",
    category: "社会学",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      {
        user: "刘天清", date: "10月20日", returnDate: "11月1日",
        comment: "第三章「封闭建筑的地下结构」——学校的老楼通常比档案记录的更深。"
      }
    ]
  },
  "异常心理学": {
    isbn: "978-7-01-556677-9",
    category: "心理学",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      {
        user: "刘天清", date: "10月25日", returnDate: "11月5日",
        comment: "记忆干预章节。人在深度诱导状态下，思维数据是可以被外部设备读取的。这不是科幻。"
      }
    ]
  },
  "建筑结构安全": {
    isbn: "978-7-04-778899-5",
    category: "工程",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      {
        user: "刘天清", date: "11月3日", returnDate: "11月12日",
        comment: "旧实验楼1998年档案记录上只有地面层的功能，但图纸显示地下B层结构完整保留。图书馆有没有1997年之前的校园建筑档案？ / 附：馆员告知，旧图纸存于馆藏档案袋，编号 LBYZ-1997-B，可在「馆藏档案」栏目检索。"
      },
    ]
  },
  "逆向思维训练": {
    isbn: "978-7-01-234567-8",
    category: "心理学",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      {
        user: "刘天清", date: "11月8日", returnDate: "11月18日",
        comment: "「把参数反转」——逆向。这个词，记住。"
      }
    ]
  },
  "Klein有机化学": {
    isbn: "978-7-04-567890-1",
    category: "化学",
    status: "借出（逾期未还）",
    currentBorrower: "刘天清（逾期 52 天）",
    history: [
      {
        user: "刘天清", date: "10月5日", returnDate: "-",
        comment: "这个很有意思啊，真没想到dxf是这样的"
      },
      {
        user: "林小雨", date: "9月5日", returnDate: "9月7日",
        comment: "这本书上次dxf借的，还的时候夹了张便条没取走。便条上只有一个网址：<a href=\"G7y0k293s/dxf.html\" style=\"color:#1a3a5c\">G7y0k293s/dxf.html\</a>"
      }
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
      {
        user: "刘天清", date: "11月13日", returnDate: "11月15日",
        comment: "稍微翻了一下，感觉咱们学校现在的监控探头全是上个世纪的老古董，特别是旧实验楼那边，全损画质而且还有死角，有跟没有一样。"
      }
    ],
    newArrival: true
  },
  "密码学基础": {
    isbn: "978-7-03-123456-0",
    category: "计算机",
    status: "在馆",
    currentBorrower: "（当前无人借阅）",
    history: [
      {
        user: "刘天清", date: "11月17日", returnDate: "11月19日",
        comment: "第四章古典加密与现代通讯有点意思，这两天跑去提取旧实验楼B区配电间待机状态下的加密日志，利用波形分析提取密钥流后进行按位取反操作，发现好像得出了一个挺有意思的参数。"
      }
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

// ─── 馆藏档案查询 ───
const ARCHIVE_DB = {
  "LBYZ-1997-B": {
    title: "狼堡市第一中学旧实验楼建筑施工图（地面层 + 地下层）",
    year: "1997年",
    type: "建筑图纸 / 工程档案",
    condition: "纸质原件已数字化扫描，原件存于B1档案室",
    note: "本图纸为1997年竣工验收版本，含地面层（1F）及地下层（B1）完整平面布局。1998年后仅有局部设备更新记录，整体结构未变。",
    svg: true
  }
};

function ARCHIVE_SVG() {
  return `
<div style="margin-top:20px">
  <div class="campus-card">
    <div class="campus-card-header" style="display:flex;align-items:center;justify-content:space-between">
      <span>📐 建筑平面图（数字化版本）</span>
      <span style="font-size:11px;color:#6b7f93;font-weight:400">档案编号 LBYZ-1997-B · 1997年竣工版</span>
    </div>
    <div class="campus-card-body" style="padding:16px 12px">

      <!-- 图例 -->
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px;font-size:12px;color:#6b7f93">
        <span><span style="display:inline-block;width:14px;height:14px;background:#d4e6f8;border:1px solid #8ab4d4;vertical-align:middle;border-radius:2px;margin-right:4px"></span>普通房间</span>
        <span><span style="display:inline-block;width:14px;height:14px;background:#fde8c8;border:1px solid #c8962e;vertical-align:middle;border-radius:2px;margin-right:4px"></span>设备/机械间</span>
        <span><span style="display:inline-block;width:14px;height:14px;background:#f0d0d0;border:1px solid #c0392b;vertical-align:middle;border-radius:2px;margin-right:4px"></span>实验室</span>
        <span><span style="display:inline-block;width:14px;height:14px;background:#d5f0da;border:1px solid #27ae60;vertical-align:middle;border-radius:2px;margin-right:4px"></span>楼梯/走廊</span>
        <span style="color:#c0392b;font-weight:500">★ 标注房间为关键位置</span>
      </div>

      <!-- 1F 平面图 -->
      <div style="font-size:13px;font-weight:600;color:#1a3a5c;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #eee">
        地面层（1F）· 旧实验楼
      </div>
      <svg width="100%" viewBox="0 0 640 240" style="display:block;margin-bottom:20px;border:1px solid #ddd;border-radius:6px;background:#fafafa">
        <!-- 外墙 -->
        <rect x="20" y="20" width="600" height="200" rx="4" fill="none" stroke="#555" stroke-width="2.5"/>

        <!-- 走廊（中央水平通道） -->
        <rect x="20" y="105" width="600" height="30" fill="#d5f0da" stroke="#27ae60" stroke-width="0.8"/>
        <text x="320" y="123" text-anchor="middle" font-size="10" fill="#1e6040">主走廊</text>

        <!-- 上方房间（北侧） -->
        <!-- 化学实验室A -->
        <rect x="20" y="20" width="130" height="85" fill="#f0d0d0" stroke="#c0392b" stroke-width="1"/>
        <text x="85" y="55" text-anchor="middle" font-size="10" fill="#7b1a1a">化学实验室A</text>
        <text x="85" y="68" text-anchor="middle" font-size="9" fill="#999">（1F-101）</text>

        <!-- 物理实验室 -->
        <rect x="150" y="20" width="130" height="85" fill="#f0d0d0" stroke="#c0392b" stroke-width="1"/>
        <text x="215" y="55" text-anchor="middle" font-size="10" fill="#7b1a1a">物理实验室</text>
        <text x="215" y="68" text-anchor="middle" font-size="9" fill="#999">（1F-102）</text>

        <!-- 储藏室 -->
        <rect x="280" y="20" width="90" height="85" fill="#d4e6f8" stroke="#8ab4d4" stroke-width="1"/>
        <text x="325" y="60" text-anchor="middle" font-size="10" fill="#1a3a5c">储藏室</text>
        <text x="325" y="73" text-anchor="middle" font-size="9" fill="#999">（1F-103）</text>

        <!-- 楼梯间A（北侧，标记） -->
        <rect x="370" y="20" width="70" height="85" fill="#d5f0da" stroke="#27ae60" stroke-width="1.5" stroke-dasharray="4 2"/>
        <text x="405" y="52" text-anchor="middle" font-size="9" fill="#1e6040" font-weight="600">楼梯间A</text>
        <text x="405" y="64" text-anchor="middle" font-size="8" fill="#c0392b" font-weight="700">↓ B1</text>
        <text x="405" y="76" text-anchor="middle" font-size="8" fill="#999">ST-A</text>

        <!-- 教师休息室 -->
        <rect x="440" y="20" width="100" height="85" fill="#d4e6f8" stroke="#8ab4d4" stroke-width="1"/>
        <text x="490" y="55" text-anchor="middle" font-size="10" fill="#1a3a5c">教师休息室</text>
        <text x="490" y="68" text-anchor="middle" font-size="9" fill="#999">（1F-104）</text>

        <!-- 右侧走廊连接 -->
        <rect x="540" y="20" width="80" height="85" fill="#d5f0da" stroke="#27ae60" stroke-width="0.8"/>
        <text x="580" y="60" text-anchor="middle" font-size="9" fill="#1e6040">消防通道</text>

        <!-- 下方房间（南侧） -->
        <!-- 锅炉房（标记重点） -->
        <rect x="20" y="135" width="110" height="85" fill="#fde8c8" stroke="#c8962e" stroke-width="1.5"/>
        <text x="75" y="170" text-anchor="middle" font-size="10" fill="#7a5010" font-weight="600">锅炉房</text>
        <text x="75" y="183" text-anchor="middle" font-size="9" fill="#999">（1F-201）</text>
        <text x="75" y="197" text-anchor="middle" font-size="8" fill="#c0392b" font-weight="600">★</text>

        <!-- 楼梯间B（锅炉房旁，关键入口，重点标记） -->
        <rect x="130" y="135" width="70" height="85" fill="#d5f0da" stroke="#c0392b" stroke-width="2" stroke-dasharray="5 2"/>
        <text x="165" y="163" text-anchor="middle" font-size="9" fill="#c0392b" font-weight="700">楼梯间B</text>
        <text x="165" y="175" text-anchor="middle" font-size="8" fill="#c0392b" font-weight="700">↓ B1</text>
        <text x="165" y="187" text-anchor="middle" font-size="8" fill="#555">ST-B</text>
        <text x="165" y="199" text-anchor="middle" font-size="8" fill="#c0392b">★ 主入口</text>

        <!-- 化学实验室B -->
        <rect x="200" y="135" width="130" height="85" fill="#f0d0d0" stroke="#c0392b" stroke-width="1"/>
        <text x="265" y="172" text-anchor="middle" font-size="10" fill="#7b1a1a">化学实验室B</text>
        <text x="265" y="185" text-anchor="middle" font-size="9" fill="#999">（1F-202）</text>

        <!-- 仪器室 -->
        <rect x="330" y="135" width="100" height="85" fill="#fde8c8" stroke="#c8962e" stroke-width="1"/>
        <text x="380" y="172" text-anchor="middle" font-size="10" fill="#7a5010">仪器室</text>
        <text x="380" y="185" text-anchor="middle" font-size="9" fill="#999">（1F-203）</text>

        <!-- 办公室 -->
        <rect x="430" y="135" width="110" height="85" fill="#d4e6f8" stroke="#8ab4d4" stroke-width="1"/>
        <text x="485" y="172" text-anchor="middle" font-size="10" fill="#1a3a5c">实验员办公室</text>
        <text x="485" y="185" text-anchor="middle" font-size="9" fill="#999">（1F-204）</text>

        <!-- 配电间 -->
        <rect x="540" y="135" width="80" height="85" fill="#fde8c8" stroke="#c8962e" stroke-width="1"/>
        <text x="580" y="172" text-anchor="middle" font-size="10" fill="#7a5010">配电间</text>
        <text x="580" y="185" text-anchor="middle" font-size="9" fill="#999">（1F-205）</text>

        <!-- 楼层标注 -->
        <text x="30" y="15" font-size="11" fill="#1a3a5c" font-weight="700">1F 地面层</text>
        <!-- 指北针 -->
        <text x="618" y="14" font-size="10" fill="#888">N↑</text>

        <!-- 门（主入口） -->
        <rect x="295" y="218" width="50" height="4" fill="#555" rx="1"/>
        <text x="320" y="240" text-anchor="middle" font-size="9" fill="#555">主入口</text>
      </svg>

      <!-- B1 平面图 -->
      <div style="font-size:13px;font-weight:600;color:#1a3a5c;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #eee">
        地下层（B1）· 旧实验楼
        <span style="font-size:11px;color:#c0392b;font-weight:400;margin-left:10px">⚠ 1998年后本层长期停用，2025年10月起重新启用</span>
      </div>
      <svg width="100%" viewBox="0 0 640 220" style="display:block;margin-bottom:8px;border:1px solid #ddd;border-radius:6px;background:#f5f0ea">
        <!-- 外墙（地下层用略深色背景暗示） -->
        <rect x="20" y="15" width="600" height="190" rx="4" fill="none" stroke="#555" stroke-width="2.5"/>

        <!-- 中央走廊 -->
        <rect x="20" y="95" width="600" height="28" fill="#d5f0da" stroke="#27ae60" stroke-width="0.8"/>
        <text x="320" y="112" text-anchor="middle" font-size="10" fill="#1e6040">B1 主走廊</text>

        <!-- 楼梯间A出口（北侧） -->
        <rect x="370" y="15" width="70" height="80" fill="#d5f0da" stroke="#27ae60" stroke-width="1.5" stroke-dasharray="4 2"/>
        <text x="405" y="48" text-anchor="middle" font-size="9" fill="#1e6040" font-weight="600">楼梯间A</text>
        <text x="405" y="60" text-anchor="middle" font-size="8" fill="#1e6040">↑ 1F</text>
        <text x="405" y="72" text-anchor="middle" font-size="8" fill="#999">ST-A</text>

        <!-- 楼梯间B出口（重点） -->
        <rect x="130" y="123" width="70" height="82" fill="#d5f0da" stroke="#c0392b" stroke-width="2" stroke-dasharray="5 2"/>
        <text x="165" y="153" text-anchor="middle" font-size="9" fill="#c0392b" font-weight="700">楼梯间B</text>
        <text x="165" y="165" text-anchor="middle" font-size="8" fill="#c0392b">↑ 1F</text>
        <text x="165" y="177" text-anchor="middle" font-size="8" fill="#555">ST-B</text>
        <text x="165" y="191" text-anchor="middle" font-size="8" fill="#c0392b">★</text>

        <!-- B101 设备间 -->
        <rect x="20" y="15" width="130" height="80" fill="#fde8c8" stroke="#c8962e" stroke-width="1"/>
        <text x="85" y="50" text-anchor="middle" font-size="10" fill="#7a5010">设备间</text>
        <text x="85" y="63" text-anchor="middle" font-size="9" fill="#999">（B101）</text>

        <!-- B102 -->
        <rect x="150" y="15" width="120" height="80" fill="#d4e6f8" stroke="#8ab4d4" stroke-width="1"/>
        <text x="210" y="50" text-anchor="middle" font-size="10" fill="#1a3a5c">档案储藏室</text>
        <text x="210" y="63" text-anchor="middle" font-size="9" fill="#999">（B102）</text>

        <!-- B103 准备间 -->
        <rect x="270" y="15" width="100" height="80" fill="#fde8c8" stroke="#c8962e" stroke-width="1"/>
        <text x="320" y="50" text-anchor="middle" font-size="10" fill="#7a5010">实验准备间</text>
        <text x="320" y="63" text-anchor="middle" font-size="9" fill="#999">（B103）</text>

        <!-- B104 -->
        <rect x="440" y="15" width="90" height="80" fill="#d4e6f8" stroke="#8ab4d4" stroke-width="1"/>
        <text x="485" y="50" text-anchor="middle" font-size="10" fill="#1a3a5c">通风机房</text>
        <text x="485" y="63" text-anchor="middle" font-size="9" fill="#999">（B104）</text>

        <!-- B105 -->
        <rect x="530" y="15" width="90" height="80" fill="#d4e6f8" stroke="#8ab4d4" stroke-width="1"/>
        <text x="575" y="50" text-anchor="middle" font-size="10" fill="#1a3a5c">备用仓库</text>
        <text x="575" y="63" text-anchor="middle" font-size="9" fill="#999">（B105）</text>

        <!-- B201 走廊旁小室 -->
        <rect x="20" y="123" width="110" height="82" fill="#d4e6f8" stroke="#8ab4d4" stroke-width="1"/>
        <text x="75" y="160" text-anchor="middle" font-size="10" fill="#1a3a5c">工具间</text>
        <text x="75" y="173" text-anchor="middle" font-size="9" fill="#999">（B201）</text>

        <!-- B202 -->
        <rect x="200" y="123" width="100" height="82" fill="#d4e6f8" stroke="#8ab4d4" stroke-width="1"/>
        <text x="250" y="160" text-anchor="middle" font-size="10" fill="#1a3a5c">洗涤间</text>
        <text x="250" y="173" text-anchor="middle" font-size="9" fill="#999">（B202）</text>

        <!-- B203 核心实验室（重点标记） -->
        <rect x="300" y="123" width="150" height="82" fill="#f0d0d0" stroke="#c0392b" stroke-width="2.5"/>
        <text x="375" y="153" text-anchor="middle" font-size="11" fill="#7b1a1a" font-weight="700">B203</text>
        <text x="375" y="167" text-anchor="middle" font-size="9" fill="#7b1a1a">综合实验室</text>
        <text x="375" y="181" text-anchor="middle" font-size="9" fill="#c0392b" font-weight="700">★ 格致计划</text>
        <text x="375" y="194" text-anchor="middle" font-size="8" fill="#999">（2025年10月重新启用）</text>

        <!-- B204 -->
        <rect x="450" y="123" width="90" height="82" fill="#fde8c8" stroke="#c8962e" stroke-width="1"/>
        <text x="495" y="160" text-anchor="middle" font-size="10" fill="#7a5010">变配电室</text>
        <text x="495" y="173" text-anchor="middle" font-size="9" fill="#999">（B204）</text>

        <!-- B205 -->
        <rect x="540" y="123" width="80" height="82" fill="#d4e6f8" stroke="#8ab4d4" stroke-width="1"/>
        <text x="580" y="160" text-anchor="middle" font-size="10" fill="#1a3a5c">应急出口</text>
        <text x="580" y="173" text-anchor="middle" font-size="9" fill="#999">（B205）</text>

        <!-- 楼层标注 -->
        <text x="30" y="12" font-size="11" fill="#1a3a5c" font-weight="700">B1 地下层</text>
        <text x="618" y="12" font-size="10" fill="#888">N↑</text>

        <!-- 红色标注线：楼梯B → B203 路径 -->
        <path d="M 165 205 L 165 210 L 300 210 L 300 195" fill="none" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.6"/>
        <text x="220" y="220" text-anchor="middle" font-size="8" fill="#c0392b" opacity="0.8">← 从楼梯B进入后，沿走廊向东</text>
      </svg>

      <!-- 图纸说明 -->
      <div style="background:#fffbf0;border-left:3px solid #c8962e;padding:10px 14px;border-radius:4px;font-size:12px;color:#5a4000;line-height:1.9;margin-top:8px">
        <strong>档案说明</strong>（1997年竣工记录）<br>
        地下层 B1 于建校初期作为实验辅助区使用，设有综合实验室（B203）、档案储藏室（B102）等功能分区。<br>
        <strong>地面层通往地下层的通道：</strong>楼梯间A（ST-A，北侧）及楼梯间B（ST-B，<span style="color:#c0392b;font-weight:600">锅炉房旁</span>，南侧主入口）。<br>
        1998年后，B1层因设备老化停止使用，对外封闭。<span style="color:#c0392b">2025年10月起，B203重新启用，用途未对外公示。</span>
      </div>

    </div>
  </div>
</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const archiveBtn = document.getElementById("archive-search-btn");
  const archiveInput = document.getElementById("archive-search-input");
  const archiveResult = document.getElementById("archive-result");

  if (!archiveBtn || !archiveInput || !archiveResult) return;

  function doArchiveSearch() {
    const raw = archiveInput.value.trim().toUpperCase().replace(/[\s·]/g, "-");
    // Flexible matching
    const key = Object.keys(ARCHIVE_DB).find(k =>
      raw === k || raw.includes(k.replace("LBYZ-", "")) || k.includes(raw)
    );

    if (!key) {
      archiveResult.innerHTML = `<div class="campus-alert campus-alert-info" style="margin-top:12px">
        未检索到编号「${archiveInput.value.trim()}」的馆藏档案。<br>
        <span style="font-size:12px;color:#6b7f93">提示：请确认编号格式</span>
      </div>`;
      return;
    }

    const a = ARCHIVE_DB[key];
    archiveResult.innerHTML = `
      <div class="campus-alert campus-alert-success" style="margin-top:12px">检索结果：<strong>${key}</strong></div>
      <div class="campus-card" style="margin-top:12px">
        <div class="campus-card-header">档案基本信息</div>
        <div class="campus-card-body">
          <table class="campus-table">
            <tr><th width="100">档案名称</th><td>${a.title}</td></tr>
            <tr><th>归档年份</th><td>${a.year}</td></tr>
            <tr><th>档案类型</th><td>${a.type}</td></tr>
            <tr><th>存档状态</th><td>${a.condition}</td></tr>
            <tr><th>说明</th><td style="font-size:13px;color:#555">${a.note}</td></tr>
          </table>
        </div>
      </div>
      ${a.svg ? ARCHIVE_SVG() : ""}
    `;
  }

  archiveBtn.addEventListener("click", doArchiveSearch);
  archiveInput.addEventListener("keydown", e => { if (e.key === "Enter") doArchiveSearch(); });
});