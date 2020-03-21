function formSend(forms, inputs) {
  let message = { // Обькт для вывода после отправки запроса.
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся.",
    failure: "Что-то пошло не так..."
  };

  let form = document.querySelector(forms), // Получаем форму .
    input = document.getElementsByTagName(inputs), // Получаем колекцию инпутов.
    statusMessage = document.createElement("div"); // Новый див кладем в переменную.

  statusMessage.classList.add("status"); // Новому диву добавляем класс status.

  form.addEventListener("submit", function(event) { // Функция для отправки POST запрос на сервер, после submit формы.
    event.preventDefault(); // Отменяем стандартное поведение браузера.
    form.appendChild(statusMessage); // Добавляем форме последним элементов statusMessage - новый див.

    let request = new XMLHttpRequest(); // Кладем XMLHttpRequest() в переменную request.
    request.open("POST", "server.php"); // 1 - Указываем тип запроса, 2 - указываем куда отправляем запрос.
    // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); обычный формат
    request.setRequestHeader( // Указываем тип запроса.
      "Content-type", "application/json; charset=utf-8" // JSON формат
    ); 

    let formData = new FormData(form); // Получаем все что ответил пользователь в нашей форме.

    let obj = {}; // создаем новый обьект.
    formData.forEach(function(value, key) { // Записываем данные из formData по тиму ключ - значение в обьект obj.
      obj[key] = value;
    });

    let json = JSON.stringify(obj); // Перекидываем в переменную json преобрзованные данные через метод JSON.stringify из obj.

    request.send(json); // Отправляем на сервер переменную json.

    request.addEventListener("readystatechange", function() {
      if (request.readyState < 4) { // 4 это загрузка прошла успешно, если меньше 4 - значит еще загружается.
        statusMessage.innerHTML = message.loading; // Помещаем в созданую переменную элемент обьекта message.loading.
      } else if (request.readyState === 4 && request.status == 200) { // 4 - загрузилось, а request.status = 200 означает все ОК.
        statusMessage.innerHTML = message.success; // Помещаем в созданую переменную элемент обьекта message.success.
      } else {
        statusMessage.innerHTML = message.failure; // Помещаем в созданую переменную элемент обьекта message.failure.
      }
    });

    for (i = 0; i < input.length; i++) { // Цикл для всех наших инпутов.
      input[i].value = ""; // Обновляем наш инпут
    }
  });
}

formSend(".main-form", "input"); // Передаем аргументы функции.
formSend(".contact-send", "input"); // Передаем аргументы функции.