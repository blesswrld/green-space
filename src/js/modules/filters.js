export function filterProducts(products, filters) {
    let filteredProducts = [...products];

    // 1. Поиск по названию
    if (filters.searchQuery) {
        filteredProducts = filteredProducts.filter((p) =>
            p.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
        );
    }

    // 2. Фильтр по типу
    if (filters.type !== "all") {
        filteredProducts = filteredProducts.filter(
            (p) => p.type === filters.type
        );
    }

    // 3. Фильтр по освещению
    if (filters.light.length > 0) {
        filteredProducts = filteredProducts.filter((p) =>
            filters.light.some((lightValue) => p.light.includes(lightValue))
        );
    }

    // 4. Фильтр "Безопасно для животных"
    if (filters.petFriendly) {
        filteredProducts = filteredProducts.filter(
            (p) => p.petFriendly === true
        );
    }

    // 5. Фильтр по цене
    filteredProducts = filteredProducts.filter(
        (p) => p.price <= filters.maxPrice
    );

    return filteredProducts;
}
