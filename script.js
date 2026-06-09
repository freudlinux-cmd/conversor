let exchangeRate = null;

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
    const realValue = parseFloat(realInput.value.replace(',', '.'));

    if (Number.isNaN(realValue)) {
        dolarInput.value = '';
        return;
    }

    if (exchangeRate === null) {
        await fetchExchangeRate();
        if (exchangeRate === null) {
            alert('Não foi possível obter a cotação do dólar no momento. Tente novamente mais tarde.');
            return;
        }
    }

    const dolarValue = realValue / exchangeRate;
    dolarInput.value = dolarValue.toFixed(2);
}

fetchExchangeRate();
