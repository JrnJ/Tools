const jsonText = document.getElementById("jsonText");
let jsonObjectText = document.getElementById("jsonObjectText");

const classType = "public"; // internal // private
const defaultClassName = "Example";

let output = "";
let json = "";

function removeJSONSpaces() {
    let insideString = false;

    for (let i = 0; i < json.length; i++) {

        if (json[i] == '"') {
            if (json[i - 1] != '\\') {
                insideString = !insideString;
            }
        } else if (json[i] == ' ') {
            if (!insideString) {
                json = json.slice(0, i) + json.slice(i + 1);
                i--;
            }
        }
    }
}

function ConvertJSON() {
    json = jsonText.value;
    removeJSONSpaces();
    console.log(json);

    for (let i = 0; i < json.length; i++) {
        switch (json[i]) {
            // [ = new list
            case '[': 
                
                break;

            // { = new object in parent class
            case '{':
                i = createClass(i);
                break;

            // } = finish class
            case '}':
                
                break;

            // " = start of key
            case '"':
                break;

            // : = start of value
            case ':':
                break;

            // , = extra property in object
            case ',':
                break;

            // . = int or double
            case '.':
                break;
            default:
                break;
        }

        if (i == 0) {
            output = "Invalid JSON";
            break;
        }
    }

    jsonObjectText.value = output;
}

let county = 0;

function createClass(startIndex) {
    county++;
    if (county > 6) {
        return 0;
    }
    console.log("-------------------------");
    console.log(json[startIndex - 1]);
    // Get the class name
    let className = "UwU";
    if (startIndex == 0) {
        // Use className
        className = defaultClassName;
    } else if (json[startIndex - 1] == ':') {
        // Backtrack until " is found
        for (let i = (startIndex - 3); i > 0; i--) {
            if (json[i] == '"') {
                className = json.substring(i + 1, startIndex - 2);
                break;
            }
        }
    } else if (json[startIndex - 1] == '[') {
        // Backtrack until " is found
        for (let i = (startIndex - 4); i > 0; i--) {
            if (json[i] == '"') {
                className = json.substring(i + 1, startIndex - 3);
                break;
            }
        }
    } else {
        console.log("meow");
        return 0;
    }

    console.log(className);
    output += classType + " class " + className + " \n{\n";

    for (let i = startIndex; i < json.length; i++) {
        switch (json[i]) {

            // } = end class
            case '}':
                output += "}\n";
                return i;

            // {} = create class
            case '{':
                if (i != startIndex) {
                    i = createClass(i);
                    break;
                }
        }

        if (i == 0 && startIndex != i) {
            return 0;
        }
    }
}

function createField(startIndex) {

}

function createList(startIndex) {

}

// function CreateClass(type, name) {
//     output += type + " class " + name + "\n{\n";
// }
// function EndClass() {
//     output += "}\n"
// }

// function CreateObject() {

// }

function uwu() { jsonText.value = "{\"Int\":0,\"String\":\"Text: \\\"Yes!\\\"\",\"Double\":0.01,\"Context\":{\"Id\":0,\"Name\":\"ContextName\"},\"Items\":[{\"Id\":0,\"Name\":\"Test0\"},{\"Id\":1,\"Name\":\"Test1\"}]}"; } 
window.onload = uwu;