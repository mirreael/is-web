document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formName");
    const tableContainer = document.getElementById("tableContainer");
    const template = document.getElementById("table-row-template");
    const clearButton = document.createElement("button"); // Создаём кнопку очистки
    const TABLE_STORAGE_KEY = "flowerTableData"; // Ключ для localStorage

    // Настройка кнопки очистки
    clearButton.textContent = "Очистить таблицу";
    clearButton.classList.add("constructor__clear-button");
    tableContainer.parentNode.insertBefore(clearButton, tableContainer.nextSibling);

    // Функция для сохранения данных в localStorage
    const saveToLocalStorage = (data) => {
        localStorage.setItem(TABLE_STORAGE_KEY, JSON.stringify(data));
    };

    // Функция для получения данных из localStorage
    const loadFromLocalStorage = () => {
        const data = localStorage.getItem(TABLE_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    };

    // Функция для отрисовки таблицы
    const renderTable = (tableData) => {
        tableContainer.innerHTML = ""; // Очищаем контейнер перед отрисовкой

        if (tableData.length === 0) {
            tableContainer.textContent = "Таблица пуста."; // Показать сообщение, если нет данных
            return;
        }

        // Создаём таблицу
        const table = document.createElement("table");
        table.classList.add("constructor__table");

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Цветов в букете</th>
                    <th>День доставки</th>
                    <th>Цена</th>
                </tr>
            </thead>
            <tbody id="table-body"></tbody>
        `;

        const tableBody = table.querySelector("#table-body");

        // Добавляем строки в таблицу
        tableData.forEach((row) => {
            const clone = template.content.cloneNode(true);
            const cells = clone.querySelectorAll(".table__cell");

            cells[0].textContent = row.flowers;
            cells[1].textContent = row.day;
            cells[2].textContent = `${row.price} руб.`;

            tableBody.appendChild(clone);
        });

        // Добавляем таблицу в контейнер
        tableContainer.appendChild(table);
    };

    // Загружаем и отображаем таблицу при загрузке страницы
    let tableData = loadFromLocalStorage();
    renderTable(tableData);

    // Обработка отправки формы
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Получаем данные из формы
        const flowers = parseInt(form.elements["flowers"].value, 10);
        const day = `День ${tableData.length + 1}`; // Устанавливаем день доставки на основе количества записей
        const price = flowers * 100; // Рассчитываем цену

        // Создаём объект для новой строки таблицы
        const newRow = {
            flowers,
            day,
            price,
        };

        // Добавляем новую запись в массив данных
        tableData.push(newRow);

        // Сохраняем в localStorage
        saveToLocalStorage(tableData);

        // Отрисовываем таблицу с обновлёнными данными
        renderTable(tableData);

        // Очищаем форму после отправки
        form.reset();
    });

    // Обработка кнопки "Очистить таблицу"
    clearButton.addEventListener("click", () => {
        localStorage.removeItem(TABLE_STORAGE_KEY); // Удаляем данные из localStorage
        tableData = []; // Очищаем массив данных
        renderTable(tableData); // Перерисовываем пустую таблицу
    });
});
