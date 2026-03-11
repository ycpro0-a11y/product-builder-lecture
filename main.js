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

// Lotto Generation Logic with Advanced Options
generateBtn.addEventListener('click', () => {
    const includeInput = document.getElementById('include-nums').value;
    const excludeInput = document.getElementById('exclude-nums').value;

    const includeNums = includeInput.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n >= 1 && n <= 45);
    const excludeNums = excludeInput.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n >= 1 && n <= 45);

    const lottoNumbers = new Set(includeNums);

    // If more than 6 include numbers are given, pick only first 6
    if (lottoNumbers.size > 6) {
        const temp = Array.from(lottoNumbers).slice(0, 6);
        lottoNumbers.clear();
        temp.forEach(n => lottoNumbers.add(n));
    }

    let attempts = 0;
    while (lottoNumbers.size < 6 && attempts < 1000) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        if (!excludeNums.includes(randomNumber)) {
            lottoNumbers.add(randomNumber);
        }
        attempts++;
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

// Tax Calculator Logic
const prizeInput = document.getElementById('prize-amount');
const totalTaxDisplay = document.getElementById('total-tax');
const netPayoutDisplay = document.getElementById('net-payout');

prizeInput.addEventListener('input', () => {
    const prize = parseInt(prizeInput.value) || 0;
    let tax = 0;

    if (prize <= 2000000) {
        tax = 0;
    } else if (prize <= 300000000) {
        tax = prize * 0.22;
    } else {
        const taxUnder300 = 300000000 * 0.22;
        const taxOver300 = (prize - 300000000) * 0.33;
        tax = taxUnder300 + taxOver300;
    }

    const netPayout = prize - tax;

    totalTaxDisplay.textContent = tax.toLocaleString() + '원';
    netPayoutDisplay.textContent = netPayout.toLocaleString() + '원';
});
