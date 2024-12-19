document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formName");
    const tableContainer = document.getElementById("tableContainer");
    const template = document.getElementById("table-row-template");
    const clearButton = createClearButton();

    tableContainer.parentNode.insertBefore(clearButton, tableContainer.nextSibling);

    let tableData = loadFromLocalStorage();

    createTable(tableData);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validateForm(form)) {
            alert("Имя клиента не должно содержать цифр!");
            return;
        }

        const newRow = createRow(form);
        tableData.push(newRow);

        saveToLocalStorage(tableData);
        createTable(tableData);
        form.reset();
    });

    clearButton.addEventListener("click", () => {
        clearTable();
    });




    function createClearButton() {
        const button = document.createElement("button");
        button.textContent = "Очистить таблицу";
        button.classList.add("constructor__clear-button");
        return button;
    }

    function loadFromLocalStorage() {
        const data = localStorage.getItem("flowerTableData");
        return data ? JSON.parse(data) : [];
    }

    function saveToLocalStorage(data) {
        localStorage.setItem("flowerTableData", JSON.stringify(data));
    }

    function createTable(tableData) {
        tableContainer.innerHTML = "";

        if (tableData.length === 0) {
            tableContainer.textContent = "Таблица пуста.";
            clearButton.style.display = "none";
            return;
        }

        clearButton.style.display = "block";

        const table = document.createElement("table");
        table.classList.add("constructor__table");

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Цветов в букете</th>
                    <th>Количество раз в месяц</th>
                    <th>Цена</th>
                </tr>
            </thead>
            <tbody id="table-body"></tbody>
        `;

        const tableBody = table.querySelector("#table-body");

        tableData.forEach((row) => {
            const clone = template.content.cloneNode(true);
            const cells = clone.querySelectorAll(".table__cell");

            cells[0].textContent = row.flowers;
            cells[1].textContent = row.dayOfMonth;
            cells[2].textContent = `${row.price} руб.`;

            tableBody.appendChild(clone);
        });

        tableContainer.appendChild(table);
    }

    function createRow(form) {
        const flowers = parseInt(form.elements["flowers"].value, 10);
        const dayOfMonth = parseInt(form.elements["month"].value, 10);


        const price = flowers * dayOfMonth * 100 + 1000;

        return {
            flowers,
            dayOfMonth,
            price,
        };
    }

    function validateForm(form) {
        const name = form.elements["name"].value;
        const nameRegex = /^[^\d]+$/;
        return nameRegex.test(name);
    }

    function clearTable() {
        localStorage.removeItem("flowerTableData");
        tableData = [];
        createTable(tableData);
    }
});

