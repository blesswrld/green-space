export function initCustomSelect(selector) {
    const selectElement = document.querySelector(selector);
    if (!selectElement) return;

    // 1. Создаем кастомную структуру
    const customSelect = document.createElement("div");
    customSelect.classList.add("custom-select");

    const trigger = document.createElement("div");
    trigger.classList.add("custom-select__trigger");

    // --- Создаем SPAN для текста ---
    const triggerText = document.createElement("span");
    triggerText.classList.add("custom-select__text");
    triggerText.textContent =
        selectElement.options[selectElement.selectedIndex].text;
    trigger.appendChild(triggerText);

    const options = document.createElement("div");
    options.classList.add("custom-select__options");

    // 2. Копируем опции из оригинального select
    for (const option of selectElement.options) {
        const customOption = document.createElement("div");
        customOption.classList.add("custom-select__option");
        customOption.textContent = option.text;
        customOption.dataset.value = option.value;
        if (option.selected) {
            customOption.classList.add("is-selected");
        }
        options.appendChild(customOption);
    }

    customSelect.appendChild(trigger);
    customSelect.appendChild(options);

    // 3. Вставляем кастомный select и скрываем оригинальный
    selectElement.parentNode.insertBefore(customSelect, selectElement);
    selectElement.style.display = "none";

    // 4. Добавляем логику
    trigger.addEventListener("click", () => {
        customSelect.classList.toggle("is-open");
    });

    options.addEventListener("click", (e) => {
        if (e.target.classList.contains("custom-select__option")) {
            const selectedValue = e.target.dataset.value;
            const selectedText = e.target.textContent;

            // --- Обновляем текст внутри SPAN ---
            trigger.querySelector(".custom-select__text").textContent =
                selectedText;

            // Обновляем оригинальный select и вызываем событие change
            selectElement.value = selectedValue;
            selectElement.dispatchEvent(new Event("change"));

            // Обновляем классы is-selected
            options
                .querySelector(".is-selected")
                ?.classList.remove("is-selected");
            e.target.classList.add("is-selected");

            customSelect.classList.remove("is-open");
        }
    });

    // Закрываем по клику вне селектора
    document.addEventListener("click", (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove("is-open");
        }
    });
}
