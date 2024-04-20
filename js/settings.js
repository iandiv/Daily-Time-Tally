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



// Function to handle switch state change
function handleWeekendSwitchStateChange() {
    const switchState = this.checked; // Get the state of the switch
    localStorage.setItem('weekendSwitchState', switchState); // Save the switch state to localStorage
}

// Function to handle collapse state change
function handleCollapseStateChange() {
    const collapseState = this.classList.contains('show'); // Check if the collapse div is currently visible
    localStorage.setItem('weekendCollapseState', collapseState); // Save the collapse state to localStorage
}

// Event listener for switch state change
document.getElementById('weekendSwitch').addEventListener('change', handleWeekendSwitchStateChange);

// Event listener for collapse state change
document.getElementById('weekend').addEventListener('shown.bs.collapse', handleCollapseStateChange);
document.getElementById('weekend').addEventListener('hidden.bs.collapse', handleCollapseStateChange);

// Check if there's a saved switch state in localStorage
const weekendSwitchState = localStorage.getItem('weekendSwitchState');
if (weekendSwitchState) {
    // Apply the saved switch state
    document.getElementById('weekendSwitch').checked = weekendSwitchState === 'true'; // Convert the string to a boolean
}

// Check if there's a saved collapse state in localStorage
const savedCollapseState = localStorage.getItem('weekendCollapseState');
if (savedCollapseState) {
    const weekendCollapse = document.getElementById('weekend');
    if (savedCollapseState === 'true') {
        weekendCollapse.classList.add('show');
    } else {
        weekendCollapse.classList.remove('show');
    }
}

if (document.getElementById('weekendSwitch').checked) {
    handleWeekendSwitchStateChange.call(document.getElementById('weekendSwitch'));
}


function clearContent(button) {
    const decimalToggle = document.querySelector('.decimalToggle');
    if (decimalToggle.classList.contains('show')) {
        var collapsedecimalToggle = new bootstrap.Collapse(decimalToggle); 
    }
    // Traverse up the DOM to find the parent 'div' element
    var parentDiv = button.closest('.day');

    // Find all input elements within the parent 'div' and clear their values
    var inputs = parentDiv.querySelectorAll('input');
    inputs.forEach(function(input) {
        input.value = '';
    });

    // Find the paragraphs with classes 'total' and 'totalDecimal' and clear their content
    var paragraphs = parentDiv.querySelectorAll('.total, .totalDecimal');
    paragraphs.forEach(function(paragraph) {
        paragraph.textContent = '';
    });
    calculateAll();
}

