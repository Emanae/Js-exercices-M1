'use_strict';
const classStyle = ['class1', 'class2', 'class3', 'class4', 'class5', 'class6'];
const input = document.createElement('input');
document.body.append(input);


if (localStorage.getItem('message')) {
    displayMessage(localStorage.getItem('message'))
}

input.addEventListener('input', e => displayMessage(e.target.value));

function displayMessage(messageText) {
    // myElement.addEventListener("click", () => Changebg(color)
    const divs = document.querySelectorAll('div');
    for (div of divs) {
        div.remove()
    }
    const brs = document.querySelectorAll('br');
    for (br of brs) {
        br.remove()
    }
    const container = document.createElement('div');
    container.id = container
    for (letter of messageText) {
        const div = document.createElement('div');
        div.textContent = letter;

        if (letter == " ") {
            div.classList.add('spaceclass');
        }
        else {
            div.classList.add(classStyle[Math.floor(Math.random() * classStyle.length)]);
        }

        document.body.append(div);
    }
    localStorage.setItem('message', messageText);
};