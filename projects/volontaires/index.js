/**
 * Écris plutôt
 * import { random, removeOnList } from "./utils.js";
 */
import { random } from "./utils.js";
import { removeOnList } from "./utils.js";

let people = [];
let notYetPassed = [];

const deleteButton = document.getElementById('deleteName');
const deleteAllButton = document.getElementById('deleteAll');
const addButton = document.getElementById('AddName');
const choiceButton = document.getElementById('choice');
const choiceDiv = document.getElementById("choosenPerson");

choiceButton.addEventListener('click', choice);
addButton.addEventListener('click', addPeople);
deleteButton.addEventListener('click', deletePeople);
deleteAllButton.addEventListener('click', deleteAllPeople);

function addPeople() {
    const newPeople = document.getElementById("person").value;

    if (!people.includes(newPeople) && newPeople.length > 0) {
        people.push(newPeople);
        notYetPassed.push(newPeople);
        display(newPeople);
    }
    else {
        alert("Entrez un prénom qui n'est pas encore dans la liste")
    }

    // Manque la sauvegarde dans le localStorage
}

function deletePeople() {
    const person = document.getElementById("person").value;
    const div = document.getElementById(`${person}`);
    div.remove()

    // Utilise .filter plutot, ça sera beaucoup plus simple
    removeOnList(people.findIndex(element => element === person), people);
    removeOnList(notYetPassed.findIndex(element => element === person), notYetPassed);

    display();
}

function deleteAllPeople() {
    people = [];
    notYetPassed = [];
    const container = document.getElementById("nameSection");
    container.innerHTML = " ";
    choiceDiv.textContent = " ";
}

function choice() {
    const index = random(notYetPassed.length);
    displayChange(notYetPassed[index])
    removeOnList(index, notYetPassed);
    if (notYetPassed.length === 0) {
      /**
       * Ici tu ne fais que dupliquer le tableau:
       * tu pourrais faire notYetPassed =
       */
        notYetPassed = people.map((person) => { return person });
        const divs = document.querySelectorAll("div.otherDivs");
        // Plutôt .classList.add()
        divs.forEach((div) => div.className = "notYetPassedPeopleDivs")
    }
}

function display() {
    const container = document.getElementById("nameSection");
    container.innerHTML = "";
    people.forEach((person) => {
        const div = document.createElement('div');
        div.textContent = person;
        div.id = person;
        // Plutôt .classList.add()
        div.className = notYetPassed.includes(person) ? "notYetPassedPeopleDivs" : "otherDivs";
        container.append(div);
    }
    )

}
function displayChange(choosenPerson) {
    const div = document.getElementById(`${choosenPerson}`);
    // Plutôt .classList.add()
    div.className = "otherDivs";
    choiceDiv.textContent = choosenPerson;
}

