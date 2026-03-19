/**
 * 文件名称：js/security.js
 * 功能描述：保安监控记录系统逻辑 - 处理监控记录的日期/地点联级查询与异常警报展示
 * 主要数据：
 *   - RECORDS: 进出记录数据库 (包含林小雨、刘天清相关的异常触发点)
 *   - MAINTENANCE_DATES: 系统维护/录像丢失日期统计
 * 维护部门：狼堡一中安保处
 * 最后更新：2026-03-19
 */

const RECORDS = {
  // 10月28日：林小雨失踪当晚，警报记录被关闭
  "10月28日_旧实验楼": { persons: ["董新飞", "林小雨", "陈昱"], time: "21:34", note: "当晚22:10触发异常警报，记录状态：已手动关闭", alert: true },
  // 11月：董新飞持续以"设备维修"进入
  "11月5日_旧实验楼": { persons: ["董新飞"], time: "20:41", note: "访客类型：设备维修（维修公司：狼堡精仪科技）" },
  "11月10日_旧实验楼": { persons: ["董新飞"], time: "22:18", note: "访客类型：设备维修 / 实验室：B203" },
  "11月15日_旧实验楼": { persons: ["董新飞", "陈昱"], time: "20:30", note: "访客类型：设备维修 / 外部访客登记：「设备检查」/ 仅登记首字母，完整信息见项目组档案" },
  "11月20日_图书馆": { persons: ["刘天清"], time: "20:05", note: "签到时间：20:05 / 闭馆签出记录：21:30 / 正门摄像头：无对应画面" },
  "11月20日_旧实验楼": { persons: ["董新飞", "刘天清"], time: "23:02", note: "当晚23:18触发异常警报，记录状态：已手动关闭", alert: true },
  // 11月底—12月：B203实验室每晚有使用记录
  "11月22日_旧实验楼": { persons: ["董新飞"], time: "21:55", note: "访客类型：设备维修 / 实验室：B203" },
  "11月25日_旧实验楼": { persons: ["董新飞"], time: "22:03", note: "访客类型：设备维修 / 实验室：B203" },

};

// 维护日期（这期间的录像"丢失"）
const MAINTENANCE_DATES = [
  "10月29日", "10月30日", "10月31日", "11月1日", "11月2日",
  "11月21日", "11月22日"
];

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
  "10月1日", "10月5日", "10月10日", "10月15日", "10月20日", "10月25日", "10月28日",
  "10月29日", "10月30日", "10月31日",
  "11月1日", "11月2日", "11月5日", "11月10日", "11月15日", "11月18日", "11月20日",
  "11月21日", "11月22日", "11月25日"
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
  const resolvedLoc = LOC_ALIAS[locInput.toLowerCase().replace(/\s/g, "")] || locInput;
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
    const alertLine = record.alert
      ? `\n<span style="color:#c0784a;">[ 异常记录 ] ${record.note}</span>`
      : (record.note ? `\n<span class="t-dim">    备注：${record.note}</span>` : "");
    showResult(`<span class="t-dim">─────────────────────────────────────</span>
<span class="t-ok">✓ 查询完成</span>
<span class="t-data">查询条件：${date}  /  ${loc}</span>
<span class="t-data">记录时间：${record.time}</span>
<span class="t-data">进入人员：</span>
${record.persons.map(p => `<span class="t-warn">    → ${p}</span>`).join("\n")}${alertLine}
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
