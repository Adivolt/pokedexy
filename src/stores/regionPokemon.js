import { defineStore } from "pinia";

export const useRegionPokemonStore = defineStore("regionPokemon", {
    state: () => ({
        pokemon: null,
        loaded: false,
        filter: null
    }),

    actions: {
        // Fetch the Pokémon available in this region
        async fill(region) {
            return await fetch(region.url)
                .then((response) => response.json())
                .then((data) => data.pokemon_entries)
                .then((entries) => {
                    this.pokemon = generate_species_id(entries);
                })
                .finally(() => {
                    this.loaded = true;
                });
        }
    },

    getters: {
        filteredPokemon: (state) => {
            if (state.filter !== "") {
                let query_substring = state.filter.toLowerCase().split(" ");
                let suggestions = state.pokemon.filter(
                    (pokemon) => {
                        return query_substring.every((substring) => {
                            return pokemon.name.includes(substring);
                        });
                    }
                );
                // if we have at least one suggestion, return the first 6
                if (suggestions.length >= 1) {
                    return suggestions.slice(0, 6);
                }
            } else {
                // if the query is empty, return null
                return null;
            }
        }
    }
});

// * The point of this optimization is to reduce requests to the poke api,
// we can extract the id from the Pokémon species url and attach it as a property
// this id is also used to accurately set the Pokémon icon on the search bar
function generate_species_id(entries) {
    return entries.map((pokemon) => {
        // Remove the trailing slash from the url
        let cleaned_url = pokemon.pokemon_species.url.slice(0, -1);
        // Get the id from the last segment of the url
        let detected_species_id = cleaned_url.split("/").pop();

        return {
            entry_number: pokemon.entry_number,
            species_id: detected_species_id,
            name: pokemon.pokemon_species.name,
            url: pokemon.pokemon_species.url
        };
    });
}
