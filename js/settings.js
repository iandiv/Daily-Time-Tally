// DARK MODE SETTINGS

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', newTheme);

    localStorage.setItem('theme', newTheme);
}

function handleSwitchStateChange() {
    const switchState = this.checked;
    localStorage.setItem('switchState', switchState);
}

document.getElementById('btnSwitch').addEventListener('click', toggleTheme);

document.getElementById('btnSwitch').addEventListener('change', handleSwitchStateChange);

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
} else {
    document.documentElement.setAttribute('data-bs-theme', 'light'); // Set 'light' as default
    localStorage.setItem('theme', 'light'); // Store default theme in localStorage
}

const savedSwitchState = localStorage.getItem('switchState');
if (savedSwitchState) {
    document.getElementById('btnSwitch').checked = savedSwitchState === 'true'; // Convert the string to a boolean
}

// WEEKEND SETTINGS
function handleWeekendSwitchStateChange() {
    const switchState = this.checked;
    localStorage.setItem('weekendSwitchState', switchState);

    if (!switchState) {

        clearInputsAndP();
        const decimalToggle = document.querySelector('.decimalToggle');
        if (decimalToggle.classList.contains('show')) {
            var collapsedecimalToggle = new bootstrap.Collapse(decimalToggle);
        }
        calculateAll();
    }
}

function handleCollapseStateChange() {
    const collapseState = this.classList.contains('show');
    localStorage.setItem('weekendCollapseState', collapseState);
}

document.getElementById('weekendSwitch').addEventListener('change', handleWeekendSwitchStateChange);

document.getElementById('weekend').addEventListener('shown.bs.collapse', handleCollapseStateChange);
document.getElementById('weekend').addEventListener('hidden.bs.collapse', handleCollapseStateChange);

const weekendSwitchState = localStorage.getItem('weekendSwitchState');
if (weekendSwitchState) {
    document.getElementById('weekendSwitch').checked = weekendSwitchState === 'true';
}

const savedCollapseState = localStorage.getItem('weekendCollapseState');
if (savedCollapseState) {
    const weekendCollapse = document.getElementById('weekend');
    if (savedCollapseState === 'true') {
        weekendCollapse.classList.add('show');
    } else {
        weekendCollapse.classList.remove('show');
    }
}

function clearInputsAndP() {
    var weekendDiv = document.getElementById('weekend');

    var inputElements = weekendDiv.querySelectorAll('input');

    inputElements.forEach(function (input) {
        input.value = '';
    });

    var pElements = weekendDiv.querySelectorAll('p');

    pElements.forEach(function (p) {
        p.textContent = '';
    });
}

function clearContent(button) {
    const decimalToggle = document.querySelector('.decimalToggle');
    if (decimalToggle.classList.contains('show')) {
        var collapsedecimalToggle = new bootstrap.Collapse(decimalToggle);
    }
    var parentDiv = button.closest('.day');

    var inputs = parentDiv.querySelectorAll('input');
    inputs.forEach(function (input) {
        input.value = '';
    });

    var paragraphs = parentDiv.querySelectorAll('.total, .totalDecimal');
    paragraphs.forEach(function (paragraph) {
        paragraph.textContent = '';
    });
    calculateAll();
}
// DECIMAL SETTINGS

function showDecimal() {
    const sets = document.querySelectorAll('.day');

    sets.forEach((set, index) => {

        const totalSpan = set.querySelector('.total');
        const totalDecimal = set.querySelector('.totalDecimal');

        var collapseSpan = new bootstrap.Collapse(totalSpan);
        var collapseDecimal = new bootstrap.Collapse(totalDecimal);

    });
    const totalAllSpan = document.querySelector('.totalAll');
    const totalAllDecimal = document.querySelector('.totalAllDecimal');

    var collapseAllSpan = new bootstrap.Collapse(totalAllSpan);
    var collapseAllDecimal = new bootstrap.Collapse(totalAllDecimal);

    // Save checkbox state
    const decimalSwitchState = document.getElementById('decimalSwitch').checked;
    localStorage.setItem('decimalSwitchState', decimalSwitchState);
}

// Load saved checkbox state
const decimalSwitchState = localStorage.getItem('decimalSwitchState');
if (decimalSwitchState) {
    document.getElementById('decimalSwitch').checked = decimalSwitchState === 'true';
}

// Call showDecimal function if checkbox is checked
if (document.getElementById('decimalSwitch').checked) {
    showDecimal();
}
