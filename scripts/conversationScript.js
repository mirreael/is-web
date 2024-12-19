document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messagesContainer');
    const preloader = document.getElementById('preloader');
    const messageTemplate = document.getElementById('messageTemplate').content;
    let messages = [];
    let currentIndex = 0;

    async function loadMessages() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) throw new Error('Ошибка загрузки данных');

            messages = await response.json();
            preloader.style.display = 'none';
            messagesContainer.innerHTML = '';

            loadNextBatch();
        } catch (error) {
            preloader.style.display = 'none';
            messagesContainer.innerHTML = '<div class="error">Что-то пошло не так</div>';
        }
    }

    function loadNextBatch() {
        const nextBatch = messages.slice(currentIndex, currentIndex + 10);
        nextBatch.forEach((message) => {
            const messageуElement = document.importNode(messageTemplate, true);
            messageElement.querySelector('.conversation__message-title').textContent = message.title;
            messageElement.querySelector('.conversation__message-body').textContent = message.body;
            messagesContainer.appendChild(messageElement);
        });
        currentIndex += 10;
    }

    function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 && currentIndex < messages.length) {
            loadNextBatch();
        }
    }


    window.addEventListener('scroll', handleScroll);

    //TO-DO: improve exception
    loadMessages()
});
