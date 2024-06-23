const maxHeader = 6;

function outputHTML() {
    const output = document.querySelector('#md-output');
    const input = document.querySelector('#md-input');

    let textOutput = document.createElement('div');

    let text = input.value;
    const textLength = text.length;
    for (let i = 0; i < textLength; i++) {
        let oldI = i;

        switch (text[i]) {
            // Header
            case '#':
                let headingAmount = 1;
                while (text[++i] == '#') {
                    if (headingAmount == maxHeader) {
                        break;
                    }

                    headingAmount++;
                }
                i--;

                let headerContent = '';
                while (text[++i] != '\n' && i < textLength) { 
                    headerContent += text[i];
                }

                textOutput.appendChild(createHeader(headingAmount, headerContent));
                continue;

            // Link
            case '[':
                let linkContent = '';
                while (text[++i] != ']' && i < textLength) {
                    linkContent += text[i];
                }
                if (text[++i] != '(') {
                    // uhh...
                    break;
                }

                let linkUrl = '';
                while (text[++i] != ')' && i < textLength) { 
                    linkUrl += text[i];
                } 

                textOutput.appendChild(createLink(linkContent, linkUrl));
                continue;

            // List | https://www.markdownguide.org/basic-syntax/#lists-1
            case '1':
                if (text[++i] != '.') break;
                i++;


                continue;

            // Bold or Italic
            case '*':
                
                continue;
            
            // New Line
            case '\n':

                continue;
        }

        // Just text, kinda
        // createParagraph(text.selectFromTo(oldI, i));
    }

    output.replaceChildren(textOutput);
}

function createHeader(size, text) {
    const heading = document.createElement('h' + size);
    heading.textContent = text;
    return heading;
}

function createLink(text, url) {
    const link = document.createElement('a');
    link.href = url;
    link.target = "_blank";
    link.textContent = text;
    return link;
}

function createList(items) {
    const list = document.createElement('ol');

    for (let i = 0; i < items.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = items[i];
        list.appendChild(listItem);
    }

    return list;
}

function createText(text) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;

    return paragraph;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#md-input').addEventListener('input', () => {
        outputHTML();
    });
    document.querySelector('#paste-default').addEventListener('click', () => {
        document.querySelector('#md-input').value = 
`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

[My Link](https://jeroenj.com)


        `;
        outputHTML();
    });
});

/*
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

[My Link](https://jeroenj.com)

1. One
2. Two
3. Three

*/

/*
Create a stack of [IndexToInsert,Element]
Loop over the stack and add the elements
*/