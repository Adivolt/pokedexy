import { defineStore } from "pinia";

// index 0 is national dex
const KANTO_POKEDEX = 1;

export const usePokedexStore = defineStore("pokedex", {

    state: () => ({
        regions: null,
        active_region: null
    }),

    actions: {
        async init() {
            await fetch("https://pokeapi.co/api/v2/pokedex/?limit=20")
                .then((response) => response.json())
                .then((data) => data.results)
                .then((regions) => {
                    this.regions = format_region_data(regions);
                })
                .finally(() => this.set_region(this.regions[KANTO_POKEDEX]))
            ;
        },

        set_region(region) {
            this.active_region = region;
        }
    }

});

function format_region_data(regions) {
    return regions.map((region) => ({
        name: region.name.replace("-", " "),
        url: region.url
    }));
}