export function initMobileNav() {
    const navToggle = document.getElementById("nav-toggle");
    const mainNav = document.getElementById("main-nav");
    const navLinks = mainNav.querySelectorAll(".nav__link");
    const body = document.body;
    let scrollPosition = 0; // Переменная для хранения позиции скролла

    if (!navToggle || !mainNav) return;

    // Функция для открытия меню
    const openMenu = () => {
        // 1. Запоминаем текущую позицию скролла
        scrollPosition = window.pageYOffset;

        // 2. Применяем стили для блокировки
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${scrollPosition}px`;
        body.style.width = "100%";

        // 3. Показываем само меню
        mainNav.classList.add("nav--open");
        navToggle.classList.add("nav-toggle--open");
    };

    // Функция для закрытия меню
    const closeMenu = () => {
        // 1. Убираем стили блокировки
        body.style.removeProperty("overflow");
        body.style.removeProperty("position");
        body.style.removeProperty("top");
        body.style.removeProperty("width");

        // 2. Возвращаем страницу на прежнее место
        window.scrollTo(0, scrollPosition);

        // 3. Прячем меню
        mainNav.classList.remove("nav--open");
        navToggle.classList.remove("nav-toggle--open");
    };

    // Открытие/закрытие по клику на бургер
    navToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.contains("nav--open");
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Закрытие меню по клику на ссылку
    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}
