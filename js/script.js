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
            showCalc.innerHTML = `<div class="displayText">${currentInput}</div>`; // gera uma div no local do face
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

    // Botões com texto
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

    // Botões com ícones (corrigido após feather.replace)
    document.querySelectorAll('.rectangleButton').forEach(btn => {
        const classList = btn.classList;
        if (classList.contains('divide')) {
            btn.addEventListener('click', () => appendValue('÷'));
        } else if (classList.contains('multiply')) {
            btn.addEventListener('click', () => appendValue('×'));
        } else if (classList.contains('subtract')) {
            btn.addEventListener('click', () => appendValue('-'));
        } else if (classList.contains('plus')) {
            btn.addEventListener('click', () => appendValue('+'));
        } else if (classList.contains('equal')) {
            btn.addEventListener('click', () => calculate());
        } else if (classList.contains('zero')) {
            btn.addEventListener('click', () => appendValue('0'));
        }
    });

    renderFace();
});
