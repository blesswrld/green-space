import { showToast } from "./toast.js";

export function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // 1. Предотвращаем перезагрузку страницы

        const submitButton = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        // Преобразуем FormData в обычный объект
        const data = Object.fromEntries(formData.entries());

        // Блокируем кнопку на время отправки
        submitButton.disabled = true;
        submitButton.textContent = "Отправка...";

        try {
            // 2. Отправляем данные на наш json-server
            const response = await fetch("http://localhost:3001/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // 3. Если все хорошо - показываем уведомление и очищаем форму
                showToast("Сообщение успешно отправлено!", "success");
                form.reset();
            } else {
                // Если сервер вернул ошибку
                showToast("Произошла ошибка при отправке", "warning");
            }
        } catch (error) {
            // Если произошла сетевая ошибка (сервер не запущен и т.д.)
            console.error("Ошибка отправки формы:", error);
            showToast("Не удалось связаться с сервером", "warning");
        } finally {
            // 4. В любом случае возвращаем кнопку в исходное состояние
            submitButton.disabled = false;
            submitButton.textContent = "Отправить сообщение";
        }
    });
}
