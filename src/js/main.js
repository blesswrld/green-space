import { products } from "./data/products.js";
import { renderProducts } from "./modules/render.js";
import { initMobileNav } from "./modules/mobile-nav.js";

// Состояние фильтров
let currentFilters = {
    searchQuery: "",
    type: "all",
    light: [],
    petFriendly: false,
    maxPrice: 5000,
};

// Получаем элементы DOM
const searchInput = document.getElementById("search");
const typeFilter = document.getElementById("type-filter");
const lightCheckboxes = document.querySelectorAll('input[name="light"]');
const petFriendlyCheckbox = document.getElementById("pet-friendly");
const priceRange = document.getElementById("price-range");
const priceValue = document.getElementById("price-value");
const resetFiltersBtn = document.getElementById("reset-filters");

function applyFilters() {
    let filteredProducts = [...products];

    // 1. Поиск
    if (currentFilters.searchQuery) {
        filteredProducts = filteredProducts.filter((p) =>
            p.name
                .toLowerCase()
                .includes(currentFilters.searchQuery.toLowerCase())
        );
    }

    // 2. Тип
    if (currentFilters.type !== "all") {
        filteredProducts = filteredProducts.filter(
            (p) => p.type === currentFilters.type
        );
    }

    // 3. Освещение
    if (currentFilters.light.length > 0) {
        filteredProducts = filteredProducts.filter((p) =>
            currentFilters.light.some((lightValue) =>
                p.light.includes(lightValue)
            )
        );
    }

    // 4. Безопасность для животных
    if (currentFilters.petFriendly) {
        filteredProducts = filteredProducts.filter(
            (p) => p.petFriendly === true
        );
    }

    // 5. Цена
    filteredProducts = filteredProducts.filter(
        (p) => p.price <= currentFilters.maxPrice
    );

    renderProducts(filteredProducts);
}

// Обработчики событий
searchInput.addEventListener("input", (e) => {
    currentFilters.searchQuery = e.target.value;
    applyFilters();
});

typeFilter.addEventListener("change", (e) => {
    currentFilters.type = e.target.value;
    applyFilters();
});

lightCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
            currentFilters.light.push(e.target.value);
        } else {
            currentFilters.light = currentFilters.light.filter(
                (item) => item !== e.target.value
            );
        }
        applyFilters();
    });
});

petFriendlyCheckbox.addEventListener("change", (e) => {
    currentFilters.petFriendly = e.target.checked;
    applyFilters();
});

priceRange.addEventListener("input", (e) => {
    currentFilters.maxPrice = parseInt(e.target.value, 10);
    priceValue.textContent = `до ${currentFilters.maxPrice} ₽`;
    applyFilters();
});

resetFiltersBtn.addEventListener("click", () => {
    // Сброс состояния
    currentFilters = {
        searchQuery: "",
        type: "all",
        light: [],
        petFriendly: false,
        maxPrice: 5000,
    };
    // Сброс UI
    searchInput.value = "";
    typeFilter.value = "all";
    lightCheckboxes.forEach((cb) => (cb.checked = false));
    petFriendlyCheckbox.checked = false;
    priceRange.value = 5000;
    priceValue.textContent = "до 5000 ₽";
    // Применение
    applyFilters();
});

// Инициализация - первая отрисовка всех товаров
document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    renderProducts(products);
});
