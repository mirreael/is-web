document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("deliveryForm");
    const tableContainer = document.getElementById("tableContainer");

    // Обработчик отправки формы
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Сбор данных из формы
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const flowers = document.getElementById("flowers").value;
        const days = document.getElementById("days").value;

        // Генерация таблицы
        generateTable(name, address, flowers, days);

        // Сохранение данных в LocalStorage
        const formData = { name, address, flowers, days };
        localStorage.setItem("deliveryFormData", JSON.stringify(formData));
    });

    // Функция генерации таблицы
    function generateTable(name, address, flowers, days) {
        // Очищаем контейнер
        tableContainer.innerHTML = "";

        // Создаем таблицу
        const table = document.createElement("table");
        table.className = "table";

        // Создаем заголовок таблицы
        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>День</th>
                <th>Имя клиента</th>
                <th>Адрес доставки</th>
                <th>Количество букетов</th>
            </tr>
        `;
        table.appendChild(thead);

        // Создаем тело таблицы
        const tbody = document.createElement("tbody");
        for (let i = 1; i <= days; i++) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>День ${i}</td>
                <td>${name}</td>
                <td>${address}</td>
                <td>${flowers}</td>
            `;
            tbody.appendChild(row);
        }
        table.appendChild(tbody);

        // Добавляем таблицу в контейнер
        tableContainer.appendChild(table);
    }

    // Загрузка данных из LocalStorage
    const savedData = localStorage.getItem("deliveryFormData");
    if (savedData) {
        const { name, address, flowers, days } = JSON.parse(savedData);
        generateTable(name, address, flowers, days);
    }
});
