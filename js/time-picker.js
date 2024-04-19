document.addEventListener("DOMContentLoaded", function () {
    TimePicker();
});
function TimePicker() {
    document.head.insertAdjacentHTML("beforeend", `
	<style>
        .time-picker {
            position: absolute;
            display: inline-block;
            padding: 10px;
            background: #fff;
            border: 1px solid #dddddd;
            border-radius: 6px;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
            }
            
            
                .time-picker__select {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    outline: none;
                    text-align: center;
                    border: 0px solid #dddddd;
                    border-radius: 6px;
                    padding: 6px 10px;
                    background: #ffffff;
                    
                    cursor: pointer;
                }
                .time-picker__select:hover {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    outline: none;
                    text-align: center;
                    border: 0px solid #dddddd;
                    border-radius: 6px;
                    padding: 6px 10px;
                    background: #eee;
                    cursor: pointer;
                }
            </style>
	`);

    document.querySelectorAll(".time-pickable").forEach(timePickable => {
        let activePicker = null;
        timePickable.placeholder = "--:-- --";

        timePickable.addEventListener("focus", () => {
            if (activePicker) return;

            activePicker = show(timePickable);

            const onClickAway = ({ target }) => {
                if (
                    target === activePicker
                    || target === timePickable
                    || activePicker.contains(target)
                ) {
                    return;
                }

                document.removeEventListener("mousedown", onClickAway);
                document.body.removeChild(activePicker);
                activePicker = null;
            };

            document.addEventListener("mousedown", onClickAway);
        });
    });
}

function show(timePickable) {
    const picker = buildPicker(timePickable);
    const { bottom: top, left } = timePickable.getBoundingClientRect();

    picker.style.top = `${top}px`;
    picker.style.left = `${left}px`;

    document.body.appendChild(picker);

    return picker;
}

function buildPicker(timePickable) {
    const picker = document.createElement("div");
    const hourOptions = [,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(numberToOption);
    const minuteOptions = [,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
    .map(numberToOption);

    picker.classList.add("time-picker");
    picker.innerHTML = `
		<select class="time-picker__select">
			${hourOptions.join("")}
            
		</select>
		:
		<select class="time-picker__select">

			${minuteOptions.join("")}
		</select>
		<select class="time-picker__select" >

			<option value="am">am</option>
			<option value="pm">pm</option>
		</select>
	`;

    const selects = getSelectsFromPicker(picker);

    selects.hour.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
    selects.minute.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));
    selects.meridiem.addEventListener("change", () => timePickable.value = getTimeStringFromPicker(picker));

    if (timePickable.value) {
        const { hour, minute, meridiem } = getTimePartsFromPickable(timePickable);

        selects.hour.value = hour;
        selects.minute.value = minute;
        selects.meridiem.value = meridiem;
    }

    return picker;
}

function getTimePartsFromPickable(timePickable) {
    const pattern = /^(\d+):(\d+) (am|pm)$/;
    const [hour, minute, meridiem] = Array.from(timePickable.value.match(pattern)).splice(1);

    return {
        hour,
        minute,
        meridiem
    };
}

function getSelectsFromPicker(timePicker) {
    const [hour, minute, meridiem] = timePicker.querySelectorAll(".time-picker__select");

    return {
        hour,
        minute,
        meridiem
    };
}

function getTimeStringFromPicker(timePicker) {
    const selects = getSelectsFromPicker(timePicker);

    return `${selects.hour.value}:${selects.minute.value} ${selects.meridiem.value}`;
}

function numberToOption(number) {
    const padded = number.toString().padStart(2, "0");

    return `<option value="${padded}">${padded}</option>`;
}
