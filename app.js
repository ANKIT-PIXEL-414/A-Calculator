const btns = document.querySelectorAll('.btn');
const display = document.querySelector('#display');
const body = document.body;
const toggleBtn = document.querySelector('.dark-mode');
const calculator = document.querySelector('.calculator');

let mode = localStorage.getItem('mode') || 'dark';

// Helper function to check if last input is an operator
function isLastOperator(value) {
  return ['+', '-', '*', '/', '%', '.'].includes(value.slice(-1));
}

// Main input logic
btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;
    
    if (action === 'clear') {
      display.value = '';
    } else if (action === 'delete') {
      display.value = display.value.slice(0, -1);
    } else if (action === 'calculate') {
      try {
        // Prevent divide by zero
        if (display.value.includes('/0')) {
          display.value = 'Math Error';
        } else {
          let result = eval(display.value);
          if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
          } else {
            display.value = result.toString().slice(0, 15);
          }
        }
      } catch {
        display.value = 'Error';
      }
    } else {
      if (display.value.length >= 15) return;
      
      // Prevent starting with operator
      if (display.value === '' && ['+', '*', '/', '%'].includes(value)) return;
      
      // Prevent double operators
      if (isLastOperator(display.value) && ['+', '-', '*', '/', '%', '.'].includes(value)) return;
      
      // Prevent multiple dots in a number
      if (value === '.' && /\.\d*$/.test(display.value)) return;
      
      display.value += value;
    }
  });
});

// MODE TOGGLE SYSTEM
function applyMode() {
  if (mode === 'light') {
    toggleBtn.innerText = 'Light';
    body.classList.add('light-mode-body');
    calculator.classList.add('light-mode');
    display.classList.add('light-mode');
    btns.forEach(btn => btn.classList.add('light-btn'));
    toggleBtn.classList.add('light-mode-dark-mode');
  } else {
    toggleBtn.innerText = 'Dark';
    body.classList.remove('light-mode-body');
    calculator.classList.remove('light-mode');
    display.classList.remove('light-mode');
    btns.forEach(btn => btn.classList.remove('light-btn'));
    toggleBtn.classList.remove('light-mode-dark-mode');
  }
}

function modeToggle() {
  mode = mode === 'dark' ? 'light' : 'dark';
  localStorage.setItem('mode', mode);
  applyMode();
}

applyMode();

toggleBtn.addEventListener('click', () => {
  if (mode === 'light') {
    body.classList.add('body-animate-1');
    applyMode();
    setTimeout(() => {
      body.classList.remove('body-animate-1');
    }, 1000);
  } else {
    calculator.classList.add('body-animate-2');
    applyMode();
    setTimeout(() => {
      calculator.classList.remove('body-animate-2');
    }, 1000);
  }
});