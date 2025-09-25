import { products } from "./data/products.js";
import { renderProducts } from "./modules/render.js";
import { initMobileNav } from "./modules/mobile-nav.js";
import { initCustomSelect } from "./modules/custom-select.js";
import { filterProducts } from "./modules/filters.js";

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

// Функция-оркестратор: применяет фильтры и вызывает отрисовку
function applyAndRender() {
    const filtered = filterProducts(products, currentFilters);
    renderProducts(filtered);
}

// Обновление ползунка цены
const updatePriceSlider = (element) => {
    currentFilters.maxPrice = parseInt(element.value, 10);
    priceValue.textContent = `до ${currentFilters.maxPrice} ₽`;
    applyAndRender();
};

// --- ОБРАБОТЧИКИ СОБЫТИЙ ---
searchInput.addEventListener("input", (e) => {
    currentFilters.searchQuery = e.target.value;
    applyAndRender();
});

typeFilter.addEventListener("change", (e) => {
    currentFilters.type = e.target.value;
    applyAndRender();
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
        applyAndRender();
    });
});

petFriendlyCheckbox.addEventListener("change", (e) => {
    currentFilters.petFriendly = e.target.checked;
    applyAndRender();
});

priceRange.addEventListener("input", (e) => {
    updatePriceSlider(e.target);
});

resetFiltersBtn.addEventListener("click", () => {
    // Сброс состояния
    currentFilters = {
        searchQuery: "",
        type: "all",
        light: [],
        petFriendly: false,
        maxPrice: 3000,
    };
    // Сброс UI
    searchInput.value = "";
    typeFilter.value = "all";
    // Обновляем кастомный селект при сбросе
    const customSelectTrigger = document.querySelector(
        ".custom-select__trigger"
    );
    if (customSelectTrigger) {
        customSelectTrigger.querySelector(".custom-select__text").textContent =
            typeFilter.options[0].text;
        document
            .querySelector(".custom-select__option.is-selected")
            ?.classList.remove("is-selected");
        document
            .querySelector(".custom-select__option")
            ?.classList.add("is-selected");
    }
    lightCheckboxes.forEach((cb) => (cb.checked = false));
    petFriendlyCheckbox.checked = false;
    priceRange.value = 5000;

    // Применение и обновление текста ползунка
    updatePriceSlider(priceRange);
});

// --- ИНИЦИАЛИЗАЦИЯ ---
document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initCustomSelect("#type-filter");
    updatePriceSlider(priceRange); // Эта функция вызовет и первую отрисовку
});
