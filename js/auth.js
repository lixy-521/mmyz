/**
 * auth.js — 登录验证与状态管理
 * 狼堡一中·学生失踪
 */

const ACCOUNTS = {
    "security_li": { password: "101028", role: "security", name: "李保安", redirect: "security.html" },
    "lib_admin": { password: "guanzhang123", role: "library", name: "刘芳", redirect: "library.html" },
    "dxf_teacher": { password: "Lbyz@dxf2023!", role: "teacher", name: "董新飞", redirect: "teacher.html" },
    "wmd_principal": { password: "Gezhi@2023!", role: "principal", name: "王明德", redirect: "principal.html" }
};

// 密码别名兼容
const PASSWORD_ALIASES = {
    "guanzhang123": ["guanzhang123", "Guanzhang123"],
    "101028": ["101028"],
    "Lbyz@dxf2023!": ["Lbyz@dxf2023!", "lbyz@dxf2023!", "Lbyz@dxf2023"],
    "Gezhi@2023!": ["Gezhi@2023!", "gezhi@2023!", "GEZHI@2023!", "GeZhi@2023!"]
};

function checkPassword(account, inputPwd) {
    const correctPwd = account.password;
    if (correctPwd === inputPwd) return true;
    const aliases = PASSWORD_ALIASES[correctPwd];
    return aliases ? aliases.includes(inputPwd) : false;
}

/**
 * 执行登录
 */
function doLogin(username, password, remember) {
    const account = ACCOUNTS[username.trim()];
    if (account && checkPassword(account, password)) {
        localStorage.setItem("lbyz_role", account.role);
        localStorage.setItem("lbyz_username", username.trim());
        localStorage.setItem("lbyz_name", account.name);
        // 始终将此账号保存到已登录账号列表（用于一键登录）
        _saveAccountToList(username.trim(), account);
        window.location.href = account.redirect;
        return true;
    }
    return false;
}

/**
 * 保存账号到已登录列表（localStorage）
 */
function _saveAccountToList(username, account) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem("lbyz_accounts_list") || "[]"); } catch (e) { }
    // 去重：移除同名旧记录
    list = list.filter(a => a.username !== username);
    // 最新的放最前
    list.unshift({ username, name: account.name, role: account.role, password: account.password });
    // 最多保存4个
    if (list.length > 4) list = list.slice(0, 4);
    localStorage.setItem("lbyz_accounts_list", JSON.stringify(list));
}

/**
 * 一键登录：根据已保存账号直接登录
 */
function quickLogin(username) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem("lbyz_accounts_list") || "[]"); } catch (e) { }
    const saved = list.find(a => a.username === username);
    if (!saved) return;
    doLogin(saved.username, saved.password);
}

/**
 * 从已登录列表中移除某账号
 */
function removeFromAccountList(username, event) {
    if (event) event.stopPropagation();
    let list = [];
    try { list = JSON.parse(localStorage.getItem("lbyz_accounts_list") || "[]"); } catch (e) { }
    list = list.filter(a => a.username !== username);
    localStorage.setItem("lbyz_accounts_list", JSON.stringify(list));
    // 刷新卡片显示
    if (typeof renderSavedAccounts === "function") renderSavedAccounts();
}

/**
 * 执行登出
 */
function doLogout() {
    localStorage.removeItem("lbyz_role");
    localStorage.removeItem("lbyz_username");
    localStorage.removeItem("lbyz_name");
    window.location.href = "login.html";
}

/**
 * 权限检查：若角色不符则跳转登录页
 */
function requireRole(expectedRole) {
    const role = localStorage.getItem("lbyz_role");
    if (role !== expectedRole) {
        window.location.href = "login.html";
    }
}

/**
 * 渲染导航栏用户信息（校园内网各页通用）
 * 需要页面中有 #nav-user-area 元素
 */
function renderNavUser() {
    const area = document.getElementById("nav-user-area");
    if (!area) return;
    const username = localStorage.getItem("lbyz_username");
    const name = localStorage.getItem("lbyz_name");
    const role = localStorage.getItem("lbyz_role");
    if (username && role) {
        const roleRedirect = {
            "security": "security.html",
            "library": "library.html",
            "teacher": "teacher.html",
            "principal": "principal.html"
        };
        const href = roleRedirect[role] || "#";
        area.innerHTML = `
      <div class="campus-nav-user">
        <a href="${href}" class="username" style="color:rgba(255,255,255,0.9);font-size:13px;text-decoration:none;">👤 ${name || username}</a>
        <button class="logout-btn" onclick="doLogout()">退出</button>
      </div>`;
    } else {
        area.innerHTML = `<div class="campus-nav-user">
      <a href="login.html" style="color:rgba(255,255,255,0.75);font-size:13px;">🔐 登录</a>
    </div>`;
    }
}

/**
 * 页面加载时初始化
 */
document.addEventListener("DOMContentLoaded", () => {
    renderNavUser();

    // 登录表单
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (!username || !password) {
                showLoginError("请填写账号和密码");
                return;
            }

            const ok = doLogin(username, password);
            if (!ok) {
                showLoginError("账号或密码错误，请联系教务处");
                document.getElementById("password").value = "";
                document.getElementById("password").focus();
                // 抖动动画
                const box = document.querySelector(".login-box");
                if (box) {
                    box.classList.add("shake-login");
                    setTimeout(() => box.classList.remove("shake-login"), 500);
                }
            }
        });
    }
});

function showLoginError(msg) {
    let err = document.getElementById("login-error");
    if (!err) return;
    err.textContent = msg;
    err.classList.remove("hidden");
}

// 登录框抖动CSS（动态注入）
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shakeLogin {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-10px)}
    40%{transform:translateX(10px)}
    60%{transform:translateX(-6px)}
    80%{transform:translateX(6px)}
  }
  .shake-login { animation: shakeLogin 0.5s ease; }
`;
document.head.appendChild(shakeStyle);
