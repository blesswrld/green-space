const toastContainer = document.getElementById("toast-container");

/**
 * Показывает toast-уведомление.
 * @param {string} message - Сообщение для отображения.
 * @param {string} type - Тип уведомления ('success', 'info', 'warning').
 * @param {number} duration - Время жизни уведомления в миллисекундах.
 */
export function showToast(message, type = "success", duration = 3000) {
    if (!toastContainer) return;

    // Создаем элемент уведомления
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;

    // Можно добавить иконки для наглядности
    const icon = type === "success" ? "✔" : type === "warning" ? "⚠" : "ℹ";

    toast.innerHTML = `
        <span class="toast__icon">${icon}</span>
        <span class="toast__message">${message}</span>
    `;

    // Добавляем уведомление в контейнер
    toastContainer.appendChild(toast);

    // Устанавливаем таймер на удаление
    setTimeout(() => {
        toast.remove();
    }, duration);
}
