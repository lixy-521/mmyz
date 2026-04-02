/**
 * 文件名称：js/principal.js
 * 功能描述：校长办公系统核心逻辑 - 处理高权限档案解锁、实验室实时参数监控与项目管理
 * 依赖文件：
 *   - js/principal-data.js (邮件数据支持)
 *   - js/auth.js (权限校验支持)
 */


// ─── 档案密码（哈希）───
const PRINCIPAL_ARCHIVE_HASH = "f58b5efe0982ca18f796fbc44cbba872a5105a46c0f327dda6702d9412efc96a";

// ─── 档案内容（校长版：更高权限，含完整参数名称）───
const PRINCIPAL_ARCHIVE_CONTENT = `
<div class="campus-card mb-16">
  <div class="campus-card-header">📋 格致计划 — 实验控制手册（校长版）v2.3</div>
  <div class="campus-card-body">
    <p style="font-size:12px;color:#6b7f93;margin-bottom:16px">最高机密 | 校长账号专属 | 最后更新：11月20日 | 实验地点：旧实验楼 B203</p>

    <h3 style="color:#1a3a5c;margin-bottom:8px">一、实验参数说明</h3>
    <p style="font-size:13px;color:#6b7f93;margin-bottom:16px">以下三种参数须由校长账号在实验室控制台执行，其他账号无操作权限。</p>

    <div style="background:#f5f8fc;border-radius:6px;padding:16px;margin-bottom:16px">
      <p style="margin-bottom:8px"><strong style="color:#c8962e">参数一：工作参数（0.0.0.1）— 默认状态</strong></p>
      <p style="line-height:1.9;font-size:13px">
        维持受试者持续的深度诱导状态，同步采集脑波与思维模式数据。
        受试者意识完全离线，生命体征稳定。数据采集效率最高。
      </p>
    </div>

    <div style="background:#fffbf0;border:1px solid #f0d090;border-radius:6px;padding:16px;margin-bottom:16px">
      <p style="margin-bottom:8px"><strong style="color:#856404">参数二：待机参数（168.112.43.255）</strong></p>
      <p style="line-height:1.9;font-size:13px">
        暂停数据采集，切换为生命维持模式。受试者仍处于诱导状态，可随时恢复采集。
      </p>
      <p style="color:#856404;font-size:12px;margin-top:8px">
        注意：超过48小时将导致受试者醒来后出现记忆碎片化，部分近期记忆模糊或丢失。
      </p>
    </div>

    <div style="background:#fff0f0;border:1px solid #e09090;border-radius:6px;padding:14px">
      <p style="margin-bottom:6px;font-size:13px;color:#c0392b"><strong>绝对禁止</strong></p>
      <p style="line-height:1.9;font-size:13px;color:#c0392b">
        严禁强制断开仪器连接或输入无效参数。异常中止将导致受试者不可逆神经损伤甚至死亡。
      </p>
    </div>

    <h3 style="color:#1a3a5c;margin:20px 0 8px">二、控制台操作说明</h3>
    <p style="font-size:13px;color:#6b7f93;line-height:1.9">
      前往「实验室管理」→ 搜索「格致」→ 点击「调整参数」→ 输入参数 → 确认执行。<br>
      或点击「结束实验」强制中止（不推荐，后果不可逆）。
    </p>
  </div>
</div>`;

// ─── 初始化 ───
document.addEventListener("DOMContentLoaded", () => {
  requireRole && requireRole("principal");
  initSidebar();
  initMails();
  initArchive();
  initLab();
  initPersonnel();
  initModal();
});

function initSidebar() {
  document.querySelectorAll(".sys-sidebar-item").forEach(item => {
    item.addEventListener("click", function () {
      document.querySelectorAll(".sys-sidebar-item").forEach(i => i.classList.remove("active"));
      document.querySelectorAll(".sys-section").forEach(s => s.classList.remove("active"));
      this.classList.add("active");
      document.getElementById("sec-" + this.dataset.section)?.classList.add("active");
    });
  });
}

// ─── 邮件 ───
function initMails() {
  const list = document.getElementById("mail-list");
  if (!list) return;
  list.innerHTML = PRINCIPAL_MAILS.map((m, i) => `
    <li class="mail-item" onclick="toggleMail(${i}, this)">
      <div class="mail-item-header">
        <span class="mail-from">${m.from} → ${m.to}</span>
        <span class="mail-date">${m.date}</span>
      </div>
      <div class="mail-subject">${m.subject}</div>
      <div class="mail-preview">${m.preview}</div>
      <div class="mail-detail">
        <div class="mail-detail-meta">发件人：${m.from} | 收件人：${m.to} | 时间：${m.date}</div>
        <div class="mail-detail-body">${m.body.replace(/\n/g, "<br>")}</div>
      </div>
    </li>`).join("");
}

function toggleMail(i, el) {
  const detail = el.querySelector(".mail-detail");
  const isOpen = detail.classList.contains("open");
  document.querySelectorAll(".mail-item").forEach(li => {
    li.querySelector(".mail-detail").classList.remove("open");
    li.style.background = "";
  });
  if (!isOpen) {
    detail.classList.add("open");
    el.style.background = "#f5f8fc";
  }
}

// ─── 档案 ───
let archiveUnlocked = false;
function initArchive() {
  const btn = document.getElementById("archive-unlock-btn");
  const input = document.getElementById("archive-password");
  if (btn) btn.addEventListener("click", tryUnlock);
  if (input) input.addEventListener("keydown", e => { if (e.key === "Enter") tryUnlock(); });
}

async function tryUnlock() {
  const val = document.getElementById("archive-password")?.value.trim();
  const errEl = document.getElementById("archive-error");
  if (!val) return;

  // 符号全角转半角
  const map = { '！': '!', '＠': '@', '＃': '#', '＄': '$', '％': '%', '＾': '^', '＆': '&', '＊': '*', '（': '(', '）': ')', '－': '-', '＿': '_', '＋': '+', '＝': '=', '｛': '{', '｝': '}', '［': '[', '］': ']', '｜': '|', '＼': '\\', '：': ':', '；': ';', '＂': '"', '＇': "'", '＜': '<', '＞': '>', '，': ',', '．': '.', '？': '?', '／': '/' };
  const norm = val.split('').map(c => map[c] || c).join('');

  let letters = [];
  for (let i = 0; i < norm.length; i++) {
    if (norm[i].toLowerCase() !== norm[i].toUpperCase()) {
      letters.push({ i, lower: norm[i].toLowerCase(), upper: norm[i].toUpperCase() });
    }
  }
  if (letters.length > 15) letters = letters.slice(0, 15);

  let matched = false;
  const max = 1 << letters.length;
  const baseChars = norm.toLowerCase().split('');

  for (let i = 0; i < max; i++) {
    const chars = [...baseChars];
    for (let j = 0; j < letters.length; j++) {
      if (i & (1 << j)) chars[letters[j].i] = letters[j].upper;
    }
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(chars.join('')));
    const hash = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
    if (hash === PRINCIPAL_ARCHIVE_HASH) {
      matched = true;
      break;
    }
  }

  if (matched) {
    archiveUnlocked = true;
    document.getElementById("archive-lock").classList.add("hidden");
    const content = document.getElementById("archive-content");
    content.classList.remove("hidden");
    content.innerHTML = PRINCIPAL_ARCHIVE_CONTENT;
  } else {
    if (errEl) {
      errEl.classList.remove("hidden");
      errEl.textContent = "密码错误，请确认后重试";
    }
  }
}

// ─── 实验室 ───
function initLab() {
  const btn = document.getElementById("lab-search-btn");
  const input = document.getElementById("lab-search-input");
  if (btn) btn.addEventListener("click", () => searchProject(input?.value));
  if (input) input.addEventListener("keydown", e => { if (e.key === "Enter") searchProject(input.value); });
}

function searchProject(keyword) {
  if (!keyword) return;
  const q = keyword.trim();
  const resultEl = document.getElementById("lab-result");
  if (!resultEl) return;

  if (q.includes("格致") || q.toLowerCase() === "gezhi") {
    resultEl.innerHTML = `
      <div class="experiment-card warning">
        <div class="experiment-header">
          <div class="status-dot"></div>
          <div class="experiment-name">格致计划 · 正在运行</div>
          <span class="campus-badge campus-badge-danger ml-auto">采集中</span>
        </div>
        <div class="vitals-grid">
          <div class="vital-item">
            <div class="vital-label">受试者A / 刘天清</div>
            <div class="vital-value">68</div>
            <div class="vital-unit">bpm 心率</div>
          </div>
          <div class="vital-item">
            <div class="vital-label">脑波状态</div>
            <div class="vital-value" style="font-size:14px;color:#c87040">θ波偏高</div>
            <div class="vital-unit">深度诱导状态</div>
          </div>
          <div class="vital-item">
            <div class="vital-label">受试者B / 林小雨</div>
            <div class="vital-value">72</div>
            <div class="vital-unit">bpm 心率</div>
          </div>
          <div class="vital-item">
            <div class="vital-label">脑波状态</div>
            <div class="vital-value" style="font-size:14px;color:#856404">δ波稳定</div>
            <div class="vital-unit">深度睡眠状态</div>
          </div>
        </div>
        <p style="font-size:12px;color:#6b7f93;margin-bottom:14px">
          ⏱ 运行时长：35天16小时 &emsp; 📊 数据采集进度：87.3%
        </p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="campus-btn campus-btn-danger" onclick="confirmEnd()">⏹ 结束实验</button>
          <button class="campus-btn campus-btn-primary" onclick="showParamInput()">⚙ 调整参数</button>
        </div>
        <div id="param-area" class="hidden" style="margin-top:16px">
          <div class="campus-alert campus-alert-warning">
            请根据档案系统中的参数说明输入正确参数名称。操作不可逆，请确认后提交。
          </div>
          <div class="campus-search-bar" style="margin-top:10px">
            <input type="text" class="campus-input" id="param-input" placeholder="输入参数名称…" />
            <button class="campus-btn campus-btn-accent" onclick="submitParam()">提交</button>
          </div>
        </div>
      </div>`;
  } else {
    resultEl.innerHTML = `<div class="campus-alert campus-alert-info">未找到项目 "${q}"，请检查项目名称</div>`;
  }
}

function showParamInput() {
  document.getElementById("param-area")?.classList.remove("hidden");
  document.getElementById("param-input")?.focus();
}

function confirmEnd() {
  openModal(
    "确认结束实验",
    "你确定要<strong>强制结束实验</strong>吗？\n\n此操作将立即断开仪器连接，<strong style='color:#c0392b'>后果不可预测</strong>。",
    () => { window.location.href = "endings/ending0.html"; }
  );
}

function submitParam() {
  const val = document.getElementById("param-input")?.value.trim();
  if (!val) return;

  if (val === "168.112.43.255") {
    openModal(
      "确认切换参数",
      "即将切换为<strong>待机参数</strong>。\n\n仪器将暂停数据采集，维持受试者基础生命体征。\n请确认此操作。",
      () => { window.location.href = "endings/ending1.html"; }
    );
  } else if (val === "87.143.212.0") {
    openModal(
      "确认切换参数",
      "即将启动逆向参数 <strong style='font-family:monospace'>87.143.212.0</strong>。\n\n系统将把采集到的全部数据完整写回受试者大脑。\n此过程约需15-30分钟，完成后受试者自然苏醒。\n\n请确认此操作。",
      () => { window.location.href = "endings/ending2.html"; }
    );
  } else {
    openModal(
      "参数无效",
      `输入的参数 "<strong>${val}</strong>" 不在有效参数列表中。\n\n系统将执行<strong style='color:#c0392b'>异常中止流程</strong>，后果不可预测。`,
      () => { window.location.href = "endings/ending0.html"; },
      true
    );
  }
}

// ─── 人员档案搜索 ───
function initPersonnel() {
  const btn = document.getElementById("personnel-search-btn");
  const input = document.getElementById("personnel-search-input");
  if (btn) btn.addEventListener("click", () => searchPersonnel(input?.value));
  if (input) input.addEventListener("keydown", e => { if (e.key === "Enter") searchPersonnel(input.value); });
}

function searchPersonnel(name) {
  if (!name) return;
  const resultEl = document.getElementById("personnel-result");
  if (!resultEl) return;
  const q = name.trim();
  const aliases = {
    "陈昱": "陈昱", "chenyu": "陈昱",
    "张国强": "张国强", "zhangguoqiang": "张国强"
  };
  const resolved = aliases[q.toLowerCase().replace(/\s/g, "")] || aliases[q] || q;
  const person = PERSONNEL_DB[resolved];
  if (!person) {
    resultEl.innerHTML = '<div class="campus-alert campus-alert-info">未找到人员 "' + q + '" 的档案记录<br><span style="font-size:12px;color:#6b7f93">请确认姓名，或联系教务处获取访问权限</span></div>';
    return;
  }
  const contactsHtml = person.contacts.map(function (c) { return '<li style="margin-bottom:4px">' + c + '</li>'; }).join("");
  const warningHtml = person.warning ? '<div style="margin-top:12px;background:#fff3cd;border-left:3px solid #c8962e;padding:10px 14px;font-size:12px;color:#856404">' + person.warning + '</div>' : "";
  resultEl.innerHTML = '<div class="campus-card mb-16">'
    + '<div class="campus-card-header">👤 人员档案：' + person.name + '</div>'
    + '<div class="campus-card-body">'
    + '<table class="campus-table" style="margin-bottom:16px">'
    + '<tr><th width="120">姓名</th><td>' + person.name + '</td></tr>'
    + '<tr><th>职务/身份</th><td>' + person.title + '</td></tr>'
    + '<tr><th>档案编号</th><td class="text-mono">' + person.id + '</td></tr>'
    + '<tr><th>访问权限</th><td>' + person.access + '</td></tr>'
    + '<tr><th>入职/入校日期</th><td>' + person.entryDate + '</td></tr>'
    + '<tr><th>备注</th><td style="color:#856404">' + person.note + '</td></tr>'
    + '</table>'
    + '<div style="margin-bottom:12px"><strong>联系方式</strong>'
    + '<ul style="margin:8px 0 0 16px;font-size:13px;color:#444">' + contactsHtml + '</ul></div>'
    + '<div style="background:#f8f9fa;border-radius:6px;padding:14px;font-size:13px;line-height:1.8;white-space:pre-line;color:#2c3e50">' + person.background + '</div>'
    + warningHtml
    + '</div></div>';
}

// ─── 模态框 ───
function initModal() {
  document.getElementById("modal-cancel")?.addEventListener("click", closeModal);
  document.getElementById("modal-confirm")?.addEventListener("click", () => {
    const cb = window._modalConfirmCb;
    closeModal();
    if (cb) cb();
  });
  document.getElementById("app-modal")?.addEventListener("click", e => {
    if (e.target === document.getElementById("app-modal")) closeModal();
  });
}

function openModal(title, body, onConfirm, danger = false) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-body").innerHTML = body.replace(/\n/g, "<br>");
  const confirmBtn = document.getElementById("modal-confirm");
  confirmBtn.className = "campus-btn " + (danger ? "campus-btn-danger" : "campus-btn-primary");
  window._modalConfirmCb = onConfirm;
  document.getElementById("app-modal").classList.add("open");
}

function closeModal() {
  document.getElementById("app-modal")?.classList.remove("open");
  window._modalConfirmCb = null;
}
