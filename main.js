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

    let theme;
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    } else {
        theme = 'light';
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙';
    }

    // Reset Disqus to reflect theme change
    if (typeof DISQUS !== 'undefined') {
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = window.location.href;
                this.page.url = window.location.href;
            }
        });
    }
});  Ely, the updated code:
// Theme Toggle Logic
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    let theme;
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    } else {
        theme = 'light';
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙';
    }

    // Reset Disqus to reflect theme change
    if (typeof DISQUS !== 'undefined') {
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = window.location.href;
                this.page.url = window.location.href;
            }
        });
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
