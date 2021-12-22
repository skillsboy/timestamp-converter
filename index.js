const timestampToDateInput = document.getElementById("timestamp-to-date-input");
const convertFrom = document.getElementById("convert-from");
const convertTo = document.getElementById("convert-to");
const currentTimestamp = document.getElementById("current-timestamp");
const notSupportedMessage = "This timestamp is not supported.";
let currentTimestampInterval;

function getCurrentTimestamp() { // in seconds
    return parseInt(Date.now() / 1000);
}

function handleKeyUp() {
    const inputValue = timestampToDateInput.value.trim();
    const isNumber = /^\d+$/.test(inputValue);
    const inputLength = inputValue.length;
    const inputInt = parseInt(inputValue);
    let type;
    let calculatedTimestamp;
    let date;



    // Input validation
    if (inputValue === "") {
        return;
    }

    if (!isNumber) {
        convertFrom.textContent = notSupportedMessage;
        convertTo.textContent = notSupportedMessage;
        return;
    }

    // calculate if input is given in seconds or milliseconds, if not tell user it's not supported
    if (inputLength < 12) {
        type = "seconds";
        calculatedTimestamp = inputInt * 1000;
    } else if (inputLength < 15) {
        type = "milliseconds";
        calculatedTimestamp = inputInt;
    } else {
        type = "";
        calculatedTimestamp = null;

        convertFrom.textContent = notSupportedMessage;
        convertTo.textContent = notSupportedMessage;
        return;
    }

    date = new Date(calculatedTimestamp);
    let formatedDate = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;

    convertFrom.textContent = `${inputValue} ${type}`;
    convertTo.textContent = formatedDate;
}

function convertNow() {
    timestampToDateInput.value = getCurrentTimestamp();
    timestampToDateInput.focus();
    handleKeyUp();
}

function setCurrentTimestampWithInterval() {
    currentTimestamp.textContent = getCurrentTimestamp();
    currentTimestampInterval = setInterval(function () {
        currentTimestamp.textContent = getCurrentTimestamp();
    }, 1000);
}

// events
timestampToDateInput.onkeyup = handleKeyUp;

currentTimestamp.onmouseenter = function () {
    clearInterval(currentTimestampInterval);
};

currentTimestamp.onmouseleave = setCurrentTimestampWithInterval;

setCurrentTimestampWithInterval();
convertNow();