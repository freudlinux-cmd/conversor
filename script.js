let exchangeRates = { BRL: 1 };
let themeMode = 'light';

const currencyNames = {
    BRL: 'Real',
    USD: 'Dólar',
    EUR: 'Euro',
    GBP: 'Libra Esterlina',
    JPY: 'Iene Japonês'
};

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

function getCurrencyLabel(code) {
    return currencyNames[code] ? `${currencyNames[code]} (${code})` : code;
}

function updateInterface() {
    const from = document.getElementById('moedaOrigem').value;
    const to = document.getElementById('moedaDestino').value;
    const valor = document.getElementById('valor');
    const resultado = document.getElementById('resultado');

    valor.placeholder = `Valor em ${getCurrencyLabel(from)}`;
    resultado.placeholder = `Resultado em ${getCurrencyLabel(to)}`;
}

function toggleMode() {
    const fromSelect = document.getElementById('moedaOrigem');
    const toSelect = document.getElementById('moedaDestino');
    const temp = fromSelect.value;

    fromSelect.value = toSelect.value;
    toSelect.value = temp;

    document.getElementById('valor').value = '';
    document.getElementById('resultado').value = '';
    updateInterface();
}

async function fetchExchangeRates() {
    const pairs = ['USD-BRL', 'EUR-BRL', 'GBP-BRL', 'JPY-BRL'].join(',');

    try {
        const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${pairs}`, { cache: 'no-cache' });
        const data = await response.json();

        exchangeRates = {
            BRL: 1,
            USD: parseFloat(data.USDBRL.bid.replace(',', '.')),
            EUR: parseFloat(data.EURBRL.bid.replace(',', '.')),
            GBP: parseFloat(data.GBPBRL.bid.replace(',', '.')),
            JPY: parseFloat(data.JPYBRL.bid.replace(',', '.'))
        };
    } catch (error) {
        console.error('Erro ao buscar cotações:', error);
        alert('Não foi possível obter as cotações no momento. Verifique sua conexão e tente novamente.');
    }
}

function formatNumber(value) {
    return Number.isFinite(value) ? value.toFixed(2) : '';
}

async function converter() {
    const from = document.getElementById('moedaOrigem').value;
    const to = document.getElementById('moedaDestino').value;
    const amount = parseFloat(document.getElementById('valor').value.replace(',', '.'));
    const resultado = document.getElementById('resultado');

    if (Number.isNaN(amount)) {
        resultado.value = '';
        return;
    }

    if (!exchangeRates[from] || !exchangeRates[to]) {
        await fetchExchangeRates();
    }

    if (!exchangeRates[from] || !exchangeRates[to]) {
        alert('Cotações indisponíveis. Tente novamente mais tarde.');
        return;
    }

    let convertedValue;

    if (from === to) {
        convertedValue = amount;
    } else if (from === 'BRL') {
        convertedValue = amount / exchangeRates[to];
    } else if (to === 'BRL') {
        convertedValue = amount * exchangeRates[from];
    } else {
        convertedValue = amount * (exchangeRates[from] / exchangeRates[to]);
    }

    resultado.value = formatNumber(convertedValue);
}

document.getElementById('moedaOrigem').addEventListener('change', () => {
    updateInterface();
    document.getElementById('valor').value = '';
    document.getElementById('resultado').value = '';
});

document.getElementById('moedaDestino').addEventListener('change', () => {
    updateInterface();
    document.getElementById('valor').value = '';
    document.getElementById('resultado').value = '';
});

updateInterface();
updateThemeUI();
fetchExchangeRates();
