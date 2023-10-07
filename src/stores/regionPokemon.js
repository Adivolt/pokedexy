import { defineStore } from "pinia";

/**
 * @typedef {Object} RegionPokemonStore
 * @property {boolean} loading - Is the store loading
 * @property {Pokemon[]} pokemon - Poke`mon available in this region
 */

/**
 * @typedef {Object} region - Pokédex region
 * @property {string} url - The url for this region.
 */

/**
 * @typedef {Object} PokedexAPIResponse - The response from the PokéAPI for the Pokédex endpoint
 * @property {Array} pokemon_entries - The array of Pokémon entries for this region.
 */

/**
 * @typedef {Array} pokemonEntries - Pokémon entries for this region
 * @property {string} pokemon_species.name - The name of the species.
 * @property {string} entry_number.url - The name entry number of this Pokémon.
 */

/**
 * @typedef {Object} Pokemon
 * @property {number} entryNumber - Pokémon entry number
 * @property {number} speciesID - Pokémon species id
 * @property {string} name - Pokémon name
 * @property {string} url - Pokemon species url
 * @property {string} imageUrl - Pokémon image url
 */


export const useRegionPokemonStore = defineStore("regionPokemon", {
    state: () => ({
        loading: true,
        pokemon: null,
        search_query: null
    }),
    getters: {
        filteredPokemon(state) {
            if (state.search_query && state.pokemon) {
                let query_substring = state.search_query.toLowerCase().split(" ");
                let suggestions = state.pokemon.filter((pokemon) => {
                        return query_substring.every((substring) => {
                            return pokemon.name.includes(substring);
                        });
                    }
                );
                return suggestions.slice(0, 6);
            } else {
                return [];
            }
        }
    },
    actions: {
        /**
         * Fetch the Pokémon available in this region
         * @param {region} region - The region to fill with Pokémon
         */
        async fill(region) {
            this.pokemon = null;
            this.loading = true;
            let pokemonEntries = await this.fetchPokemonEntries(region);
            this.pokemon = this.prepareRegionPokemonData(pokemonEntries);
            this.loading = false;
        },
        /**
         *  The point of this optimization is to reduce requests to the poke api,
         *  we can extract the id from the Pokémon species url and attach it as a property
         *  this id is also used to accurately set the Pokémon icon on the search bar
         *
         * @param region
         * @returns {Promise<PokedexAPIResponse>|pokemonEntries}
         */
        async fetchPokemonEntries(region) {
            let regionPokemon = await fetch(region.url)
                .then((response) => response.json());
            return regionPokemon.pokemon_entries;
        },
        /**
         *  The point of this optimization is to reduce requests to the poke api,
         *  we can extract the id from the Pokémon species url and attach it as a property
         *  this id is also used to accurately set the Pokémon icon on the search bar
         *
         * @param {pokemonEntries} entries - Pokémon entries for this region
         * @returns {Pokemon[]} - Formatted Pokémon data
         */
        prepareRegionPokemonData(entries) {
            return entries.map((pokemon) => {
                // Remove the trailing slash from the url
                let cleanedUrl = pokemon.pokemon_species.url.slice(0, -1);
                // Get the id from the last segment of the url
                let detectedSpeciesID = cleanedUrl.split("/").pop();
                return {
                    entryNumber: pokemon.entry_number,
                    speciesID: detectedSpeciesID,
                    name: pokemon.pokemon_species.name,
                    url: pokemon.pokemon_species.url,
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detectedSpeciesID}.png`
                };
            });
        }
    }
});