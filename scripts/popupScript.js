const showPopup = () => {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';  
  popup.style.top = '20px';        
  popup.style.right = '20px';     
  popup.style.width = '300px';     
  popup.style.padding = '20px';
  popup.style.margin = '20px';
  popup.style.backgroundColor = '#DDE0F1';
  popup.style.color = '#000';
  popup.style.borderRadius = '10px';
  popup.style.textAlign = 'center';
  popup.innerHTML = `
    <h3>Подпишитесь на доставку свежих цветов!</h3>
    <button id="closePopup" style="background-color: #000; color: #DDE0F1; margin: 10px; padding: 10px 20px; border-radius: 5px; border: none; cursor: pointer;">ПОН</button>
  `;

  document.body.appendChild(popup);

  document.getElementById('closePopup').addEventListener('click', () => {
    popup.style.display = 'none';
  });

  setTimeout(() => {
    popup.style.display = 'none';
  }, 10000);
};

setTimeout(showPopup, 3000);
