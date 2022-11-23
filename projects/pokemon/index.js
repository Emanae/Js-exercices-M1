'use_strict';

async function getPokemons(number, lang = 'en') {
    const language = ['roomaji', 'ko', 'zh-Hant', 'fr', 'de', 'es', 'it', 'en', 'ja', 'zh-Hans'];
    if (!language.includes(lang)) {
        lang = 'en';
    }
    const { pokemon_species } = await getUrlDatas(`https://pokeapi.co/api/v2/generation/${number}`);
    const pokemonPromissesList = (Object.keys(pokemon_species)).map(async index => {
        const pokemonDatas = await getPokemonDatas(Object.values(pokemon_species)[index], lang);
        return pokemonDatas;
    })
    const pokemonList = await Promise.all(pokemonPromissesList);

    pokemonList.sort((a, b) => {
        if (a.id < b.id)
            return -1;
        if (a.id > b.id)
            return 1;
        return 0;
    });
    console.log(pokemonList);
}

async function getPokemonDatas(pokemon, lang) {
    let namePokemon = "";
    const { sprites } = await getUrlDatas(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
    const { names, id } = await getUrlDatas(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`);

    names.forEach((langName) => { if (langName.language.name === lang) { namePokemon = langName.name } })

    return { id: id, name: namePokemon, image: sprites.front_default };
}

async function getUrlDatas(url) {
    const response = await fetch(url); // réponse HTTP
    const data = await response.json();
    return data;
}

getPokemons(2, 'fr');
