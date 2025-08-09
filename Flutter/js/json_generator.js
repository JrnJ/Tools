document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#dart-input').textContent = `class MyClass {
  final int myInt;
  final String myString;

  GoveeDeviceStatusData({
    required this.myInt,
    required this.myString,
  });
}`;

    document.querySelector('#dart-generate').addEventListener('click', () => {
        createOutput();
    });
});

function createOutput() {
    let input = document.querySelector('#dart-input').value;

    let className = input.split(' ')[1];
    let rawVariables = input.split(/\{\r?\n/)[1].split(className)[0].split(/\r?\n/);
    let variables = [];
    rawVariables.forEach((variable) => {
        if (variable.includes(';') && !variable.includes('static')) {
            variables.push(variable);
        }
    });

    let outputValue = `factory ${className}.fromJson(Map<String, dynamic> json) {
  return ${className}(
${variables.map((variable) => {
let variableName = variable.split(';')[0].split(' ').at(-1);
let type = variable.split(';')[0].split(' ').at(-2);
return `    ${variableName}: json['${variableName}'] as ${type},`;
}).join('\n')}
  );
}
    
Map<String, dynamic> toJson() {
  return {
${variables.map((variable) => {
let variableName = variable.split(';')[0].split(' ').at(-1);
return `    '${variableName}': ${variableName},`;
}).join('\n')}
  };
}`;

    console.log('meow!');
    document.querySelector('#dart-output').value = outputValue;
}