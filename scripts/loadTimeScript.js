(function() {
    let startTime = performance.now(); 
    window.addEventListener('load', function() {
        let endTime = performance.now(); 
        let loadTime = endTime - startTime;

        const loadTimeSpan = document.querySelector('.load-time');
        loadTimeSpan.textContent = `Страница загружена за ${loadTime.toFixed(2)} мс.`;
    });
})();
