window.addEventListener('DOMContentLoaded', () => {
    feather.replace();

    const showCalc = document.querySelector('.showCalc');
    let currentInput = '';
    let resultDisplayed = false;

    function renderFace() {
        showCalc.innerHTML = `
            <div class="eyes">
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
            <div class="smiley">
                <div class="mouth"></div>
            </div>
        `;
    }

    function updateDisplay() {
        if (currentInput === '') {
            renderFace();
        } else {
            showCalc.innerHTML = `<div class="displayText">${currentInput}</div>`;
        }
    }

    function appendValue(value) {
        const isOperator = ['+', '-', '×', '÷'].includes(value);

        if (resultDisplayed) {
            if (currentInput === 'Erro') {
                currentInput = '';
            } else if (isOperator) {
                currentInput = currentInput + value;
            } else {
                currentInput = '';
                currentInput += value;
            }
            resultDisplayed = false;
        } else {
            currentInput += value;
        }

        updateDisplay();
    }


    function clearDisplay() {
        currentInput = '';
        updateDisplay();
    }

    function clearNumberOneByOne() {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        }
    }

    function calculate() {
        try {
            const expression = currentInput
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/,/g, '.')
                .replace(/%/g, '/100');

            const result = eval(expression);
            currentInput = result.toString().replace('.', ',');
            resultDisplayed = true;
            updateDisplay();
        } catch {
            currentInput = 'Erro';
            resultDisplayed = true;
            updateDisplay();
        }
    }

    function toggleParenthesis() {
        const open = (currentInput.match(/\(/g) || []).length;
        const close = (currentInput.match(/\)/g) || []).length;
        currentInput += open > close ? ')' : '(';
        updateDisplay();
    }

    document.querySelectorAll('.circleButton h2, .circleButton h3, .rectangleButton h2, .rectangleButton h3').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.textContent.trim();
            if (value === 'AC') {
                clearDisplay();
            } else if (value === '=') {
                calculate();
            } else if (value === '( )') {
                toggleParenthesis();
            } else {
                appendValue(value);
            }
        });
    });

    document.querySelectorAll('.rectangleButton').forEach(btn => {
        let action = null;

        switch (true) {
            case btn.classList.contains('divide'):
                action = () => appendValue('÷');
                break;
            case btn.classList.contains('multiply'):
                action = () => appendValue('×');
                break;
            case btn.classList.contains('subtract'):
                action = () => appendValue('-');
                break;
            case btn.classList.contains('plus'):
                action = () => appendValue('+');
                break;
            case btn.classList.contains('equal'):
                action = () => calculate();
                break;
            case btn.classList.contains('zero'):
                action = () => appendValue('0');
                break;
        }

        if (action) btn.addEventListener('click', action);
    });

    const deleteOneCharacter = document.getElementById('delete');
    deleteOneCharacter.addEventListener('click', () => clearNumberOneByOne());

    renderFace();
});
