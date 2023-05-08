import { defineStore } from "pinia";

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
            await fetch(region.url)
                .then((response) => response.json())
                .then((data) => data.pokemon_entries)
                .then((entries) => {
                    this.pokemon = format_pokemon_data(entries);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
});

// * The point of this optimization is to reduce requests to the poke api,
// we can extract the id from the Pokémon species url and attach it as a property
// this id is also used to accurately set the Pokémon icon on the search bar
function format_pokemon_data(entries) {
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
