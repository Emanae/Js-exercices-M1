export function random(nb) {
    return Math.floor(Math.random() * nb);
}

// Tu pourrais moins te faire et utiliser .filter
export function removeOnList(index, list) {
    if (index >= 0) {
        list.splice(index, 1);
    }
}
