import { defineStore } from "pinia";

// index 0 is national dex
const DEFAULT_DEX_NATIONAL = 0;
// index 24 is pikachu
const DEFAULT_POKEMON_PIKACHU = 24;

export const usePokedexStore = defineStore("pokedex", {
    state: () => ({
        available_regions: "",
        selected_region: "",
        searchable_pokemon: "",
        selected_pokemon: "",
        pokemon_data: ""
    }),

    getters: {
        formatted_regions: (state) =>
            state.available_regions.map((region) => ({
                name: region.name.replace("-", " "),
                url: region.url
            }))
    },

    actions: {
        // Fetch a list of all available Pokédex regions
        fill() {
            fetch("https://pokeapi.co/api/v2/pokedex/?limit=20")
                .then((response) => response.json())
                .then((data) => data.results)
                .then(async (regions) => {
                    // Set the regions available for selection
                    this.available_regions = regions;
                    // Set the default region "0" is the national dex
                    this.selected_region = regions[DEFAULT_DEX_NATIONAL];

                    // fill the pokedex with the selected region
                    let fetched_pokemon_from_region =
                        await this.fill_pokedex_pokemon(this.selected_region);

                    // Set the searchable Pokémon once the region pokemon are retrieved
                    this.searchable_pokemon = await fetched_pokemon_from_region;
                    // Set the default Pokémon to pikachu on load index is "25"
                    await this.set_pokemon(
                        await fetched_pokemon_from_region[
                            DEFAULT_POKEMON_PIKACHU
                            ]
                    );
                });
        },

        // Fetch the Pokémon available in this region
        async fill_pokedex_pokemon(region) {
            return await fetch(region.url)
                .then((response) => response.json())
                .then((data) => data.pokemon_entries)
                .then((entries) => {
                    return generate_species_id(entries);
                });
        },

        // Set the Pokédex region
        async set_region(region) {
            this.selected_region = region;
            this.searchable_pokemon = await this.fill_pokedex_pokemon(region);
        },

        // Set the Pokémon from region dex
        async set_pokemon(pokemon) {
            this.selected_pokemon = pokemon;
            let [pokemon_info, pokemon_species_info] = await Promise.all([
                fetch(
                    `https://pokeapi.co/api/v2/pokemon/${pokemon.species_id}/`
                )
                    .then((response) => response.json())
                    .then((data) => (this.selected_pokemon_information = data)),
                fetch(
                    `https://pokeapi.co/api/v2/pokemon-species/${pokemon.species_id}/`
                )
                    .then((response) => response.json())
                    .then(
                        (data) =>
                            (this.selected_pokemon_species_information = data)
                    )
            ]);

            // Merge the data from the 2 api calls and create a new object based on the data
            this.pokemon_data = {
                ...pokemon_info,
                ...pokemon_species_info
            };
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
            pokemon_species: pokemon.pokemon_species
        };
    });
}
