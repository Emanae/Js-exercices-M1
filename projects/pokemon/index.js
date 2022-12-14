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

    pokemonList.sort((a, b) => { a.id - b.id });
    console.log(pokemonList);
    return (pokemonList);
}

async function getPokemonDatas(pokemon, lang) {
    const { sprites } = await getUrlDatas(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
    const { names, id } = await getUrlDatas(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`);

    const namePokemon = names.find(n => n.language.name === lang)?.name;

    return { id: id, name: namePokemon, image: sprites.front_default };
}

async function getUrlDatas(url) {
    return fetch(url).json;
}

getPokemons(2, 'fr');
