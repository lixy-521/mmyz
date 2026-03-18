/**
 * nav.js — 汉堡菜单通用初始化
 * 所有含导航栏的页面只需引入此文件，无需在页面内重复写汉堡菜单逻辑。
 */
document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('nav-hamburger');
    var links = document.querySelector('.campus-nav-links');
    if (!btn || !links) return;
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
});
