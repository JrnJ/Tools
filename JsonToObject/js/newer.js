const jsonText = document.getElementById("jsonText");
let jsonObjectText = document.getElementById("jsonObjectText");
const variableNameRegex = document.getElementById("variableNameRegex");

const classType = "public"; // internal // private
const defaultClassName = "Example";

let output = "";
let json = "";
let preClasses = [];
let classes = [];
const addJson = true;

class PreClass {
    constructor(name, startIndex, endIndex, skipIndexes) {
        this.name = name; // String
        this.startIndex = startIndex; // Int
        this.endIndex = endIndex; // Int
        this.skipIndexes = skipIndexes; // Array of Int
    }
};

class Class {
    constructor(name, items) {
        this.name = name; // String
        this.items = items; // Array of ClassItem
    }
};

class ClassItem {
    constructor(type, name) {
        this.type = type; // String
        this.name = name; // String
    }
};

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
    findClass(json, 0);

    createClasses(json);

    // Visualize Classes
    for (let i = 0; i < classes.length; i++) {
        visualizeClass(classes[i]);
    }

    jsonObjectText.value = output;
}

function findClass(json, loopStartIndex) {
    for (let i = loopStartIndex; i < json.length; i++) {
        if (json[i] == '{') {
            let className = "";
            let startIndex = i + 1;
            let endIndex = 0;

            if (i == 0) {
               className = defaultClassName;
            } else if (json[i - 1] == ':') {
                for (let j = i - 3; j > 0; j--) {
                    if (json[j] == '"') {
                        break;
                    }
                    className = json[j] + className;
                }
            } else if (json[i - 1] == '[') {
                for (let j = i - 4; j > 0; j--) {
                    if (json[j] == '"') {
                        break;
                    }
                    className = json[j] + className;
                }

                // if (className[className.length - 1] == 's') {
                //     className = className.slice(0, -1);
                // }
            } else {
                console.log('What happend here?');
            }

            // Find next }
            i++;
            while (i < json.length) {
                if (json[i] == '{') {
                    i = findClass(json, i);
                    i++;
                }

                if (json[i] == '[') {
                    // Find class
                    i = findClass(json, i);

                    // Skip over any class until ] is found
                    while (json[i] != ']') {
                        i++;
                    }
                }

                if (json[i] == '}') {
                    endIndex = i - 1;
                    break;
                }

                i++;
            }

            preClasses.push(new PreClass(toCamelCase(className), startIndex, endIndex, []));
            return i;
        }
    }
}

function createClasses(json) {
    for (let i = 0; i < preClasses.length; i++) {
        classes.push(new Class(preClasses[i].name, createClass(preClasses[i], json)));
    }

    console.log(classes);
}

function createClass(item, json) {
    let items = [];

    for (let i = item.startIndex; i < item.endIndex + 1; i++) {
        let name = "";
        let nameCounter = 0;

        // Get Name
        while (nameCounter < 2) {
            if (json[i] == '"') {
                nameCounter++;
                i++;
                continue;
            }

            if (nameCounter == 1) {
                name += json[i];
            }

            i++;
        }

        // next character will be a : so we skip it here
        i++;

        let typeText = "";
        // Get Type
        while (i < json.length) {
            if (json[i] == ',') {
                break;
            }

            typeText += json[i];

            if (json[i] == '{') {
                while (json[i] != '}') {
                    i++;
                }
                break;
            }

            if (json[i] == '[') {
                // what if an array in an array? this will fail
                while (json[i] != ']') {
                    i++;
                }
                break;
            }

            if (i == item.endIndex) break;
            i++;
        }

        // Evaluate type
        items.push(new ClassItem(evaluateType(typeText, name), name));
    }

    return items;
}

function evaluateType(typeText, name) {
    if (typeText.includes('[')) {
        return "List<" + name + ">";
    }

    if (typeText.includes('{')) {
        return name;
    }

    if (typeText.includes('"')) {
        return "string";
    }

    if (typeText.includes("true") || typeText.includes("false")) {
        return "bool";
    }

    if (typeText.toLowerCase().includes('f')) {
        return "float";
    }
    if (typeText.includes('.')) {
        return "double";
    }

    return "int";
}

function visualizeClass(classObject) {
    output += classType + " class " + classObject.name + "\n{\n";
    console.log(classObject);

    for (let i = 0; i < classObject.items.length; i++) {
        if (addJson) {
            output += "\t[JsonPropertyName(\"" + classObject.items[i].name + "\")]\n";
        }
        output += "\tpublic " + classObject.items[i].type + " " + toCamelCase(classObject.items[i].name) + " { get; }\n\n"
    }

    output = output.slice(0, -1);
    output += "}\n\n";
}

function toCamelCase(input) {
    // TODO use variableNameRegex
    return input.split(/[_-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  }

function uwu() {
    jsonText.value = "{\"Int\":0,\"String\":\"Text: \\\"Yes!\\\"\",\"Double\":0.01,\"Context\":{\"Id\":0,\"Name\":\"ContextName\"},\"Items\":[{\"Id\":0,\"Name\":\"Test0\"},{\"Id\":1,\"Name\":\"Test1\"}]}"; 
    variableNameRegex.value = "_-";
    // jsonText.value = "{\"Int\":0,\"String\":\"Text: \\\"Yes!\\\"\",\"Double\":0.01}";
}

window.onload = uwu;