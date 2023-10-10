let jsonText = document.getElementById("jsonText");
let jsonObjectText = document.getElementById("jsonObjectText");

let output = "";

function ConvertJSON() {
    const json = jsonText.value;
    const classType = "public"; // internal // private
    const className = "Example";

    CreateClass(classType, className);

    for (let i = 0; i < json.length; i++) {
        switch (json[i]) {
            // [ = new list
            case '[': 
                
                break;

            // { = new object in parent class
            case '{':
                break;

            // } = finish class
            case '}':
                EndClass();
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
    }

    jsonObjectText.value = output;
}

function CreateClass(type, name) {
    output += type + " class " + name + "\n{\n";
}
function EndClass() {
    output += "}\n"
}

function CreateObject() {

}

function uwu() { jsonText.value = "{\"Int\":0,\"String\":\"Text\",\"Double\":0.01,\"Items\":[{\"Id\":0,\"Name\":\"Test0\"},{\"Id\":1,\"Name\":\"Test1\"}]}"; } 
window.onload = uwu;