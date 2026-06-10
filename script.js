let exchangeRate = null;
let conversionMode = 'realToDollar';
let themeMode = 'light';

function updateThemeUI() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');

    if (themeMode === 'light') {
        body.classList.remove('dark-theme');
        themeToggle.textContent = 'Modo Escuro';
    } else {
        body.classList.add('dark-theme');
        themeToggle.textContent = 'Modo Claro';
    }
}

function toggleTheme() {
    themeMode = themeMode === 'light' ? 'dark' : 'light';
    updateThemeUI();
}

function updateModeUI() {
    const realInput = document.getElementById('real');
    const dolarInput = document.getElementById('dolar');
    const toggleButton = document.getElementById('toggleButton');
    const container = document.querySelector('.centro');

    if (conversionMode === 'realToDollar') {
        container.insertBefore(realInput, dolarInput);
        realInput.placeholder = 'Real';
        dolarInput.placeholder = 'Dólar';
        realInput.readOnly = false;
        dolarInput.readOnly = true;
        toggleButton.textContent = 'Dólar → Real';
    } else {
        container.insertBefore(dolarInput, realInput);
        realInput.placeholder = 'Real';
        dolarInput.placeholder = 'Dólar';
        realInput.readOnly = true;
        dolarInput.readOnly = false;
        toggleButton.textContent = 'Real → Dólar';
    }
}

function toggleMode() {
    conversionMode = conversionMode === 'realToDollar' ? 'dollarToReal' : 'realToDollar';
    document.getElementById('real').value = '';
    document.getElementById('dolar').value = '';
    updateModeUI();
}

async function fetchExchangeRate() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL', { cache: 'no-cache' });
        const data = await response.json();
        if (data && data.USDBRL && data.USDBRL.bid) {
            exchangeRate = parseFloat(data.USDBRL.bid.replace(',', '.'));
            return;
        }
    } catch (error) {
        console.error('Erro ao buscar cotação do dólar:', error);
    }
    exchangeRate = null;
}

async function converter() {
    const realInput = document.getElementById('real');
    const dolarInput = document.getElementById('dolar');
    let inputValue;

    if (conversionMode === 'realToDollar') {
        inputValue = parseFloat(realInput.value.replace(',', '.'));
    } else {
        inputValue = parseFloat(dolarInput.value.replace(',', '.'));
    }

    if (Number.isNaN(inputValue)) {
        realInput.value = conversionMode === 'dollarToReal' ? '' : realInput.value;
        dolarInput.value = conversionMode === 'realToDollar' ? '' : dolarInput.value;
        return;
    }

    if (exchangeRate === null) {
        await fetchExchangeRate();
        if (exchangeRate === null) {
            alert('Não foi possível obter a cotação do dólar no momento. Tente novamente mais tarde.');
            return;
        }
    }

    if (conversionMode === 'realToDollar') {
        const dolarValue = inputValue / exchangeRate;
        dolarInput.value = dolarValue.toFixed(2);
    } else {
        const realValue = inputValue * exchangeRate;
        realInput.value = realValue.toFixed(2);
    }
}

updateModeUI();
updateThemeUI();
fetchExchangeRate();
