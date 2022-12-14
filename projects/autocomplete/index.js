const url = "https://geo.api.gouv.fr"
const input = document.getElementById('geo');
input.addEventListener('input', getSuggestions);
const suggestionContainer = document.getElementById('suggestions');

async function getSuggestions() {
    const inputValue = document.getElementById("geo").value;
    const municipalities = await getUrlDatas(url + `/communes?nom=${inputValue}`);
    const departements = await getUrlDatas(url + `/departements?nom=${inputValue}`);
    const regions = await getUrlDatas(url + `/regions?nom=${inputValue}`);
    const municipalitiesObjects = municipalities.map(municipality => {
        return {
            type: "municipality",
            nom: municipality.nom,
            population: municipality.population,
            codeDepartement: municipality.codeDepartement
        }
    })
        .sort((a, b) => a.population - b.population);
    const regionsdepartementsObjects = regions.map(region => {
        return {
            type: "region",
            nom: region.nom,
        }
    }).concat(departements.map(departement => {
        return {
            type: "departement",
            nom: departement.nom,
        }
    })).sort((a, b) => a.nom - b.nom)
    const allSuggestions = regionsdepartementsObjects.concat(municipalitiesObjects);
    displaySuggestion(allSuggestions);
}

function displaySuggestion(suggestions) {
    suggestionContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        const li = document.createElement('option');
        li.textContent = suggestion.type === "municipality" ? `${suggestion.codeDepartement} - ${suggestion.nom}   ` : suggestion.nom;
        li.value = suggestion.type === "municipality" ? `${suggestion.codeDepartement} - ${suggestion.nom}   ` : suggestion.nom;
        li.className = suggestion.type;
        suggestionContainer.append(li);
        li.addEventListener('click', () => displayChoice(suggestion));
    });
}
function displayChoice(choice) {
    document.body.innerHTML = '';
    const title = document.createElement('h1');
    title.textContent = "Vous avez choisi :";
    const h2 = document.createElement('h2');
    h2.textContent = choice.nom;
    document.body.append(title);
    document.body.append(h2);


}
// recuperation de ce qu'il y a dans l'input
// get url comm + dep + region 
// création de objet 
// sort pour commune en foction population 
// reunion en une ule lit et sort en fonction du nom 
// affichage de suggestions
//  class en fonction du type 
// affichage du  code si commune
async function getUrlDatas(url) {
    const response = await fetch(url)
    const data = await response.json();
    return data;
}
async function clearAndSetDatas() {

    const promises = getUrlDatas(url)
    const persoInfos = await promises;
    console.log(promises)

}