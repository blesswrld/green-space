// Два события, которые будут "путешествовать" по документу
const mobileNavOpened = new CustomEvent("mobileNavOpened");
const cartOpened = new CustomEvent("cartOpened");

// Функция, которая слушает событие "открылась корзина" и закрывает меню
export function listenForCartOpening(closeMobileNav) {
    document.addEventListener("cartOpened", () => {
        closeMobileNav();
    });
}

// Функция, которая слушает событие "открылось меню" и закрывает корзину
export function listenForNavOpening(closeCart) {
    document.addEventListener("mobileNavOpened", () => {
        closeCart();
    });
}

// Функции, которые "выстреливают" событиями
export function dispatchMobileNavOpened() {
    document.dispatchEvent(mobileNavOpened);
}

export function dispatchCartOpened() {
    document.dispatchEvent(cartOpened);
}
