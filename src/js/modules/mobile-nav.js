import { dispatchMobileNavOpened } from "./overlay-manager.js";

export function initMobileNav() {
    const navToggle = document.getElementById("nav-toggle");
    const mainNav = document.getElementById("main-nav");
    const navLinks = mainNav.querySelectorAll(".nav__link");
    let scrollPosition = 0; // Переменная для хранения позиции скролла

    if (!navToggle || !mainNav) return;

    const isOpen = () => mainNav.classList.contains("nav--open");

    // --- Логика блокировки и разблокировки скролла ---
    const lockScroll = () => {
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;
        // 1. Запоминаем текущую позицию скролла
        scrollPosition = window.pageYOffset;
        // 2. Применяем стили для блокировки
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = "100%";
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
    };

    const unlockScroll = () => {
        // 1. Убираем стили блокировки
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("position");
        document.body.style.removeProperty("top");
        document.body.style.removeProperty("width");
        document.body.style.removeProperty("padding-right");
        // 2. Возвращаем страницу на прежнее место
        window.scrollTo(0, scrollPosition);
    };

    // Функция для закрытия меню
    const closeMenu = () => {
        if (!isOpen()) return;
        // 3. Прячем меню
        mainNav.classList.remove("nav--open");
        navToggle.classList.remove("nav-toggle--open");
        unlockScroll();
    };

    // Функция для открытия меню
    const openMenu = () => {
        if (isOpen()) return;
        lockScroll();
        // 3. Показываем само меню
        mainNav.classList.add("nav--open");
        navToggle.classList.add("nav-toggle--open");
        dispatchMobileNavOpened();
    };

    // Открытие/закрытие по клику на бургер
    navToggle.addEventListener("click", () => {
        isOpen() ? closeMenu() : openMenu();
    });

    // Закрытие меню по клику на ссылку
    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Закрытие по клику на "пустое" пространство (вне меню)
    document.addEventListener("click", (e) => {
        if (isOpen()) {
            const isClickInsideNav = mainNav.contains(e.target);
            const isClickOnToggle = navToggle.contains(e.target);

            if (!isClickInsideNav && !isClickOnToggle) {
                closeMenu();
            }
        }
    });

    return closeMenu;
}
