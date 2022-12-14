'use_strict';

const url = `https://swapi.dev/api/people/`;

const _10Call = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const buttonall = document.createElement('button');
buttonall.textContent = "All";
document.body.append(buttonall);
buttonall.addEventListener("click", () => clearAndSetDatas(_10Call));

_10Call.map((personnageNbButton) => {
    const button = document.createElement('button');
    document.body.append(button);
    button.textContent = `Personnage${personnageNbButton}`;
    button.addEventListener("click", () => clearAndSetDatas([personnageNbButton]));
    button.addEventListener("mousedown", () => button.style.background = "yellow");
    button.addEventListener("mouseup", () => button.style.background = "black");
})

const buttonrandom = document.createElement('button');
buttonrandom.textContent = 'Random';
document.body.append(buttonrandom);
buttonrandom.addEventListener("click", () => clearAndSetDatas(1, Math.floor(Math.random() * 9) + 1));

const section = document.createElement('section');
document.body.append(section);

async function clearAndSetDatas(array) {

    section.innerHTML = '';
    const promises = array.map((index) => getUrlDatas(`https://swapi.dev/api/people/${index}/`));
    const persoInfos = await Promise.all(promises);
    persoInfos.map((persoInfo) => displayStarWarsData(persoInfo));

}

async function displayStarWarsData(persoInfo) {

    const { name, height, mass, films } = persoInfo;
    const div = document.createElement('div');
    section.append(div);
    const ul = document.createElement('ul');
    div.append(ul);

    const liname = document.createElement('li');
    liname.textContent = `Nom: ${name}`;
    const liheight = document.createElement('li');
    liheight.textContent = `Taille: ${height}`;
    const limass = document.createElement('li');
    limass.textContent = `Poids: ${mass}`;
    const ulFilmName = document.createElement('ul');
    ulFilmName.textContent = 'Noms des films :';
    ul.append(liname, liheight, limass, ulFilmName);

    films.forEach(async (url) => { displayFilms(url) });
}

async function displayFilms(url) {
    const { title } = await getUrlDatas(url);
    const liFilm = document.createElement('li');
    liFilm.textContent = title;
    ulFilmName.append(liFilm);
}

async function getUrlDatas(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
