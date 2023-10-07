import { defineStore } from "pinia";

/**
 * @typedef {Object} PokemonStore
 * @property {PokemonData} pokemon - Poke`mon available in this region
 */

/**
 * @typedef {Object} PokemonData
 * @property {Array} abilities - Pokémon abilities
 * @property {number} base_experience - Pokémon base experience
 * @property {string} name - Pokémon name
 * @property {Array} forms - Pokémon forms
 * @property {Array} game_indices - Pokémon game indices
 * @property {number} height - Pokémon height
 * @property {Array} held_items - Pokémon held items
 * @property {number} id - Pokémon id
 * @property {string} location_area_encounters - Pokémon Location area encounters
 * @property {Array} moves - Pokémon moves
 * @property {string} order - Pokémon order
 * @property {Object} species - Pokémon species
 * @property {Object} sprites - Pokémon sprites
 * @property {Array} stats - Pokémon stats
 * @property {Array} types - Pokémon types
 * @property {number} weight - Pokémon weight
 * @property {number} base_happiness - Pokémon base happiness
 * @property {number} capture_rate - Pokémon capture rate
 * @property {Object} color - Pokémon color
 * @property {Array} egg_groups - Pokémon egg groups
 * @property {string} evolution_chain - Pokémon evolution chain
 * @property {string} evolves_from_species - Pokémon evolves from species
 * @property {Array.<Object>} flavor_text_entries - Pokémon flavor text entries
 * @property {Array} form_descriptions - Pokémon form descriptions
 * @property {boolean} forms_switchable - Pokémon forms switchable
 * @property {number} gender_rate - Ratio of gender likelihood
 * @property {Array} genera - Pokémon genera
 * @property {Object} generation - Pokémon generation
 * @property {Object} growth_rate - Pokémon growth rate
 * @property {Object} habitat - Pokémon habitat
 * @property {boolean} has_gender_difference - Pokémon differences in gender
 * @property {number} hatch_counter - Pokémon hatch counter
 * @property {boolean} is_baby - Pokémon is baby
 * @property {boolean} is_legendary - Pokémon is legendary
 * @property {boolean} is_mythical - Pokémon is mythical
 * @property {string} name - Pokémon name
 * @property {Object} names - Pokémon names
 * @property {number} order - Pokémon order
 * @property {Array.<Object>} pal_park_encounters - Pokémon pal park encounters
 * @property {Array.<Object>} pokedex_numbers - Pokémon pokedex numbers
 * @property {Object} shape - Pokémon shape
 * @property {Array.<Object>} varieties - Pokémon varieties
 */


export const usePokemonStore = defineStore("pokemon", {
    state: () => ({
        pokemon: null,
        loading: true
    }),

    actions: {
        /**
         * Generate the data for the selected pokemon
         * @param {number|string} pokemonID
         * @returns {Promise<void> | PokemonData}
         */
        async selectPokemon(pokemonID) {

            this.loading = true;
            // if the pokemonID is a string, we need to convert it to a number
            if (typeof pokemonID === "string") {
                pokemonID = parseInt(pokemonID);
            }

            let [pokemonData, pokemonSpeciesData] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
                    .then((response) => response.json())
                    .then((data) => data),
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`)
                    .then((response) => response.json())
                    .then((data) => data)
            ]);

            // Merge the data from the 2 api calls and create a new object based on aggregated data
            this.pokemon = {
                ...pokemonData,
                ...pokemonSpeciesData
            };
            this.loading = false;
        }
    }
});