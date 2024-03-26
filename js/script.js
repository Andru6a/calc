window.addEventListener('DOMContentLoaded', () => {
    let runningTotal = 0,
        buffer = '0',
        previousOperator;

    const screen = document.querySelector('.calc__screen');

    function buttonClick(value) {
        if (isNaN(value)) {
            handleSymbol(value);
        } else {
            handleNumber(value);
        }
        screen.innerText = buffer;
    }

    function handleNumber(number) {
        if (buffer === '0' && number === '0' || buffer === runningTotal) {
            return
        }
        if (buffer === '0' && number != '0') {
            buffer = buffer.slice(1);
        }
        buffer += number;
    }

    function handleSymbol(symbol) {
        switch (symbol) {
            case 'C':
                runningTotal = 0;
                buffer = '0';
                break;

            case '←':
                if (typeof(buffer) != 'string') {
                    break;
                }
                if (buffer === '0' || buffer.length === 1) {
                    buffer = '0';
                    break;
                }
                buffer = buffer.slice(0, -1);
                break;

            case '÷':
            case '×':
            case '−':
            case '+':
                handleMath(symbol);
                break;

            case '=':
                if (runningTotal === 0) {
                    break;
                }
                flushOperation(parseInt(buffer));
                previousOperator = null;
                buffer = runningTotal;
                break;
        }
    }

    function handleMath(symbol) {
        if (buffer === '0') return

        const intBuffer = parseInt(buffer);

        if (runningTotal === 0) {
            runningTotal = intBuffer;
        } else {
            flushOperation(intBuffer);
        }

        previousOperator = symbol;
        buffer = '0';
    }

    function flushOperation(intBuffer) {
        switch (previousOperator) {
            case '×':
                runningTotal *= intBuffer;
                break;
            case '+':
                runningTotal += intBuffer;
                break;
            case '−':
                runningTotal -= intBuffer;
                break;
            case '÷':
                runningTotal /= intBuffer;
                break;
        }
    }

    function init() {
        document.querySelector('.calc__buttons').addEventListener('click', event => {
            if (!event.target.classList.contains('calc__button')) {
                return
            }
            buttonClick(event.target.innerText);
        })
    }

    init();
})