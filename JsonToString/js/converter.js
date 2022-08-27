let jsonText = document.getElementById("jsonText");
let jsonStringText = document.getElementById("jsonStringText");

const charactersToEscape = [
    "\"",
    "\\"
];

function ConvertJSON() {
    const json = jsonText.value;
    let jsonString = '"';

    let insideString = false;
    let previousChar = "";
    let previousAddedChar = "";

    for (let i = 0; i < json.length; i++) {
        // Check if entering string
        if (json.charAt(i) == '"') {
            if (insideString) {
                if (previousAddedChar == "\\") {

                } else {
                    insideString = false;
                }
            } else {
                insideString = true;
            }
        }

        // Add \
        for (let j = 0; j < charactersToEscape.length; j++) {
            if (json.charAt(i) == charactersToEscape[j]) {
                jsonString += '\\';
            }
        }

        // Check for enters
        if (json.charAt(i) != "\n") {
            // Check for spaces
            if (json.charAt(i) == ' ') {
                // Unless inside a " "
                if (insideString) {
                    previousAddedChar = json.charAt(i);
                    jsonString += json.charAt(i);
                }
            } else {
                previousAddedChar = json.charAt(i);
                jsonString += json.charAt(i);
            }
        }

        previousChar = json.charAt(i);
    }

    jsonString += '"';

    jsonStringText.value = jsonString;
}