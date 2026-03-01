/**
 * teacher.js — 教师工作台：实验室 / 邮件 / 档案
 */

// ─── 邮件数据 ───
// ─── 人员档案数据库（教职工 + 外聘人员）───
const PERSONNEL_DB = {
  "陈昱": {
    name: "陈昱",
    title: "外聘顾问 / 北境神经工程研究院首席研究员",
    id: "CY-EXT-2025",
    access: "B级（临时）",
    entryDate: "2025年8月15日",
    note: "格致计划技术支持方负责人，非正式在编人员",
    contacts: [
      "邮箱：chenyu@bnei.edu（已停用）",
      "联系电话：<已屏蔽>",
      "常驻地点：旧实验楼 B203（10月前后）"
    ],
    background: `陈昱，男，生于1975年，神经工程学博士（毕业院校：<已屏蔽>）。
现任北境神经工程研究院首席研究员，长期从事思维数据采集与神经接口技术研究。

工作经历：
- 1998—2003年：参与某高校神经工程实验室项目（项目名称：<已屏蔽>）
- 2003—2015年：就职于<已屏蔽>（涉密机构，访问受限）
- 2015年—今：北境神经工程研究院

与本校关系：2024年通过王明德校长介绍建立合作，担任格致计划技术顾问。`,
    warning: "此人员档案中1998—2003年经历涉及保密项目，部分字段已由信息中心屏蔽。如需完整档案，请联系教务处审核。"
  },
  "张国强": {
    name: "张国强",
    title: "高一数学教师 / 竞赛指导教师",
    id: "ZGQ-20130901",
    access: "A级（正式在编）",
    entryDate: "2013年9月1日",
    note: "刘天清的数学竞赛指导老师，知道刘天清近期研究方向",
    contacts: [
      "办公室：教学楼A座205",
      "内线：8205",
      "邮箱：zhangguoqiang@lbyz.edu"
    ],
    background: `张国强，男，高一数学教师，竞赛指导教师，从教12年。
多名学生在省市级竞赛中获奖。

据记录，张老师是少数几位了解刘天清近期跨学科研究方向的教师之一。
10月15日颁奖当天接受采访，称刘天清"在研究一些我也不完全理解的东西"。

10月16日：张老师向教务处申请查阅刘天清的行踪记录，申请被驳回。
10月18日：张老师再次询问班主任关于刘天清失踪情况，班主任答复"正在处理"。`,
    warning: ""
  }
};

const MAILS = [
    {
        from: "陈昱",
        to: "董新飞",
        date: "9月15日 09:33",
        subject: "设备发货确认 + 实验方案最终版",
        preview: "董老师，设备已于昨日从研究院发出……",
        body: `董老师，\n\n设备已于昨日从研究院发出，预计8月底到校。请确保旧实验楼B203的电路改造在9月1日前完工，我们的设备对电压稳定性要求较高。\n\n最终实验方案已加密附件发送，请注意：\n1. 受试者筛选优先考虑认知活跃度高的学生，竞赛生、理科优等生优先\n2. 诱导剂量按体重比例精确计算，我在文档里附了表格\n3. B203的噪音隔离方案已升级，地面建筑那边基本听不到\n\n另外，王校长那边的说辞请统一为「健康教育数据采集」，不要提「神经接口」这几个字。\n\n——陈昱\n北境神经工程研究院`
    },
    {
        from: "董新飞",
        to: "陈昱",
        date: "9月16日 22:14",
        subject: "Re: 收到，有一个问题",
        preview: "陈博士，收到。有一个问题想确认……",
        body: `陈博士，\n\n收到，设备那边我来协调。\n\n有一个问题我一直想确认：如果实验中途受试者产生应激反应怎么处理？上次你说有「紧急稳定方案」，但文档里没有细节。\n\n另外，这次实验如果出了什么情况，研究院那边会……怎么处理？\n\n——董新飞`
    },
    {
        from: "陈昱",
        to: "董新飞",
        date: "9月17日 08:02",
        subject: "Re: Re: 放心",
        preview: "不会有问题的。这套方案已经在……",
        body: `不会有问题的。\n\n这套方案已经在受控环境下验证过，我不方便告诉你是在哪里验证的，但结果是可靠的。\n\n你只需要负责受试者的接入和日常监测，技术层面的事交给设备。设备会自动处理异常情况。\n\n如果真的有不可控的情况，你知道该怎么做——让学校说是「突发疾病离校」就好。这种事王校长比你有经验。\n\n设备到了之后我会亲自来调试，到时候我们再细谈。\n\n——陈昱`
    },
    {
        from: "王明德",
        to: "董新飞",
        date: "9月30日 10:05",
        subject: "格致计划准备进度如何？",
        preview: "董老师您好，请问格致计划的准备工作……",
        body: `董老师您好，\n\n开学在即，格致计划的前期准备工作进展如何？设备有没有到位？\n志愿者招募的通知请在开学后尽快发出，名额控制在10人以内。\n\nB203实验室已重新激活，这是1998年以来第一次正式启用，请确认设备状态。\n\n此事不对外公开，请通知相关了解情况的同事做好保密工作。\n\n——王明德`
    },
    {
        from: "董新飞",
        to: "王明德",
        date: "10月1日 20:41",
        subject: "Re: 格致计划准备就绪",
        preview: "王校长，一切准备就绪。设备已……",
        body: `王校长，\n\n一切准备就绪。设备已经在9月初运进旧实验楼B203，地下室隔离效果良好，外面基本听不到声音。\n\n对外口径统一为：「狼堡精仪科技」承包旧实验楼设备维修，我每次进出均以此为由登记，记录上会留有痕迹，但维修公司的信息无需细查。\n\n志愿者招募通知已在校园网论坛发布，预计10月20日截止。\n实验预计10月28日正式启动，首批受试者1名。\n\n——董新飞`
    },
    {
        from: "董新飞",
        to: "王明德",
        date: "10月30日 08:22",
        subject: "首批实验数据情况汇报",
        preview: "王校长，10月28日首次实验进展顺利……",
        body: `王校长，\n\n10月28日首次实验进展顺利。受试者（林同学）体征稳定，脑波采集质量良好，数据质量优于预期。\n受试者目前处于稳定的深度诱导状态，生命体征一切正常。\n\n12日当晚触发了一次保安系统警报，已联系相关人员关闭记录，不会有问题。\n\n根据计划，下一步将继续维持采集，预计完整采集周期约4-6周。\n\n——董新飞`
    },
    {
        from: "董新飞",
        to: "王明德",
        date: "11月20日 23:47",
        subject: "【紧急】出现意外，已控制",
        preview: "王校长，今晚出现了些情况……",
        body: `王校长，\n\n今晚出现了意外情况。有一名高二学生（刘同学，数学竞赛一等奖获得者）今晚强行进入了旧实验楼。\n他显然一直在私下调查林同学的事，图书馆的借阅记录暴露了他的调查方向，但我们没有及时注意到。\n\n已紧急处置，该学生目前已被纳入实验，与林同学一同处于稳定状态。\n今晚警报记录已关闭。图书馆闭馆记录已补录其签出时间戳。\n\n目前仪器正常运转，两人生命体征平稳。档案系统已更新所有参数文档，密码我将另行发送。\n请您放心，此事不会外泄。\n\n——董新飞  23:47`
    },
    {
        from: "王明德",
        to: "董新飞",
        date: "11月20日 23:58",
        subject: "Re: 知道了，处理后事",
        preview: "知道了。档案密码你应该记得……",
        body: `知道了。

档案系统密码你应该还记得，就是当初我们商定的那个。
格致——年份——我们学校的英文名，三段拼在一起就是，不用我说全吧。

请做好一切保密工作，无论如何不能让第三方介入。
如果有学生或家长询问，统一说是回老家了。

那个孩子得了竞赛一等奖……可惜了。校园网的新闻我让人留着，免得有人注意到时间差。

——王明德  23:58`
    },
    {
        from: "董新飞",
        to: "王明德",
        date: "12月15日 22:41",
        subject: "近期实验进展",
        preview: "王校长，两人状态稳定……",
        body: `王校长，\n\n两人状态均稳定，B203设备运转正常，我每晚以「维修」名义登记进出。\n\n刘同学的数学思维数据采集质量远超预期，这是我们一直缺少的维度。\n林同学的数据也基本采集完毕，理论上可以停止，但目前停止意味着……你懂的。\n\n另外，上周有学生在论坛发帖问刘同学的下落，我让教务那边删了。\n他的校园网账号还在显示在线状态——系统bug，暂时没有处理，不知道会不会引起注意。\n\n——董新飞`
    }
];

// ─── 档案内容 ───
const ARCHIVE_PASSWORD = "GZ2023WOLF";
const ARCHIVE_CONTENT = `
<div class="campus-card mb-16">
  <div class="campus-card-header">📋 格致计划 — 实验参数说明文档 v2.3</div>
  <div class="campus-card-body">
    <p style="font-size:12px;color:#6b7f93;margin-bottom:16px">机密文件 | 仅限项目组核心成员查阅 | 最后更新：11月20日 | 实验地点：旧实验楼 B203</p>
    <p style="font-size:11px;color:#888;margin-bottom:16px">本项目承续自1998年中止的「格致原计划」。技术支持方：北境神经工程研究院（顾问：陈昱）。</p>

    <h3 style="color:#1a3a5c;margin-bottom:8px">一、项目简介</h3>
    <p style="line-height:1.9;margin-bottom:16px">
      格致计划（GEZHI PROJECT）是狼堡一中与外部科研机构合作开展的思维数据采集实验。
      实验通过专用神经接口设备，在受试者处于深度诱导状态时，无创采集并记录其思维模式数据，
      目标是建立"最优学习参数模型"。
    </p>

    <h3 style="color:#1a3a5c;margin-bottom:8px">二、实验状态参数说明</h3>
    <p style="font-size:13px;color:#6b7f93;margin-bottom:12px">共三种参数，由校长账号统一管理与执行。以下为技术备忘。</p>
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
    </div>
    <div style="background:#f0fff5;border:1px solid #90d0a0;border-radius:6px;padding:16px;margin-bottom:16px">
      <p style="margin-bottom:8px;font-size:13px;color:#444"><strong>参数三（数据写回）</strong></p>
      <p style="line-height:1.9;font-size:13px;color:#666">
        将已采集的所有数据完整写回受试者大脑——即对采集操作执行完全的<strong style="color:#1e7e4a">逆向</strong>还原。
        写回完成后仪器自动断开，受试者在15-30分钟内自然苏醒，记忆与认知完整无损。
        这是唯一不留后遗症的唤醒方式，参数名称即其操作本质。
      </p>
    </div>
    <div style="background:#fff0f0;border:1px solid #e09090;border-radius:6px;padding:14px">
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
        "陈昱": "陈昱", "chenyu": "陈昱", "cy": "陈昱",
        "张国强": "张国强", "zhangguoqiang": "张国强", "zgq": "张国强"
    };
    const resolved = aliases[q.toLowerCase().replace(/\s/g,"")] || aliases[q] || q;
    const person = PERSONNEL_DB[resolved];
    if (!person) {
        resultEl.innerHTML = '<div class="campus-alert campus-alert-info">未找到人员 "' + q + '" 的档案记录<br><span style="font-size:12px;color:#6b7f93">请确认姓名，或联系教务处获取访问权限</span></div>';
        return;
    }
    const contactsHtml = person.contacts.map(function(c){ return '<li style="margin-bottom:4px">' + c + '</li>'; }).join("");
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
