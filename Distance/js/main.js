const inputMinutes = document.getElementById("inputMinutes");
const inputSeconds = document.getElementById("inputSeconds");

const inputKmh = document.getElementById("inputKmh");
const inputMs = document.getElementById("inputMs");

const inputKilometers = document.getElementById("inputKilometers");
const inputMeters = document.getElementById("inputMeters");


function InputMinutesOnInput() {


    Calculate();
}

function InputSecondsOnInput() {


    Calculate();
}


function InputKmhOnInput() {
    inputMs.value = inputKmh.value / 3.6;

    Calculate();
}

function InputMsOnInput() {
    inputKmh.value = inputMs.value * 3.6;

    Calculate();
}

function Calculate() {
    if (inputMinutes.value == "" && inputSeconds.value == "") {
        console.log("Time");
        return;
    }

    if (inputKmh.value == "" && inputMs.value == "") {
        console.log("Speed");
        return;
    }

    // Seconds
    const time = (inputMinutes.value * 60) + inputSeconds.value;

    // Meters per Second
    const speed = inputMs.value;

    // Distance in meters
    const distance = time * speed;
    inputMeters.value = distance;
}