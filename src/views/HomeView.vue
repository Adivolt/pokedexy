<script setup>
import { useRegionPokemonStore } from "@/stores/regionPokemon.js";
import { usePokedexStore } from "@/stores/pokedex.js";
import VLazyImage from "v-lazy-image";
import ThePokemonSearchField from "@/components/Search/ThePokemonSearchField.vue";
import TheRegionSelector from "@/components/Search/TheRegionSelector.vue";
import CircleSpinner from "@/components/Icons/CircleSpinner.vue";

/**
 * Need to explain the purpose of X here.
 * @type {Pokemon[]}
 */
const region_pokemon = useRegionPokemonStore();
const pokedex = usePokedexStore();

</script>

<template>
    <section>
        <div class="bg-gray-700 flex p-1 w-full gap-1 sticky top-[5vh]">
            <TheRegionSelector />
            <ThePokemonSearchField />
        </div>
        
        <!--Display information about current region and pokemon count -->
        <p
            v-if="!pokedex.loading && !region_pokemon.loading"
            class="font-bungee text-sm py-1 px-2 text-slate-500"
        >
            {{ region_pokemon.pokemon.length }} Pokémon in {{ pokedex.active_region.name }}
        </p>
        
        
        <div v-show="region_pokemon.filtered_pokemon">
            <div class="grid grid-cols-3 lg:grid-cols-8 gap-2 py-1 px-2">
                <div
                    v-for="pokemon in region_pokemon.filtered_pokemon"
                    :key="pokemon.species_id"
                    class="border-[1px] rounded-md border-slate-600"
                >
                    <a :href="`/${pokemon.species_id}/basic/`">
                        <v-lazy-image
                            :src="pokemon?.species_id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.species_id}.png` : './img/pokeball-grayscale.png'"
                            src-placeholder="/img/loading-spinner.gif"
                            class="w-full h-auto p-2"
                        />
                        <p class="text-center font-bungee text-xs p-1 text-slate-600">
                            {{ pokemon.name }}
                        </p>
                    </a>
                </div>
            </div>
        </div>
        
        <div v-show="!region_pokemon.filtered_pokemon">
            <div
                v-if="!region_pokemon.loading"
                class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2 py-1 px-2"
            >
                <div
                    v-for="pokemon in region_pokemon.pokemon"
                    :key="pokemon.species_id"
                    class="border-[1px] rounded-md border-slate-600"
                >
                    <a :href="`/${pokemon.species_id}/basic/`">
                        <v-lazy-image
                            :src="pokemon.image_url"
                            src-placeholder="/img/loading-spinner.gif"
                            class="w-full h-auto p-2"
                        />
                        <p class="text-center font-bungee text-xs p-1 text-slate-600">
                            {{ pokemon.name }}
                        </p>
                    </a>
                </div>
            </div>
            <div
                v-else
                class="w-full h-[80vh] flex justify-center align-middle"
            >
                <CircleSpinner class="text-center text-slate-500 w-1/2 h-auto p-6 " />
            </div>
        </div>
    </section>
</template>
