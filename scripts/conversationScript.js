document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messagesContainer');
    const preloader = document.getElementById('preloader');
    const messageTemplate = document.getElementById('messageTemplate').content;
    const URI = 'https://jsonplaceholder.typicode.com/posts';

    let messages = [];


    async function loadMessages() {
        try {
            const response = await fetchData(URI);
            messages = await response.json();
            preloader.style.display = 'none';
            messagesContainer.innerHTML = '';

            messages.forEach(createMessage);
        } catch (error) {
            handleError(error);
        }
    }

    async function fetchData(URI) {
        const response = await fetch(URI);
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }
        return response;
    }


    function createMessage(message) {
        const messageElement = document.importNode(messageTemplate, true);
        messageElement.querySelector('.conversation__message-title').textContent = message.title;
        messageElement.querySelector('.conversation__message-body').textContent = message.body;
        messagesContainer.appendChild(messageElement);
    }


    function handleError(error) {
        preloader.style.display = 'none';
        messagesContainer.innerHTML =
            '<div class="error">Что-то пошло не так</div>';
        alert(error.message);
    }

    loadMessages();
});
