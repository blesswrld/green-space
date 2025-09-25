import { showToast } from "./toast.js";

const YOUR_ACCESS_KEY = "b1864389-c424-4b51-af94-5843f4ffbfb7";

export function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        // Преобразуем FormData в обычный объект
        const data = Object.fromEntries(formData.entries());

        // Добавляем обязательные поля для Web3Forms
        data.access_key = YOUR_ACCESS_KEY;
        data.subject = "Новое сообщение с сайта Green Space"; // Тема письма
        data.from_name = "Green Space Form"; // Имя отправителя

        submitButton.disabled = true;
        submitButton.textContent = "Отправка...";

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json(); // Получаем ответ от сервера

            if (result.success) {
                showToast("Сообщение успешно отправлено!", "success");
                form.reset();
            } else {
                console.error("Ошибка от Web3Forms:", result.message);
                showToast("Произошла ошибка при отправке", "warning");
            }
        } catch (error) {
            // Если произошла сетевая ошибка
            console.error("Ошибка отправки формы:", error);
            showToast("Не удалось связаться с сервером", "warning");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Отправить сообщение";
        }
    });
}
