
'use_strict';
function random(nb) {

    return Math.floor(Math.random() * nb);
}
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function getLetter() {
    return letters[random(letters.length)]
}

function makePassword(options = {}) {
    let { size, withNumbers } = options;
    size ? size : 10;
    if (withNumbers === undefined || withNumbers === null) { withNumbers = true };
    let password = "";
    for (let i = 0; i < size; i++) {

        if (withNumbers && i % 2 === 0) {
            password += random(10);
        }
        else {
            password += getLetter()
        }
    }
    if (size < 8) {
        alert("Votre mot de passe est de taille inferieure a 8, mais a tout de même été enregistré")
    }
    return password;
}

console.log(makePassword({ size: 15, withNumbers: true }))