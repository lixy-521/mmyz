/**
 * vault.js — 树洞加密资料库密码验证
 */

const VALID_PASSWORDS = ["niXiang", "逆向", "nixiang", "NiXiang", "NIXIANG", "Nixiang", "逆向参数"];

document.addEventListener("DOMContentLoaded", () => {
    generateParticles();

    const unlockBtn = document.getElementById("vault-unlock-btn");
    const vaultInput = document.getElementById("vault-input");

    if (unlockBtn) {
        unlockBtn.addEventListener("click", tryUnlock);
    }

    if (vaultInput) {
        vaultInput.addEventListener("keydown", e => {
            if (e.key === "Enter") tryUnlock();
        });
        // 清除错误样式
        vaultInput.addEventListener("input", () => {
            vaultInput.classList.remove("shake");
        });
    }
});

function tryUnlock() {
    const input = document.getElementById("vault-input");
    if (!input) return;

    const val = input.value.trim();

    if (VALID_PASSWORDS.includes(val)) {
        // 解锁成功
        document.getElementById("vault-lock-area").classList.add("hidden");
        document.getElementById("vault-content-area").classList.remove("hidden");
        document.getElementById("vault-content-area").classList.add("open");

        // 成功提示
        document.getElementById("vault-success-bar")?.classList.remove("hidden");
    } else {
        // 错误：抖动动画
        input.classList.remove("shake");
        void input.offsetWidth; // 强制重排触发动画
        input.classList.add("shake");
        input.value = "";
        input.placeholder = "密码不对，再想想。";
        setTimeout(() => {
            input.placeholder = "在此输入密码…";
        }, 2000);
    }
}

function generateParticles() {
    const container = document.getElementById("vault-particles");
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement("div");
        p.className = "vault-particle";
        p.style.left = Math.random() * 100 + "%";
        p.style.animationDuration = (6 + Math.random() * 10) + "s";
        p.style.animationDelay = (Math.random() * 8) + "s";
        p.style.width = p.style.height = (1 + Math.random() * 3) + "px";
        container.appendChild(p);
    }
}
