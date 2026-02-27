/**
 * security.js — 保安监控查询系统（拼音/汉字兼容）
 */

const RECORDS = {
  "9月12日_旧实验楼": { persons: ["董新飞", "林小雨"], time: "21:34", note: "" },
  "10月13日_旧实验楼": { persons: ["董新飞"], time: "22:18", note: "" },
  "10月15日_旧实验楼": { persons: ["董新飞", "刘天清"], time: "23:02", note: "出入记录尚未更新" }
};

// 10月16日起维护
const MAINTENANCE_DATES = ["10月16日","10月17日","10月18日","10月19日","10月20日"];

// 拼音/别名映射
const LOC_ALIAS = {
  "旧实验楼": "旧实验楼", "jiushiyanlo": "旧实验楼", "lao": "旧实验楼",
  "图书馆": "图书馆", "tushu": "图书馆", "library": "图书馆",
  "行政楼": "行政楼", "xingzheng": "行政楼",
  "操场": "操场", "caochang": "操场",
  "食堂": "食堂", "shitang": "食堂",
  "教学楼a": "教学楼A", "教学楼A": "教学楼A",
  "教学楼b": "教学楼B", "教学楼B": "教学楼B",
  "体育馆": "体育馆", "tiyuguan": "体育馆"
};

const LOCATIONS = ["请选择地点", "旧实验楼", "图书馆", "行政楼", "操场", "食堂", "教学楼A", "教学楼B", "体育馆"];
const DATES = [
  "请选择日期",
  "9月1日","9月5日","9月10日","9月12日","9月15日","9月20日","9月25日","9月30日",
  "10月1日","10月5日","10月8日","10月10日","10月12日","10月13日","10月14日","10月15日",
  "10月16日","10月17日","10月18日","10月19日","10月20日"
];

document.addEventListener("DOMContentLoaded", () => {
  if (typeof requireRole === "function") requireRole("security");
  populateSelects();
  const queryBtn = document.getElementById("query-btn");
  if (queryBtn) queryBtn.addEventListener("click", doQuery);

  // 支持手动输入
  const manualBtn = document.getElementById("manual-query-btn");
  if (manualBtn) manualBtn.addEventListener("click", doManualQuery);
});

function populateSelects() {
  const dateSelect = document.getElementById("date-select");
  const locSelect = document.getElementById("loc-select");
  if (dateSelect) DATES.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d; opt.textContent = d;
    dateSelect.appendChild(opt);
  });
  if (locSelect) LOCATIONS.forEach(l => {
    const opt = document.createElement("option");
    opt.value = l; opt.textContent = l;
    locSelect.appendChild(opt);
  });
}

function doQuery() {
  const date = document.getElementById("date-select")?.value;
  const loc = document.getElementById("loc-select")?.value;
  if (!date || date === "请选择日期" || !loc || loc === "请选择地点") {
    showResult(`<span class="t-warn">ERR: 请选择有效的日期和地点后查询</span>`);
    return;
  }
  query(date, loc);
}

function doManualQuery() {
  const dateInput = document.getElementById("manual-date")?.value.trim();
  const locInput = document.getElementById("manual-loc")?.value.trim();
  if (!dateInput || !locInput) {
    showResult(`<span class="t-warn">ERR: 请输入日期和地点</span>`);
    return;
  }
  const resolvedLoc = LOC_ALIAS[locInput.toLowerCase().replace(/\s/g,"")] || locInput;
  query(dateInput, resolvedLoc);
}

function query(date, loc) {
  const resultEl = document.getElementById("terminal-result");
  if (!resultEl) return;

  if (MAINTENANCE_DATES.includes(date)) {
    showResult(`<span class="t-dim">─────────────────────────────────────</span>
<span class="t-warn">⚠ 系统通知：${date} 录像设备处于维护状态</span>
<span class="t-warn">  记录不可用。如需查阅请联系信息中心。</span>
<span class="t-dim">─────────────────────────────────────</span>`);
    return;
  }

  const key = `${date}_${loc}`;
  const record = RECORDS[key];

  if (record) {
    showResult(`<span class="t-dim">─────────────────────────────────────</span>
<span class="t-ok">✓ 查询完成</span>
<span class="t-data">查询条件：${date}  /  ${loc}</span>
<span class="t-data">记录时间：${record.time}</span>
<span class="t-data">进入人员：</span>
${record.persons.map(p => `<span class="t-warn">    → ${p}</span>`).join("\n")}
${record.note ? `<span class="t-dim">    备注：${record.note}</span>` : ""}
<span class="t-dim">─────────────────────────────────────</span>`);
  } else {
    showResult(`<span class="t-dim">─────────────────────────────────────</span>
<span class="t-ok">✓ 查询完成</span>
<span class="t-data">查询条件：${date}  /  ${loc}</span>
<span class="t-ok">  本时段无异常进出记录</span>
<span class="t-dim">─────────────────────────────────────</span>`);
  }
}

function showResult(html) {
  const el = document.getElementById("terminal-result");
  if (el) el.innerHTML = html;
}
