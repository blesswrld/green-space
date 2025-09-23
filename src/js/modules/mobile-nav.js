export function initMobileNav() {
    const navToggle = document.getElementById("nav-toggle");
    const mainNav = document.getElementById("main-nav");
    const navLinks = mainNav.querySelectorAll(".nav__link");

    if (!navToggle || !mainNav) return;

    // Функция для закрытия меню
    const closeMenu = () => {
        mainNav.classList.remove("nav--open");
        navToggle.classList.remove("nav-toggle--open");
        // Убираем класс с body
        document.body.classList.remove("body--nav-open");
    };

    // Открытие/закрытие по клику на бургер
    navToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.contains("nav--open");
        if (isOpen) {
            closeMenu();
        } else {
            mainNav.classList.add("nav--open");
            navToggle.classList.add("nav-toggle--open");
            // Добавляем класс к body
            document.body.classList.add("body--nav-open");
        }
    });

    // Закрытие меню по клику на ссылку
    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}
