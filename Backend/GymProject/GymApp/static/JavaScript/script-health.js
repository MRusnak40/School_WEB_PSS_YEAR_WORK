
console.log('skript se spustil');

const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');


console.log('tlacitka:', buttons);
console.log('karty:', cards);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-filter');
        cards.forEach(card => {
            if(category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
            } else {
                console.log('skryvam kartu:', card);

                card.classList.add('hidden');
            }
        });
    });
});