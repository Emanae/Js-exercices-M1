'use_strict';
const classStyle = ['class1', 'class2', 'class3', 'class4', 'class5', 'class6'];
const input = document.createElement('input');
document.body.append(input);
const section = document.createElement('section');
document.body.append(section);

if (localStorage.getItem('message')) {

    displayMessage(localStorage.getItem('message'));
}

input.addEventListener('input', e => {
    section.innerHTML = ''
    displayMessage(e.target.value)
});

function displayMessage(messageText) {

    for (letter of messageText) {
        const div = document.createElement('div');
        div.textContent = letter;

        if (letter == " ") div.classList.add('spaceclass');
        else div.classList.add(classStyle[Math.floor(Math.random() * classStyle.length)]);

        section.append(div);
    }
    localStorage.setItem('message', messageText);
};