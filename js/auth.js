/**
 * 文件名称：js/auth.js
 * 功能描述：身份验证与会话管理核心逻辑 - 包含 SHA-256 哈希验证、登录/登出处理及权限校验
 * 主要功能：
 *   - SHA-256 密码哈希比对 (ACCOUNTS)
 *   - 登录态管理 (localStorage: lbyz_role, lbyz_username)
 *   - 导航栏用户信息动态渲染 (renderNavUser)
 * 维护部门：狼堡一中教务处 / 信息中心
 * 最后更新：2026-03-19
 */

// SHA-256(密码) 哈希表，键为用户名
// 计算方式：SHA-256("原始密码") -> 十六进制字符串
const ACCOUNTS = {
    "security_li":  { hash: "e2f26fd5170fb688d7fad68b8d15c33358db5c3227dd1e6077fcfbccb679f3f2", role: "security",  name: "李保安", redirect: "security.html" },
    "lib_admin":    { hash: "2c1f41f23fc886a8a9f94808f14fd4c6c1d3561cf9494751d3675b3a1eb9a09d", role: "library",   name: "刘芳",   redirect: "library.html" },
    "dxf_teacher":  { hash: "280776d53353f902400e0da726d56c0d79b0445a88cafced77eaa173fea02ec9", role: "teacher",   name: "董新飞", redirect: "teacher.html" },
    "wmd_principal":{ hash: "2565daec6b7a860634f16f6d37b9c67c378a93ba1f9545cd0dfa432a495cf6a1", role: "principal", name: "王明德", redirect: "principal.html" }
};

/**
 * 计算字符串的 SHA-256 哈希（十六进制）
 */
async function sha256(str) {
    const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(str)
    );
    return Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

/**
 * 执行登录（异步，密码哈希后比对，支持忽略大小写及中英文符号差异）
 */
async function doLogin(username, password) {
    const account = ACCOUNTS[username.trim()];
    if (!account) return false;
    
    // 符号全角转半角
    const map = {'！':'!','＠':'@','＃':'#','＄':'$','％':'%','＾':'^','＆':'&','＊':'*','（':'(','）':')','－':'-','＿':'_','＋':'+','＝':'=','｛':'{','｝':'}','［':'[','］':']','｜':'|','＼':'\\','：':':','；':';','＂':'"','＇':"'",'＜':'<','＞':'>','，':',','．':'.','？':'?','／':'/'};
    const norm = password.split('').map(c => map[c] || c).join('');
    
    // 收集所有区分大小写的字母
    let letters = [];
    for (let i = 0; i < norm.length; i++) {
        if (norm[i].toLowerCase() !== norm[i].toUpperCase()) {
            letters.push({ i, lower: norm[i].toLowerCase(), upper: norm[i].toUpperCase() });
        }
    }
    
    // 限制最大枚举位数（防止超长输入卡死浏览器）
    if (letters.length > 15) letters = letters.slice(0, 15);
    
    let matched = false;
    const max = 1 << letters.length;
    const baseChars = norm.toLowerCase().split('');
    
    // 枚举所有大小写组合进行哈希比对
    for (let i = 0; i < max; i++) {
        const chars = [...baseChars];
        for (let j = 0; j < letters.length; j++) {
            if (i & (1 << j)) chars[letters[j].i] = letters[j].upper;
        }
        const candidateHash = await sha256(chars.join(''));
        if (candidateHash === account.hash) {
            matched = true;
            break;
        }
    }
    
    if (!matched) return false;

    localStorage.setItem("lbyz_role", account.role);
    localStorage.setItem("lbyz_username", username.trim());
    localStorage.setItem("lbyz_name", account.name);
    _saveAccountToList(username.trim(), account);
    window.location.href = account.redirect;
    return true;
}

/**
 * 保存账号到已登录列表（localStorage）
 * 注意：只保存无敏感信息的字段（用户名、姓名、角色、跳转链接）
 */
function _saveAccountToList(username, account) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem("lbyz_accounts_list") || "[]"); } catch (e) { }
    list = list.filter(a => a.username !== username);
    list.unshift({ username, name: account.name, role: account.role, redirect: account.redirect });
    if (list.length > 4) list = list.slice(0, 4);
    localStorage.setItem("lbyz_accounts_list", JSON.stringify(list));
}

/**
 * 一键登录：已保存账号直接按角色跳转（无需重新验证密码）
 */
function quickLogin(username) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem("lbyz_accounts_list") || "[]"); } catch (e) { }
    const saved = list.find(a => a.username === username);
    if (!saved || !saved.redirect) return;
    // 刷新登录态供页面使用
    localStorage.setItem("lbyz_role", saved.role);
    localStorage.setItem("lbyz_username", saved.username);
    localStorage.setItem("lbyz_name", saved.name);
    window.location.href = saved.redirect;
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
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (!username || !password) {
                showLoginError("请填写账号和密码");
                return;
            }

            // 显示 loading 状态，防止手机端计算哈希时界面假死
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const origText = submitBtn ? submitBtn.textContent : "";
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "验证中…";
            }

            const ok = await doLogin(username, password);

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = origText;
            }

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
