let times = [];
console.log(times);




function calculateAll() {



    const sets = document.querySelectorAll('.day');

    sets.forEach((set, index) => {
        console.log("Processing set " + index);

        const startTimeInput = set.querySelector('.start');
        const endTimeInput = set.querySelector('.end');
        const breakTimeInput = set.querySelector('.break');
        const totalSpan = set.querySelector('.total');
        const totalDecimal = set.querySelector('.totalDecimal');
    
        if (startTimeInput && endTimeInput && breakTimeInput && totalSpan && totalDecimal) {
            console.log("Start time: ", startTimeInput.value);
            console.log("End time: ", endTimeInput.value);
            console.log("Break time: ", breakTimeInput.value);
            console.log("Total span: ", totalSpan);

            calculateTime(startTimeInput.value, endTimeInput.value, breakTimeInput.value, totalSpan, totalDecimal);
        } else {
            console.error("One or more inputs not found in set " + index);
        }
    });
    times = [];
}


function addMultipleTimes(times) {
    // Initialize total hours and total minutes
    let totalHours = 0;
    let totalMinutes = 0;

    // Iterate over each time string in the array
    times.forEach(time => {
        // Split the time into hours and minutes
        const [hours, minutes] = time.split(':').map(Number);

        // Add the hours and minutes to the totals
        totalHours += hours;
        totalMinutes += minutes;

        // Convert excess minutes to hours if greater than 60
        if (totalMinutes >= 60) {
            totalHours += Math.floor(totalMinutes / 60);
            totalMinutes %= 60;
        }
    });

    // Format the result
    const resultHours = String(totalHours).padStart(2, '0');
    const resultMinutes = String(totalMinutes).padStart(2, '0');

    return `${resultHours}:${resultMinutes}`;
}

// // Example usage:
// let times = ['4:00', '2:00', '1:30', '0:45'];

// // Add a new time to the array
// const newTime = '0:15';
// times.push(newTime);

// // Calculate the total time


function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'pm') {
        hours = parseInt(hours, 10) + 12;
    }

    return hours + ':' + minutes;
}


function calculate() {
    const s = document.getElementById('start').value;
    const e = document.getElementById('end').value;
    const b = document.getElementById('break').value;
    console.log(s)
    calculateTime(s, e, b)
}



function calculateTime(startTime, endTime, breakTime, totalTime, totalDecimal) {
    // Get the current date
    const currentDate = new Date().toISOString().slice(0, 10);
    if (!startTime || !endTime || !breakTime) {
        // Display "invalid" if input is empty
        totalTime.innerText = "--:--";
        totalDecimal.innerText = "-.--";

    } else {
        const decimalToggle = document.querySelector('.decimalToggle');
        if (!decimalToggle.classList.contains('show')) {
            var collapsedecimalToggle = new bootstrap.Collapse(decimalToggle); 
        }
        // Create a new Date object for break time
        const startDate = new Date(currentDate + "T" + convertTo24Hour(startTime));
        const endDate = new Date(currentDate + "T" + convertTo24Hour(endTime));
        const breakDate = new Date(currentDate + "T" + convertTo24Hour(breakTime));

        // Calculate the time difference in milliseconds
        let timeDiff = endDate - startDate;

        // Subtract break time if break time is provided
        if (breakTime !== "00:00") {
            const breakMilliseconds = breakDate - new Date(new Date().toISOString().slice(0, 10) + 'T00:00');
            timeDiff -= breakMilliseconds;
        }

        // Convert milliseconds to hours and minutes
        let hours = Math.floor(timeDiff / 3600000);
        let minutes = Math.floor((timeDiff % 3600000) / 60000);

        // Format the result
        let result = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');

        // Add click event listener to the button
        times.push(result)
        const totalAll = addMultipleTimes(times);
        console.log('Total time:', totalAll);
        totaAllTime = document.querySelector('.totalAll');
        totaAllDecimal = document.querySelector('.totalAllDecimal');





        totalTime.innerText = result +" h";
        totalDecimal.innerText = timeToDecimal(result);

        totaAllTime.innerHTML = "&emsp;" + totalAll + " h";
        totaAllDecimal.innerHTML = "&emsp;" + timeToDecimal(totalAll);

    }
}
function timeToDecimal(time) {
    var splitTime = time.split(":");
    var hours = parseInt(splitTime[0]);
    var minutes = parseInt(splitTime[1]);

    var decimalTime = hours + (minutes / 60);
    return decimalTime.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function () {
    const resultDivs = document.querySelectorAll('.result');

    resultDivs.forEach(function(resultDiv) {
        const clearBtnRow = resultDiv.querySelector('.clearBtn');
        const totalRes = resultDiv.querySelector('.totalRes');

        if (clearBtnRow && totalRes) {
            resultDiv.addEventListener('mouseenter', function () {
                clearBtnRow.classList.add('show');
                totalRes.classList.remove('show');
            });

            resultDiv.addEventListener('mouseleave', function () {
                clearBtnRow.classList.remove('show');
                totalRes.classList.add('show');
            });
        }
    });
});
