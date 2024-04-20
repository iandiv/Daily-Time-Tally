document.addEventListener("DOMContentLoaded", function() {
    DurationPicker();
});
function DurationPicker() {
    document.head.insertAdjacentHTML("beforeend", `
<style>
    .duration-picker {
position: absolute;
display: inline-block;
padding: 10px;
background: #fff;
border-radius: 6px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}


    .duration-picker__select {
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
    .duration-picker__select:hover {
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

    document.querySelectorAll(".duration-pickable").forEach(durationPickable => {
        let activePicker = null;
        durationPickable.placeholder = "--:-- ";
        durationPickable.addEventListener("focus", () => {
            if (activePicker) return;

            activePicker = showDuration(durationPickable);

            const onClickAway = ({ target }) => {
                if (
                    target === activePicker
                    || target === durationPickable
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
function showDuration(durationPickable) {
    const picker = buildDurationPicker(durationPickable);
    const { bottom: top, left } = durationPickable.getBoundingClientRect();

    picker.style.top = `${top}px`;
    picker.style.left = `${left}px`;

    document.body.appendChild(picker);

    return picker;
}

function buildDurationPicker(durationPickable) {
    const picker = document.createElement("div");
    const hourOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(numberDurationToOption);
    const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(numberDurationToOption);

    picker.classList.add("duration-picker");
    picker.classList.add("border");


    picker.innerHTML = `
<select class="duration-picker__select">
    ${hourOptions.join("")}
</select>
:
<select class="duration-picker__select">
    ${minuteOptions.join("")}
</select>

`;

    const selects = getDurationSelectsFromPicker(picker);

    selects.hour.addEventListener("change", () => durationPickable.value = getdurationStringFromPicker(picker));
    selects.minute.addEventListener("change", () => durationPickable.value = getdurationStringFromPicker(picker));

    if (durationPickable.value) {
        const { hour, minute } = getdurationPartsFromPickable(durationPickable);

        selects.hour.value = hour;
        selects.minute.value = minute;

    }

    return picker;
}

function getdurationPartsFromPickable(durationPickable) {
    const pattern = /^(\d+):(\d+) h$/; // Adjusted the pattern to match "h"
    const [_, hour, minute] = Array.from(durationPickable.value.match(pattern));

    return {
        hour,
        minute,
    };
}

function getDurationSelectsFromPicker(durationPicker) {
    const [hour, minute] = durationPicker.querySelectorAll(".duration-picker__select");

    return {
        hour,
        minute,
    };
}

function getdurationStringFromPicker(durationPicker) {
    const selects = getDurationSelectsFromPicker(durationPicker);

    // Append "h" to the hour value
    const hour = `${selects.hour.value}`;

    return `${hour}:${selects.minute.value} h`;
}

function numberDurationToOption(number) {
    const padded = number.toString().padStart(2, "0");

    return `<option value="${padded}">${padded}</option>`;
}





