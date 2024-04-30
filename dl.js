// Script to fetch all data from the PokeAPI and save it
import fs from 'fs';

// Pokemons
const pokemons = [];
const lastId = 649;
for (let id = 1; id <= lastId; id++) {
    const pokemon = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)).json();
    pokemons.push({
        id,
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1),
        types: pokemon.types.map(type => type.type.name)
    });

    fs.writeFileSync(`pokemons/${id}.png`, new Buffer(await (await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`)).arrayBuffer()));
    fs.writeFileSync('pokemons.json', JSON.stringify(pokemons));
    console.log((id / lastId * 100).toFixed(2) + '%');
}

// Types
const allTypes = (await (await fetch('https://pokeapi.co/api/v2/type/')).json()).results;
const types = [];
let id = 1;
for (const _type of allTypes) {
    const type = await ( await fetch(_type.url)).json();
    types.push({
        id: id,
        name: type.name,
        no_damage_from: type.damage_relations.no_damage_from.map(t => t.name),
        half_damage_from: type.damage_relations.half_damage_from.map(t => t.name),
        double_damage_from: type.damage_relations.double_damage_from.map(t => t.name),
        no_damage_to: type.damage_relations.no_damage_to.map(t => t.name),
        half_damage_to: type.damage_relations.half_damage_to.map(t => t.name),
        double_damage_to: type.damage_relations.double_damage_to.map(t => t.name),
    });

    fs.writeFileSync('types.json', JSON.stringify(types));
    console.log((id++ / allTypes.length * 100).toFixed(2) + '%');
}
