'use_strict';

const url = `https://swapi.dev/api/people/`;

const buttonall = document.createElement('button');
buttonall.textContent = "All"
document.body.append(buttonall);
buttonall.addEventListener("click", () => clearAndSetDatas(10, 1));

for (let i = 1; i <= 10; i++) {
    const button = document.createElement('button');
    document.body.append(button);
    button.textContent = `Personnage${i}`
    button.addEventListener("click", () => clearAndSetDatas(1, i));
    button.addEventListener("mousedown", () => button.style.background = "yellow");
    button.addEventListener("mouseup", () => button.style.background = "black");
}

const buttonrandom = document.createElement('button');
buttonrandom.textContent = 'Random';
document.body.append(buttonrandom);
buttonrandom.addEventListener("click", () => clearAndSetDatas(1, Math.floor(Math.random() * 9) + 1));



function clearAndSetDatas(nbIteration, index) {

    uls = document.querySelectorAll('ul');
    uls.forEach((ul) => ul.remove());

    for (let iteration = 0; iteration < nbIteration; iteration++) {
        displayStarWarsData(index);
        index += 1;
    }
}

async function displayStarWarsData(index) {
    const { name, height, mass, films } = await getUrlDatas(`https://swapi.dev/api/people/${index}/`)

    const div = document.createElement('div');
    document.body.append(div);
    const ul = document.createElement('ul');
    div.append(ul);

    const liname = document.createElement('li');
    liname.textContent = `Nom: ${name}`
    const liheight = document.createElement('li');
    liheight.textContent = `Taille: ${height}`
    const limass = document.createElement('li');
    limass.textContent = `Poids: ${mass}`
    const ulFilmName = document.createElement('ul');
    ulFilmName.textContent = 'Noms des films :'
    ul.append(liname, liheight, limass, ulFilmName);


    films.forEach(async (url) => {
        const { title } = await getUrlDatas(url)
        const liFilm = document.createElement('li');
        liFilm.textContent = title;
        ulFilmName.append(liFilm);

    })


}

async function getUrlDatas(url) {
    const response = await fetch(url); // réponse HTTP
    const data = await response.json();
    return data;
}
