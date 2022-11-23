
'use_strict';
function random(nb) {

    return Math.floor(Math.random() * nb);
}


function getLetter() {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[random(letters.length)]
}

function makePassword(options) {
    if (!options || !options.size || !options.withNumbers) {
        options.size = 10;
        options.withNumbers = true;
    }
    let password = " "
    for (let i = 0; i < options.size; i++) {

        if (options.withNumbers === true && i % 2 === 0) {

            password += random(9);
        }
        else {
            password += getLetter()
        }
    }
    if (options.size < 8) {
        alert("Votre mot de passe est de taille inferieure a 8 mais a tout de même été enregistré")
    }
    return password;
}
console.log(makePassword({ size: 15, withNumbers: true }))