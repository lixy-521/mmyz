/**
 * 文件名称：js/teacher.js
 * 功能描述：教师办公系统核心逻辑 - 处理实验室状态查看、邮件阅读与人员档案检索
 * 依赖文件：
 *   - js/teacher-data.js (人员/邮件数据支持)
 *   - js/auth.js (权限校验支持)
 * 维护部门：狼堡一中教务处
 * 最后更新：2026-03-19
 */


// ─── 档案内容 ───
// SHA-256("GZ2023LBYZ")
const ARCHIVE_HASH = "f58b5efe0982ca18f796fbc44cbba872a5105a46c0f327dda6702d9412efc96a";
const ARCHIVE_CONTENT = `
<div class="campus-card mb-16">
  <div class="campus-card-header">📋 格致计划 — 实验参数说明文档 v2.3</div>
  <div class="campus-card-body">
    <p style="font-size:12px;color:#6b7f93;margin-bottom:16px">机密文件 | 仅限项目组核心成员查阅 | 最后更新：11月20日 | 实验地点：旧实验楼 B203</p>
    <p style="font-size:11px;color:#888;margin-bottom:16px">本项目承续自1998年中止的「格致原计划」。技术支持方：北境神经工程研究院（顾问：C.Y.）。</p>

    <h3 style="color:#1a3a5c;margin-bottom:8px">一、项目简介</h3>
    <p style="line-height:1.9;margin-bottom:16px">
      格致计划（GEZHI PROJECT）是狼堡一中与外部科研机构合作开展的思维数据采集实验。
      实验通过专用神经接口设备，在受试者处于深度诱导状态时，无创采集并记录其思维模式数据，
      目标是建立"最优学习参数模型"。
    </p>

    <h3 style="color:#1a3a5c;margin-bottom:8px">二、实验状态参数说明</h3>
    <p style="font-size:13px;color:#6b7f93;margin-bottom:12px">参数由校长账号统一管理与执行。以下为技术备忘。</p>
    <div style="background:#f5f8fc;border-radius:6px;padding:16px;margin-bottom:16px">
      <p style="margin-bottom:8px;font-size:13px;color:#444"><strong>参数一（默认运行）</strong></p>
      <p style="line-height:1.9;font-size:13px;color:#666">
        维持受试者深度诱导状态，持续采集脑波数据。意识完全离线，生命体征稳定。
      </p>
    </div>
    <div style="background:#fffbf0;border:1px solid #f0d090;border-radius:6px;padding:16px;margin-bottom:16px">
      <p style="margin-bottom:8px;font-size:13px;color:#444"><strong>参数二（暂停采集）</strong></p>
      <p style="line-height:1.9;font-size:13px;color:#666">
        暂停数据读写，切换为生命维持模式。受试者仍处于诱导状态，但长期使用会导致记忆碎片化。
      </p>
      <p style="margin-bottom:6px;font-size:13px;color:#c0392b"><strong>禁止事项</strong></p>
      <p style="line-height:1.9;font-size:13px;color:#c0392b">
        严禁强制断开仪器连接或输入无效参数。异常中止将导致不可逆神经损伤甚至死亡。
      </p>
    </div>

    <h3 style="color:#1a3a5c;margin:20px 0 8px">三、权限说明</h3>
    <p style="font-size:13px;color:#6b7f93;line-height:1.9">
      实验室控制台的实际操作权限归属<strong>校长账号</strong>（wmd_principal）。<br>
      本账号（dxf_teacher）仅可查看实时状态，无法执行参数切换。<br>
      如需执行操作，请退出后以校长账号登录。
    </p>
  </div>
</div>`;

// ─── 状态 ───
let currentSection = "lab";
let archiveUnlocked = false;

document.addEventListener("DOMContentLoaded", () => {
  requireRole && requireRole("teacher");
  initSidebar();
  initMails();
  initLab();
  initArchive();
  initModal();
  initPersonnel();
});

function initSidebar() {
  document.querySelectorAll(".sys-sidebar-item").forEach(item => {
    item.addEventListener("click", function () {
      document.querySelectorAll(".sys-sidebar-item").forEach(i => i.classList.remove("active"));
      document.querySelectorAll(".sys-section").forEach(s => s.classList.remove("active"));
      this.classList.add("active");
      const sec = this.dataset.section;
      document.getElementById("sec-" + sec)?.classList.add("active");
    });
  });
}

// ─── 邮件 ───
function initMails() {
  const list = document.getElementById("mail-list");
  if (!list) return;
  list.innerHTML = MAILS.map((m, i) => `
    <li class="mail-item" onclick="toggleMail(${i}, this)">
      <div class="mail-avatar">${m.from.charAt(0)}</div>
      <div class="mail-info">
        <div class="mail-name">
          ${m.from} → ${m.to}
          <span class="mail-date">${m.date}</span>
        </div>
        <div class="mail-subject">${m.subject}</div>
        <div class="mail-preview">${m.preview}</div>
        <div class="mail-detail" id="mail-${i}">
          <div class="mail-detail-meta">发件人：${m.from} | 收件人：${m.to} | 时间：${m.date}</div>
          <div style="white-space:pre-line">${m.body}</div>
        </div>
      </div>
    </li>`).join("");
}

function toggleMail(id, item) {
  const detail = document.getElementById("mail-" + id);
  if (!detail) return;
  const isOpen = detail.classList.toggle("open");
  item.style.background = isOpen ? "#f5f8fc" : "";
}

// ─── 档案 ───
function initArchive() {
  const archiveBtn = document.getElementById("archive-unlock-btn");
  if (archiveBtn) {
    archiveBtn.addEventListener("click", doArchiveUnlock);
  }
  const archiveInput = document.getElementById("archive-password");
  if (archiveInput) {
    archiveInput.addEventListener("keydown", e => { if (e.key === "Enter") doArchiveUnlock(); });
  }
}

async function doArchiveUnlock() {
  const input = document.getElementById("archive-password");
  const resultEl = document.getElementById("archive-content");
  const errEl = document.getElementById("archive-error");
  if (!input || !resultEl) return;

  const inputVal = input.value.trim();
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(inputVal));
  const inputHash = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");

  if (inputHash === ARCHIVE_HASH) {
    if (errEl) errEl.classList.add("hidden");
    document.getElementById("archive-lock")?.classList.add("hidden");
    resultEl.innerHTML = ARCHIVE_CONTENT;
    resultEl.classList.remove("hidden");
    archiveUnlocked = true;
  } else {
    if (errEl) {
      errEl.textContent = "密码错误，访问被拒绝";
      errEl.classList.remove("hidden");
    }
    input.value = "";
    input.focus();
  }
}

// ─── 实验室 ───
function initLab() {
  const searchBtn = document.getElementById("lab-search-btn");
  const searchInput = document.getElementById("lab-search-input");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => searchProject(searchInput?.value));
  }
  if (searchInput) {
    searchInput.addEventListener("keydown", e => { if (e.key === "Enter") searchProject(searchInput.value); });
  }
}

function searchProject(keyword) {
  if (!keyword) return;
  const q = keyword.trim();
  const resultEl = document.getElementById("lab-result");
  if (!resultEl) return;

  if (q.includes("格致") || q === "gezhi" || q === "GEZHI") {
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
        <div style="margin-top:14px;padding:12px 16px;background:#f8f0f0;border:1px solid #e0b0a0;border-radius:6px;font-size:13px;color:#8a4030;">
          权限不足 — 实验终止与参数调整操作需由校长账号执行。<br>
          <span style="font-size:12px;color:#aaa;margin-top:4px;display:block">如有紧急情况，请联系王明德校长（wmd_principal）登录后处理。</span>
        </div>
      </div>`;
  } else {
    resultEl.innerHTML = `<div class="campus-alert campus-alert-info">未找到项目 "${q}"，请检查项目名称</div>`;
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


// 实验室操作已移至 principal.js（校长账号）

// ─── Modal ───
let _confirmCallback = null;

function openModal(title, body, onConfirm, isDanger = false) {
  _confirmCallback = onConfirm;
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-body").innerHTML = body.replace(/\n/g, "<br>");
  const confirmBtn = document.getElementById("modal-confirm");
  confirmBtn.className = "campus-btn " + (isDanger ? "campus-btn-danger" : "campus-btn-primary");
  confirmBtn.textContent = isDanger ? "确认（不可撤销）" : "确认";
  document.getElementById("app-modal").classList.add("open");
}

function initModal() {
  document.getElementById("modal-cancel")?.addEventListener("click", closeModal);
  document.getElementById("modal-confirm")?.addEventListener("click", () => {
    closeModal();
    if (_confirmCallback) _confirmCallback();
  });
  document.getElementById("app-modal")?.addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });
}

function closeModal() {
  document.getElementById("app-modal")?.classList.remove("open");
}
