const productGrid = document.getElementById("product-grid");

export function renderProducts(products) {
    // Очищаем сетку перед отрисовкой новых товаров
    productGrid.innerHTML = "";

    if (products.length === 0) {
        productGrid.innerHTML =
            '<p class="catalog__no-results">Товары не найдены.</p>';
        return;
    }

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.dataset.id = product.id;
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-card__image">
            <h3 class="product-card__name">${product.name}</h3>
            <p class="product-card__type">${product.type}</p>
            <div class="product-card__footer">
                <span class="product-card__price">${product.price} ₽</span>
                <button class="product-card__btn">В корзину</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}
