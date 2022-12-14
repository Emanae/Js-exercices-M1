const url = "https://geo.api.gouv.fr"
const input = document.getElementById('geo');
input.addEventListener('input', getSuggestions);
const suggestionContainer = document.getElementById('suggestions');
const choiceContainer = document.getElementById('searchPlace');

async function getSuggestions() {
    const inputValue = document.getElementById("geo").value;
    const municipalities = await getUrlDatas(url + `/communes?nom=${inputValue}`);
    const departements = await getUrlDatas(url + `/departements?nom=${inputValue}`);
    const regions = await getUrlDatas(url + `/regions?nom=${inputValue}`);
    const municipalitiesObjects = municipalities.map(municipality => {
        return {
            type: "commune",
            nom: municipality.nom,
            population: municipality.population,
            codeDepartement: municipality.codeDepartement,
            codesPostaux: `${municipality.codesPostaux.flat()}`,
        }
    }).sort((a, b) => a.population - b.population);

    const regionsdepartementsObjects = regions.map(region => {
        return {
            type: "region",
            nom: region.nom,
            codeRegion: region.code,
        }
    }).concat(departements.map(departement => {
        return {
            type: "departement",
            nom: departement.nom,
            code: departement.code,
            codeRegion: departement.codeRegion
        }
    })).sort((a, b) => a.nom - b.nom)

    const allSuggestions = regionsdepartementsObjects.concat(municipalitiesObjects);
    displaySuggestion(allSuggestions);
}

function displaySuggestion(suggestions) {
    suggestionContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        const li = document.createElement('option');
        li.textContent = suggestion.type === "commune" ? `${suggestion.codeDepartement} - ${suggestion.nom}   ` : suggestion.nom;
        li.value = suggestion.type === "commune" ? `${suggestion.codeDepartement} - ${suggestion.nom}   ` : suggestion.nom;
        li.className = suggestion.type;
        suggestionContainer.append(li);
        li.addEventListener('click', () => displayChoice(suggestion));
    });
}
function displayChoice(choice) {
    suggestionContainer.innerHTML = '';
    choiceContainer.innerHTML = '';
    const title = document.createElement('h1');
    title.textContent = `Vous avez choisi :    ${choice.nom}`;
    choiceContainer.append(title);

    Object.keys(choice).forEach((key) => {
        const p = document.createElement('p');
        p.textContent = `${key} : ${choice[key]}`;
        choiceContainer.append(p);
    })
}

async function getUrlDatas(url) {
    const response = await fetch(url)
    const data = await response.json();
    return data;
}
