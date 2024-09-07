// app.js
const apiKey = 'YOUR_API_KEY'; // Replace with your API key from fixer.io or other service
const apiBase = 'https://api.exchangerate-api.com/v4/latest/'; // Example endpoint

const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertButton = document.getElementById('convert');
const resultDisplay = document.getElementById('result');
const chartCanvas = document.getElementById('chart');

const fetchCurrencies = async () => {
    try {
        const response = await fetch(`${apiBase}USD`);
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            const optionTo = document.createElement('option');
            optionFrom.value = currency;
            optionTo.value = currency;
            optionFrom.textContent = currency;
            optionTo.textContent = currency;
            fromCurrency.appendChild(optionFrom);
            toCurrency.appendChild(optionTo);
        });
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
};

const convertCurrency = async () => {
    try {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amount = parseFloat(amountInput.value);

        if (isNaN(amount)) {
            resultDisplay.textContent = 'Please enter a valid amount';
            return;
        }

        const response = await fetch(`${apiBase}${from}`);
        const data = await response.json();
        const rate = data.rates[to];
        const result = (amount * rate).toFixed(2);

        resultDisplay.textContent = `${amount} ${from} = ${result} ${to}`;
    } catch (error) {
        console.error('Error converting currency:', error);
    }
};

const fetchHistoricalData = async () => {
    try {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const response = await fetch(`https://api.exchangerate-api.com/v4/history/${from}`);
        const data = await response.json();
        const labels = Object.keys(data.rates);
        const values = labels.map(label => data.rates[label][to]);

        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Exchange Rate (${from} to ${to})`,
                    data: values,
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    borderWidth: 2,
                }],
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Exchange Rate'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error fetching historical data:', error);
    }
};

convertButton.addEventListener('click', () => {
    convertCurrency();
    fetchHistoricalData();
});

fetchCurrencies();
