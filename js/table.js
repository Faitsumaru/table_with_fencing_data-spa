document.addEventListener('DOMContentLoaded', () => {

    //1---sorting table data
    const table = document.querySelector('.data-table');
    const headers = table.querySelectorAll('th');
    const tbody = table.querySelector('tbody');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-column');
            const order = header.getAttribute('data-order');
            const rows = Array.from(tbody.querySelectorAll('tr'));

            // Determine the sort order (asc or desc)
            const isAsc = order === 'asc';
            const direction = isAsc ? 1 : -1;

            // Sort rows based on the selected column
            rows.sort((a, b) => {
                const aText = a.querySelector(`td:nth-child(${header.cellIndex + 1})`).textContent.trim();
                const bText = b.querySelector(`td:nth-child(${header.cellIndex + 1})`).textContent.trim();

                // Handle numeric and string comparisons
                const aValue = isNaN(aText) ? aText : parseFloat(aText);
                const bValue = isNaN(bText) ? bText : parseFloat(bText);

                return aValue > bValue ? direction : aValue < bValue ? -direction : 0;
            });

            // Append sorted rows back to the table
            rows.forEach(row => tbody.appendChild(row));

            // Toggle sort order for next click
            header.setAttribute('data-order', isAsc ? 'desc' : 'asc');
        });
    });


    //2---save db excel file
    const saveButton = document.querySelector('.btn.save');

    saveButton.addEventListener('click', () => {
        // Найти таблицу
        const table = document.querySelector('.data-table');
        
        if (!table) {
            alert('Таблица не найдена!');
            return;
        }

        // Конвертировать таблицу в SheetJS-совместимый формат
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Данные" });

        // Создать и скачать Excel-файл
        const filename = "таблица_данных.xlsx";
        XLSX.writeFile(workbook, filename);
    });

    //3---load db data
    const statistics = document.getElementById('statistics');

    // Кнопка загрузки данных
    document.getElementById("load-data-btn").addEventListener("click", function () {
        const selectedSemeystvo = document.getElementById("family-select").value;

        // Отправляем запрос на сервер
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "action.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onload = function () {
            if (xhr.status === 200) {
                // Заменяем содержимое таблицы на возвращенный HTML
                document.querySelector(".data-table tbody").innerHTML = xhr.responseText;

                // Показываем статистику, если таблица не пуста
                if (xhr.responseText.trim() !== '<tr><td colspan="10">Нет данных для отображения</td></tr>') {
                    statistics.style.display = 'flex';
                } else {
                    statistics.style.display = 'none';
                }
            } else {
                console.error("Ошибка при загрузке данных:", xhr.status, xhr.statusText);
            }
        };

        // Отправляем выбранное семейство
        xhr.send("semeystvo=" + encodeURIComponent(selectedSemeystvo));
    });

});

