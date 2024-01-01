let input = document.getElementById("input");
let output = document.getElementById("output");

function Convert() {
    let outcome = input.value;

    // Alphabetical order
    outcome = outcome.replace(/everyone/g, "everynyan");

    outcome = outcome.replace(/moment/g, "meowment");
    outcome = outcome.replace(/morning/g, "meowning");

    outcome = outcome.replace(/know/g, "nyow");

    outcome = outcome.replace(/perhaps/g, "purrhaps");

    outcome = outcome.replace(/very/g, "vewwy");

    outcome = outcome.replace(/what/g, "nyani");

    // Things
    // >^.^<
    // Nya
    // Meow
    // Nya nya
    // :3

    output.value = outcome;
}