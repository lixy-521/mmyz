/**
 * 文件名称：js/nav.js
 * 功能描述：通用导航栏交互脚本 - 处理移动端汉堡菜单的展开与折叠
 * 适用页面：全站包含 .campus-nav-links 的页面
 * 维护部门：狼堡一中信息中心
 * 最后更新：2026-03-19
 */
document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('nav-hamburger');
    var links = document.querySelector('.campus-nav-links');
    if (btn && links) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            btn.classList.toggle('open');
            links.classList.toggle('open');
        });
        document.addEventListener('click', function () {
            btn.classList.remove('open');
            links.classList.remove('open');
        });
        links.addEventListener('click', function () {
            btn.classList.remove('open');
            links.classList.remove('open');
        });
    }

    // 所有指向首页的链接自动跳过入场动画
    document.querySelectorAll('a[href$="index.html"]').forEach(function (a) {
        a.addEventListener('click', function () {
            sessionStorage.setItem('lbyz_intro_seen', '1');
        });
    });
});
