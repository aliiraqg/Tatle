// دالة تحويل العملات
function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    let result = 0;

    // 1 USDT = 10000 IQU
    if (fromCurrency === 'USDT' && toCurrency === 'IQU') {
        result = amount * 10000;
    } else if (fromCurrency === 'IQU' && toCurrency === 'USDT') {
        result = amount / 10000;
    }

    document.getElementById('result').textContent = `النتيجة: ${result} ${toCurrency}`;
}

// دالة مبادلة العملات
function swapCurrencies() {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    
    // تبديل القيم بين العملتين
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
}

// دالة للتنقل بين الصفحات
function navigateTo(page) {
    window.location.href = page;
}
