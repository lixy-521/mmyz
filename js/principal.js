/**
 * principal.js — 王明德校长工作平台
 * 狼堡一中·学生失踪
 */

// ─── 邮件（校长视角，比dxf更高层更冷静）───
const PRINCIPAL_MAILS = [
    {
        from: "陈昱",
        to: "王明德",
        date: "8月12日 10:21",
        subject: "格致计划合作意向确认",
        preview: "王校长，感谢上次会面……",
        body: `王校长，

感谢上次会面。研究院决定将格致计划的第一个校园合作点定在狼堡一中，主要基于以下考虑：学校历史上与我院有过渊源（1998年），王校长本人的理解与配合，以及贵校理科生源的质量。

合作模式已在附件中详述，此处不赘述。有一点需要再次强调：项目全程须在严格保密条件下进行，不对学生家长、普通教职工及外界公开。受试者以「志愿者」名义参与，签署的同意书措辞经过处理，不涉及「神经采集」等敏感字样。

期待合作顺利。

——陈昱
北境神经工程研究院`
    },
    {
        from: "王明德",
        to: "陈昱",
        date: "8月14日 22:08",
        subject: "Re: 同意，条件确认",
        preview: "陈博士，合作条件我确认……",
        body: `陈博士，

合作条件我确认，研究院的诉求我也理解。

有一点我需要再明确：如果实验过程中出现受试者身体异常，处置方案是什么？1998年的教训我至今记得，那次出了问题之后花了很长时间才平息。这次我不想再有变数。

另外，外部说辞已安排好。旧实验楼整修公告将在10月发布，对外解释楼内异常出入。校内知情人员只有我和董新飞，其余人员均不知情。

——王明德`
    },
    {
        from: "陈昱",
        to: "王明德",
        date: "10月29日 07:55",
        subject: "首批数据质量反馈",
        preview: "王校长，昨晚首次采集完成……",
        body: `王校长，

昨晚首次采集完成，受试者林小雨体征平稳，脑波质量优于预期。这个受试者的认知模型构建价值很高。

设备运行稳定，B203的隔离效果也符合要求。董老师的执行力不错。

预计完整采集周期6周，期间受试者将持续处于诱导状态。请做好对外解释工作，她家人那边的说辞需要统一。

——陈昱`
    },
    {
        from: "董新飞",
        to: "王明德",
        date: "11月20日 23:47",
        subject: "【紧急】刘天清已处置",
        preview: "王校长，今晚出现意外……",
        body: `王校长，

今晚刘天清强行进入了旧实验楼。他一直在私下调查林小雨的失踪，图书馆的借阅记录暴露了他的调查方向，但我们没有及时注意到。

已紧急处置，刘天清目前已纳入实验，与林小雨一同处于稳定状态。今晚警报记录已关闭，图书馆闭馆日志已补录。

两人生命体征平稳，实验继续正常运行。

档案系统密码我将另行发送。

——董新飞  23:47`
    },
    {
        from: "王明德",
        to: "董新飞",
        date: "11月20日 23:58",
        subject: "Re: 知道了，处理后事",
        preview: "知道了。档案密码你还记得……",
        body: `知道了。

档案系统密码你应该记得，当初我们商定的那个：格致+年份+学校英文名，三段拼在一起。

做好保密工作，如有学生或家长询问，统一说回老家了。

那个孩子得了竞赛一等奖……算了。校园网的新闻留着，免得有人注意到时间差。

——王明德  23:58`
    },
    {
        from: "陈昱",
        to: "王明德",
        date: "12月2日 08:30",
        subject: "关于刘天清数据",
        preview: "王校长，这个意外收获……",
        body: `王校长，

刘天清的数学思维数据采集质量远超预期，这是我们一直缺少的维度——高度结构化的逻辑推理模式，和林小雨的创意型认知模型形成了绝佳互补。

说实话，这是个意外收获。

林小雨的数据理论上已采集完毕，但刘天清还需要2-3周。建议两人同步维持到刘天清采集结束，届时再一并处置。

关于「处置」方式——我需要再次提醒你，有且只有一种不留痕迹的唤醒方式。届时请使用实验室控制台的参数三，系统会自动完成数据写回并断开设备。强制断开或输入无效参数会造成不可逆损伤，那样后续会很麻烦。

——陈昱`
    }
];

// ─── 档案密码 ───
const PRINCIPAL_ARCHIVE_PASSWORD = "GZ2023WOLF";

// ─── 档案内容（校长版：更高权限，含完整参数名称）───
const PRINCIPAL_ARCHIVE_CONTENT = `
<div class="campus-card mb-16">
  <div class="campus-card-header">📋 格致计划 — 实验控制手册（校长版）v2.3</div>
  <div class="campus-card-body">
    <p style="font-size:12px;color:#6b7f93;margin-bottom:16px">最高机密 | 校长账号专属 | 最后更新：11月20日 | 实验地点：旧实验楼 B203</p>

    <h3 style="color:#1a3a5c;margin-bottom:8px">一、实验参数说明</h3>
    <p style="font-size:13px;color:#6b7f93;margin-bottom:16px">以下三种参数须由校长账号在实验室控制台执行，dxf账号无操作权限。</p>

    <div style="background:#f5f8fc;border-radius:6px;padding:16px;margin-bottom:16px">
      <p style="margin-bottom:8px"><strong style="color:#c8962e">参数一：工作参数（WORK）— 默认状态</strong></p>
      <p style="line-height:1.9;font-size:13px">
        维持受试者持续的深度诱导状态，同步采集脑波与思维模式数据。
        受试者意识完全离线，生命体征稳定。数据采集效率最高。
      </p>
    </div>

    <div style="background:#fffbf0;border:1px solid #f0d090;border-radius:6px;padding:16px;margin-bottom:16px">
      <p style="margin-bottom:8px"><strong style="color:#856404">参数二：待机参数（STANDBY）</strong></p>
      <p style="line-height:1.9;font-size:13px">
        暂停数据采集，切换为生命维持模式。受试者仍处于诱导状态，可随时恢复采集。
      </p>
      <p style="color:#856404;font-size:12px;margin-top:8px">
        注意：超过48小时将导致受试者醒来后出现记忆碎片化，部分近期记忆模糊或丢失。
      </p>
    </div>

    <div style="background:#f0fff5;border:1px solid #90d0a0;border-radius:6px;padding:16px;margin-bottom:16px">
      <p style="margin-bottom:8px"><strong style="color:#1e7e4a">参数三：逆向参数（REVERSE）</strong></p>
      <p style="line-height:1.9;font-size:13px">
        将已采集的全部思维数据完整写回受试者大脑，对所有采集操作执行逆向还原。
        写回完成后仪器自动断开，受试者在15-30分钟内自然苏醒，记忆与认知完整无损。
      </p>
      <p style="color:#1e7e4a;font-size:12px;margin-top:8px;font-weight:600">
        这是唯一能让受试者在无后遗症情况下苏醒的参数。
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
      前往「实验室管理」→ 搜索「格致」→ 点击「调整参数」→ 输入参数名称（如：逆向参数）→ 确认执行。<br>
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
      <div class="mail-detail hidden">
        <div class="mail-detail-meta">发件人：${m.from} | 收件人：${m.to} | 时间：${m.date}</div>
        <div class="mail-detail-body">${m.body.replace(/\n/g, "<br>")}</div>
      </div>
    </li>`).join("");
}

function toggleMail(i, el) {
    const detail = el.querySelector(".mail-detail");
    const isOpen = !detail.classList.contains("hidden");
    document.querySelectorAll(".mail-item").forEach(li => {
        li.querySelector(".mail-detail").classList.add("hidden");
        li.style.background = "";
    });
    if (!isOpen) {
        detail.classList.remove("hidden");
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

function tryUnlock() {
    const val = document.getElementById("archive-password")?.value.trim();
    const errEl = document.getElementById("archive-error");
    if (!val) return;
    if (val === PRINCIPAL_ARCHIVE_PASSWORD) {
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
            true
        );
    }
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
    document.getElementById("app-modal").classList.add("active");
}

function closeModal() {
    document.getElementById("app-modal")?.classList.remove("active");
    window._modalConfirmCb = null;
}
