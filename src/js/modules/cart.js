import { products } from "../data/products.js";
import { dispatchCartOpened } from "./overlay-manager.js";

let scrollPosition = 0;

// Логика скролла
const lockScroll = () => {
    const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
    scrollPosition = window.pageYOffset;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
    if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
};

const unlockScroll = () => {
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("position");
    document.body.style.removeProperty("top");
    document.body.style.removeProperty("width");
    document.body.style.removeProperty("padding-right");
    window.scrollTo(0, scrollPosition);
};

// DOM-элементы
const cartButton = document.getElementById("cart-button");
const cartModalOverlay = document.getElementById("cart-modal-overlay");
const cartModalClose = document.getElementById("cart-modal-close");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartCount = document.getElementById("cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Функции корзины
const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));

const renderCartItems = () => {
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
        cartItemsContainer.innerHTML =
            '<p class="cart-modal__empty">Ваша корзина пуста.</p>';
        return;
    }
    cart.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) return;
        const cartItemHTML = `<div class="cart-item" data-id="${product.id}"><img src="${product.image}" alt="${product.name}" class="cart-item__image"><div class="cart-item__info"><h4 class="cart-item__name">${product.name}</h4><span class="cart-item__price">${product.price} ₽</span></div><div class="cart-item__controls"><button class="cart-item__btn cart-item__btn--decrease">-</button><span class="cart-item__quantity">${item.quantity}</span><button class="cart-item__btn cart-item__btn--increase">+</button></div><button class="cart-item__remove">&times;</button></div>`;
        cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);
    });
};

const updateCartDisplay = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    cartCount.textContent = totalItems;
    cartTotalPrice.textContent = `${totalPrice} ₽`;
    renderCartItems();
};

export const addToCart = (productId) => {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    saveCart();
    updateCartDisplay();
};

// --- Единственная функция инициализации ---
export function initCart() {
    const isOpen = () => cartModalOverlay.classList.contains("is-visible");

    const closeCart = () => {
        if (!isOpen()) return;
        cartModalOverlay.classList.remove("is-visible");
        unlockScroll();
    };

    const openCart = () => {
        if (isOpen()) return;
        lockScroll();
        cartModalOverlay.classList.add("is-visible");
        dispatchCartOpened();
    };

    cartButton.addEventListener("click", openCart);
    cartModalClose.addEventListener("click", closeCart);
    cartModalOverlay.addEventListener("click", (e) => {
        if (e.target === cartModalOverlay) closeCart();
    });

    cartItemsContainer.addEventListener("click", (e) => {
        const target = e.target;
        const parentItem = target.closest(".cart-item");
        if (!parentItem) return;
        const productId = parseInt(parentItem.dataset.id, 10);
        const item = cart.find((item) => item.id === productId);

        if (target.matches(".cart-item__btn--increase")) {
            if (item) item.quantity++;
        } else if (target.matches(".cart-item__btn--decrease")) {
            if (item && item.quantity > 1) item.quantity--;
            else cart = cart.filter((cartItem) => cartItem.id !== productId);
        } else if (target.matches(".cart-item__remove")) {
            cart = cart.filter((cartItem) => cartItem.id !== productId);
        }
        saveCart();
        updateCartDisplay();
    });

    updateCartDisplay();
    return closeCart;
}
