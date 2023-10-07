<script setup>

import { useRegionPokemonStore } from "@/stores/regionPokemon.js";
import { usePokedexStore } from "@/stores/pokedex.js";
import VLazyImage from "v-lazy-image";


/**
 * @type {useRegionPokemonStore} regionPokemon
 */
const regionPokemon = useRegionPokemonStore();
const pokedex = usePokedexStore();

</script>

<template>
    <div v-show="!regionPokemon.search_query">
        <!--Display information about current region and pokemon count -->
        <p class="font-bungee text-sm py-1 px-2 text-slate-500">
            {{ regionPokemon.pokemon.length }} Pokémon in {{ pokedex.active_region.name }}
        </p>
        
        <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2 py-1 px-2">
            <div
                v-for="pokemon in regionPokemon.pokemon"
                :key="pokemon.speciesID"
                class="border-[1px] rounded-md border-slate-600"
            >
                <router-link :to="{ name: 'basic', params: { id: pokemon.speciesID} }">
                    <v-lazy-image
                        :src="pokemon.imageUrl"
                        src-placeholder="/img/loading-spinner.gif"
                        class="w-full h-auto p-2"
                    />
                    <p class="text-center font-bungee text-xs p-1 text-slate-600">
                        {{ pokemon.name }}
                    </p>
                </router-link>
            </div>
        </div>
    </div>
</template>
