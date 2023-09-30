import { defineStore } from "pinia";

/**
 * @typedef {Object} PokedexAPIResponse - The response from the PokéAPI for the Pokédex endpoint
 * @property {string} pokemon_entries - The name.
 */

/**
 * @typedef {Object} Pokemon
 * @property {number} entry_number - Pokémon entry number
 * @property {number} species_id - Pokémon species id
 * @property {string} name - Pokémon name
 * @property {string} url - Pokemon species url
 * @property {string} image_url - Pokémon image url
 */

export const useRegionPokemonStore = defineStore("regionPokemon", {
    state: () => ({
        loading: true,
        pokemon: null,
        filtered_pokemon: null,
        searching: false
    }),

    actions: {
        // Fetch the Pokémon available in this region
        async fill(region) {
            this.loading = true;
            let pokemonEntries = await fetchPokemonEntries(region);
            this.pokemon = preparePokemonData(pokemonEntries);
            this.loading = false;
        }
    }
});

/**
 *  The point of this optimization is to reduce requests to the poke api,
 *  we can extract the id from the Pokémon species url and attach it as a property
 *  this id is also used to accurately set the Pokémon icon on the search bar
 *
 * @param region
 * @returns {Promise<PokedexAPIResponse>}
 */
function fetchPokemonEntries(region) {
    return fetch(region.url)
        .then((response) => response.json())
        .then((data) => data.pokemon_entries);
}


/**
 *  The point of this optimization is to reduce requests to the poke api,
 *  we can extract the id from the Pokémon species url and attach it as a property
 *  this id is also used to accurately set the Pokémon icon on the search bar
 *
 * @param entries
 * @returns {Pokemon[]}
 */
function preparePokemonData(entries) {
    return entries.map((pokemon) => {
        // Remove the trailing slash from the url
        let cleaned_url = pokemon.pokemon_species.url.slice(0, -1);
        // Get the id from the last segment of the url
        let detected_species_id = cleaned_url.split("/").pop();
        return {
            entry_number: pokemon.entry_number,
            species_id: detected_species_id,
            name: pokemon.pokemon_species.name,
            url: pokemon.pokemon_species.url,
            image_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detected_species_id}.png`
        };
    });
}
