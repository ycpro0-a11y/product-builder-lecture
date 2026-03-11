const generateBtn = document.querySelector('.generate-btn');
const numbersContainer = document.querySelector('.numbers');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️';
}

// Theme Toggle Logic
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙';
    }
});

// Lotto Generation Logic
generateBtn.addEventListener('click', () => {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        lottoNumbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(lottoNumbers).sort((a, b) => a - b);

    numbersContainer.innerHTML = '';

    sortedNumbers.forEach(number => {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = number;
        numbersContainer.appendChild(numberDiv);
    });
});
