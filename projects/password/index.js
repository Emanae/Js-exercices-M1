
'use_strict';
function random(nb) {

    return Math.floor(Math.random() * nb);
}

function getLetter() {
    // [Romain] Éventuellement définir letters en dehors de la fonction
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[random(letters.length)]
}

function makePassword(options) {
    // [Romain] Tu peux éventuellement utiliser les paramètres par défaut des fonctions
    if (!options || !options.size || !options.withNumbers) {
        options.size = 10;
        options.withNumbers = true;
    }
    // [Romain] C'est mieux si on commence avec '' plutôt que ' '
    let password = " "
    for (let i = 0; i < options.size; i++) {

        // [Romain] === true inutile
        if (options.withNumbers === true && i % 2 === 0) {
          /**
           * [Romain] Tu n'auras jamais le chiffre 9,
           * car Math.random() te renvoie un nombre entre [0, 1[
           */
          password += random(9);
        }
        else {
            password += getLetter()
        }
    }
    if (options.size < 8) {
        alert("Votre mot de passe est de taille inferieure a 8, mais a tout de même été enregistré")
    }
    return password;
}

console.log(makePassword({ size: 15, withNumbers: true }))