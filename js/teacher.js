/**
 * teacher.js — 教师工作台：实验室 / 邮件 / 档案
 */

// ─── 邮件数据 ───
const MAILS = [
    {
        from: "王明德",
        to: "董新飞",
        date: "8月30日 10:05",
        subject: "格致计划准备进度如何？",
        preview: "董老师您好，请问格致计划的准备工作……",
        body: `董老师您好，\n\n开学在即，格致计划的前期准备工作进展如何？设备有没有到位？\n志愿者招募的通知请在开学后尽快发出，名额控制在10人以内。\n\n此事不对外公开，请通知相关了解情况的同事做好保密工作。\n\n——王明德`
    },
    {
        from: "董新飞",
        to: "王明德",
        date: "9月1日 20:41",
        subject: "Re: 格致计划准备就绪",
        preview: "王校长，一切准备就绪。设备已……",
        body: `王校长，\n\n一切准备就绪。设备已经在9月初运进旧实验楼，地下室隔离效果良好，外面基本听不到声音。\n志愿者招募通知已在校园网论坛发布，预计10日截止，届时选出合适对象。\n\n实验预计12日正式启动，首批受试者1名。\n\n——董新飞`
    },
    {
        from: "董新飞",
        to: "王明德",
        date: "9月15日 08:22",
        subject: "首批实验数据情况汇报",
        preview: "王校长，9月12日首次实验进展顺利……",
        body: `王校长，\n\n9月12日首次实验进展顺利。受试者（林同学）体征稳定，脑波采集质量良好，数据质量优于预期。\n受试者目前处于稳定的深度诱导状态，生命体征一切正常。\n\n根据计划，下一步将继续维持采集，预计完整采集周期约4-6周。\n\n——董新飞`
    },
    {
        from: "董新飞",
        to: "王明德",
        date: "10月14日 23:47",
        subject: "【紧急】出现意外，已控制",
        preview: "王校长，今晚出现了些情况……",
        body: `王校长，\n\n今晚出现了意外情况。有一名高二学生（刘同学）通过某些途径得知了一些信息，今晚强行进入了旧实验楼。\n\n已紧急处置，该学生目前已被纳入实验，与林同学一同处于稳定状态。\n\n目前仪器正常运转，两人生命体征平稳。档案系统已更新所有参数文档，密码我将另行发送。\n请您放心，此事不会外泄。\n\n——董新飞  23:47`
    },
    {
        from: "王明德",
        to: "董新飞",
        date: "10月14日 23:58",
        subject: "Re: 知道了，保持现状",
        preview: "知道了。档案密码发你……",
        body: `知道了。\n\n档案系统访问密码：GZ2023WOLF\n请做好一切保密工作，无论如何不能让第三方介入。\n\n如果有学生或家长询问，统一说是回老家了。\n\n——王明德  23:58`
    }
];

// ─── 档案内容 ───
const ARCHIVE_PASSWORD = "GZ2023WOLF";
const ARCHIVE_CONTENT = `
<div class="campus-card mb-16">
  <div class="campus-card-header">📋 格致计划 — 实验参数说明文档 v2.3</div>
  <div class="campus-card-body">
    <p style="font-size:12px;color:#6b7f93;margin-bottom:16px">机密文件 | 仅限项目组核心成员查阅 | 最后更新：10月14日</p>

    <h3 style="color:#1a3a5c;margin-bottom:8px">一、项目简介</h3>
    <p style="line-height:1.9;margin-bottom:16px">
      格致计划（GEZHI PROJECT）是狼堡一中与外部科研机构合作开展的思维数据采集实验。
      实验通过专用神经接口设备，在受试者处于深度诱导状态时，无创采集并记录其思维模式数据，
      目标是建立"最优学习参数模型"，用于改善教育系统的个性化适配能力。
    </p>

    <h3 style="color:#1a3a5c;margin-bottom:8px">二、实验状态参数说明</h3>
    <div style="background:#f5f8fc;border-radius:6px;padding:16px;margin-bottom:16px">
      <p style="margin-bottom:12px"><strong style="color:#c8962e">★ 工作参数（默认状态）</strong></p>
      <p style="line-height:1.9;font-size:13px">
        维持受试者持续的深度诱导状态，同步采集脑波与思维模式数据。
        受试者处于"冬眠样"状态，生命体征稳定但意识完全离线。
        此为实验的标准运行模式，数据采集效率最高。
      </p>
    </div>
    <div style="background:#fffbf0;border:1px solid #f0d090;border-radius:6px;padding:16px;margin-bottom:16px">
      <p style="margin-bottom:12px"><strong style="color:#856404">★ 待机参数（STANDBY）</strong></p>
      <p style="line-height:1.9;font-size:13px">
        暂停数据采集，仪器切换为"生命维持"模式，维持受试者基础生命体征但不进行任何数据读写。
        受试者仍处于诱导状态。可随时重新切换回工作参数恢复采集。
      </p>
      <p style="color:#856404;font-size:12px;margin-top:8px">
        ⚠ 注意：长期处于待机状态（超过48小时）可能导致受试者醒来后出现轻微记忆碎片化，
        具体表现为对部分近期记忆的模糊或遗失，通常为非核心情感记忆。
      </p>
    </div>
    <div style="background:#f0fff5;border:1px solid #90d0a0;border-radius:6px;padding:16px;margin-bottom:16px">
      <p style="margin-bottom:12px"><strong style="color:#1e7e4a">★ 逆向参数（REVERSE）</strong></p>
      <p style="line-height:1.9;font-size:13px">
        将已采集的全部思维数据完整写回受试者大脑，等价于对所有采集操作执行"逆向还原"。
        写回完成后仪器自动断开连接，受试者将在15-30分钟内自然苏醒，记忆与认知完整无损。
        这是唯一能让受试者在不留后遗症情况下苏醒的参数。
      </p>
    </div>
    <div style="background:#fff0f0;border:1px solid #e09090;border-radius:6px;padding:16px">
      <p style="margin-bottom:8px"><strong style="color:#c0392b">⚠ 绝对禁止事项</strong></p>
      <p style="line-height:1.9;font-size:13px;color:#c0392b">
        严禁在未完成参数切换的情况下强制手动断开仪器连接，
        严禁输入无效参数导致系统异常中止。
        上述操作将导致受试者脑细胞不可逆损伤，后果极其严重。
        实验异常中止期间，如受试者大脑未完成数据写回，将导致不可逆神经损伤甚至死亡。
      </p>
    </div>

    <h3 style="color:#1a3a5c;margin:16px 0 8px">三、当前受试者状态</h3>
    <p style="font-size:13px;color:#6b7f93">（请前往实验室管理系统查看实时数据）</p>
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

function doArchiveUnlock() {
    const input = document.getElementById("archive-password");
    const resultEl = document.getElementById("archive-content");
    const errEl = document.getElementById("archive-error");
    if (!input || !resultEl) return;

    if (input.value.trim() === ARCHIVE_PASSWORD) {
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
            <div class="vital-value" style="font-size:14px;color:#c0392b">θ波异常</div>
            <div class="vital-unit">深度诱导 · 异常偏高</div>
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
            ⚠ 请根据实验档案中的参数说明输入正确参数。操作不可逆，请确认后提交。
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
        () => { window.location.href = "ending0.html"; }
    );
}

function submitParam() {
    const val = document.getElementById("param-input")?.value.trim();
    if (!val) return;

    if (val === "待机参数" || val === "STANDBY") {
        openModal(
            "确认切换参数",
            "即将切换为<strong>待机参数</strong>。\n\n仪器将暂停数据采集，维持受试者基础生命体征。\n请确认此操作。",
            () => { window.location.href = "ending1.html"; }
        );
    } else if (val === "逆向参数" || val === "REVERSE") {
        openModal(
            "确认切换参数",
            "即将启动<strong>逆向参数</strong>。\n\n系统将把采集到的全部数据写回受试者大脑。\n此过程约需15-30分钟，完成后受试者自然苏醒。\n\n请确认此操作。",
            () => { window.location.href = "ending2.html"; }
        );
    } else {
        openModal(
            "参数无效",
            `输入的参数 "<strong>${val}</strong>" 不在有效参数列表中。\n\n系统将执行<strong style='color:#c0392b'>异常中止流程</strong>，后果不可预测。`,
            () => { window.location.href = "ending0.html"; },
            true // danger mode
        );
    }
}

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
