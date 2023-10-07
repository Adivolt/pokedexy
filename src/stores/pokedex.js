import { defineStore } from "pinia";
import { useRegionPokemonStore } from "@/stores/regionPokemon";


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
            let regions = await fetch("https://pokeapi.co/api/v2/pokedex/?limit=20")
                .then((response) => response.json())
                .then((data) => data.results);
            this.regions = this.formatRegionData(regions);
            await this.setRegion(this.regions[KANTO_POKEDEX]);
            this.loading = false;
        },

        async setRegion(region) {
            // clear the search query
            useRegionPokemonStore().search_query = null;
            // When a region is selected, we want to fill the region Pokémon store with Pokémon from the selected region
            this.active_region = region;
            await useRegionPokemonStore().fill(this.active_region);
        },

        formatRegionData(regions) {
            return regions.map((region) => ({
                name: region.name.replace("-", " "),
                url: region.url
            }));
        }
    }

});
