document.addEventListener('DOMContentLoaded', function() {
    const menuContainer = document.querySelector('.menu-container');
    const menuScroll = document.querySelector('.menu-scroll');
    const menuItems = menuScroll.querySelectorAll('li');
    const toggleMenuButton = document.querySelector('.toggle-menu-button'); // Seleciona o botão
    const buttonText = toggleMenuButton.querySelector('span');

    function checkMiddleItem() {
        const containerRect = menuScroll.getBoundingClientRect();
        const middlePoint = containerRect.top + containerRect.height / 2;

        let closestItem = null;
        let closestDistance = Infinity;

        menuItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemMiddle = rect.top + rect.height / 2;
            const distance = Math.abs(itemMiddle - middlePoint);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestItem = item;
            }
        });

        menuItems.forEach(item => item.classList.remove('zoom'));
        if (closestItem) {
            closestItem.classList.add('zoom');
        }
    }

    menuScroll.addEventListener('scroll', checkMiddleItem);
    checkMiddleItem(); // Initial check

    // Adiciona evento de clique para redirecionar
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const url = item.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });

    // Adiciona evento de clique para esconder/mostrar o menu com animação
    toggleMenuButton.addEventListener('click', function() {
        menuContainer.classList.toggle('hidden');
        buttonText.classList.remove('typing');

        setTimeout(() => {
            if (menuContainer.classList.contains('hidden')) {
                buttonText.textContent = '<Menu>';
            } else {
                buttonText.textContent = '</Menu>';
            }
            buttonText.classList.add('typing');
        }, 500); // Ajustar o tempo para corresponder à duração da transição CSS
    });
});
