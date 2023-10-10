let input = document.getElementById("input");
let output = document.getElementById("output");

function Convert() {
    let outcome = input.value;

    outcome = outcome.replace(/know/g, "nyow");
    outcome = outcome.replace(/moment/g, "meowment");

    output.value = outcome;
}