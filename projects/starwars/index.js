'use_strict';

const url = `https://swapi.dev/api/people/`;

const section = document.createElement('section');
document.body.append(section);
const buttons = document.getElementById("buttons");

const _10Call = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const buttonall = document.createElement('button');
buttonall.textContent = "All";
buttons.append(buttonall);
buttonall.addEventListener("click", () => clearAndSetDatas(_10Call));
buttonall.addEventListener("mousedown", () => button.style.background = "yellow");
buttonall.addEventListener("mouseup", () => button.style.background = "black");

_10Call.map((personnageNbButton) => {
    const button = document.createElement('button');
    buttons.append(button);
    button.textContent = `Personnage${personnageNbButton}`;
    button.addEventListener("click", () => clearAndSetDatas([personnageNbButton]));
    button.addEventListener("mousedown", () => button.style.background = "yellow");
    button.addEventListener("mouseup", () => button.style.background = "black");
})

const buttonrandom = document.createElement('button');
buttonrandom.textContent = 'Random';
buttons.append(buttonrandom);
buttonrandom.addEventListener("click", () => clearAndSetDatas([Math.floor(Math.random() * 9) + 1]));



function clearAndSetDatas(personnagesId) {

    section.innerHTML = '';
    personnagesId.forEach((id) => displayStarWarsData(id))

}

async function displayStarWarsData(index) {
    const { name, height, mass, films } = await getUrlDatas(`https://swapi.dev/api/people/${index}/`)

    const div = document.createElement('div');
    section.append(div);
    const ul = document.createElement('ul');
    div.append(ul);

    const liname = document.createElement('li');
    liname.textContent = `Nom: ${name}`
    const liheight = document.createElement('li');
    liheight.textContent = `Taille: ${height} cm`
    const limass = document.createElement('li');
    limass.textContent = `Poids: ${mass} kg`
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
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
