let input = document.getElementById("input");
let output = document.getElementById("output");

function Convert() {
    let outcome = input.value;

    let eraseChar = false;
    for (let i = outcome.length ; i > 0; i--) {
        // Check for ?
        if (outcome.charAt(i) == '?') {
            eraseChar = true;
        }

        // Check for space if eraseChar is true
        if (eraseChar) {
            if (outcome.charAt(i) != ' ') {
                // Erase char
                outcome = outcome.slice(0, i) + outcome.slice(i + 1);
            } else {
                eraseChar = false;

                // Replace space with ','
                outcome = outcome.slice(0, i) + ',' + outcome.slice(i + 1);
            }
        }
    }

    output.value = outcome;
}