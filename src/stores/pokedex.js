import { defineStore } from "pinia";
import { useRegionPokemonStore } from "@/stores/regionPokemon";

// index 0 is national dex
const KANTO_POKEDEX = 1;

export const usePokedexStore = defineStore("pokedex", {

    state: () => ({
        loading: true,
        regions: null,
        active_region: null
    }),

    actions: {
        async init() {
            this.loading = true;
            await fetch("https://pokeapi.co/api/v2/pokedex/?limit=20")
                .then((response) => response.json())
                .then((data) => data.results)
                .then((regions) => {
                    this.regions = format_region_data(regions);
                    this.set_region(this.regions[KANTO_POKEDEX]);
                })
                .finally(() => {
                    this.loading = false;
                })
            ;
        },

        async set_region(region) {
            this.active_region = region;
            // When a region is selected, we want to fetch the Pokémon available in that region
            // Fill the region Pokémon store with Pokémon from the region
            await useRegionPokemonStore().fill(region);
            // Set the search status to false
            useRegionPokemonStore().searching = false;
            // Set the filtered Pokémon to null
            useRegionPokemonStore().filtered_pokemon = null;
        }
    }

});

function format_region_data(regions) {
    return regions.map((region) => ({
        name: region.name.replace("-", " "),
        url: region.url
    }));
}

