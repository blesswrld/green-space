export function initMobileNav() {
    const navToggle = document.getElementById("nav-toggle");
    const mainNav = document.getElementById("main-nav");
    const navLinks = mainNav.querySelectorAll(".nav__link");

    if (!navToggle || !mainNav) return;

    // Функция для закрытия меню
    const closeMenu = () => {
        mainNav.classList.remove("nav--open");
        navToggle.classList.remove("nav-toggle--open");
        // Скролл для обоих элементов
        document.documentElement.style.overflow = ""; // Для <html>
        document.body.style.overflow = ""; // Для <body>
    };

    // Открытие/закрытие по клику на бургер
    navToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.contains("nav--open");
        if (isOpen) {
            closeMenu();
        } else {
            mainNav.classList.add("nav--open");
            navToggle.classList.add("nav-toggle--open");
            // Убираем скролл страницы для обоих элементов
            document.documentElement.style.overflow = "hidden"; // Для <html>
            document.body.style.overflow = "hidden"; // Для <body>
        }
    });

    // Закрытие меню по клику на ссылку
    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}
