import { defineStore } from "pinia";

export const usePokemonStore = defineStore("pokemon", {
    state: () => ({
        pokemon: ""
    }),

    actions: {
        // Set the Pokémon from region dex
        async select_pokemon(pokemon_id) {

            let [pokemon_info, pokemon_species_info] = await Promise.all([
                fetch(
                    `https://pokeapi.co/api/v2/pokemon/${pokemon_id}/`
                )
                    .then((response) => response.json())
                    .then((data) => data),
                fetch(
                    `https://pokeapi.co/api/v2/pokemon-species/${pokemon_id}/`
                )
                    .then((response) => response.json())
                    .then((data) => data)
            ]);

            // Merge the data from the 2 api calls and create a new object based on the data
            this.pokemon = {
                ...pokemon_info,
                ...pokemon_species_info
            };
        }
    }
});