<script setup>
import ThePokemonSearchField from "@/components/Search/ThePokemonSearchField.vue";
import TheRegionSelector from "@/components/Search/TheRegionSelector.vue";
import RegionPokemonGrid from "@/components/RegionPokemon/RegionPokemonGrid.vue";
import FilteredRegionPokemonGrid from "@/components/RegionPokemon/FilteredRegionPokemonGrid.vue";
import CircleSpinner from "@/components/Icons/CircleSpinner.vue";
import { useRegionPokemonStore } from "@/stores/regionPokemon.js";
import { usePokedexStore } from "@/stores/pokedex.js";

/**
 * @type {useRegionPokemonStore} regionPokemon
 */
const regionPokemon = useRegionPokemonStore();
const pokedex = usePokedexStore();
</script>

<template>
    <section>
        <div class="bg-gray-700 flex p-1 w-full gap-1 sticky top-[5vh]">
            <TheRegionSelector />
            <ThePokemonSearchField />
        </div>
        
        <div v-if="!pokedex.loading && !regionPokemon.loading">
            <RegionPokemonGrid />
            <FilteredRegionPokemonGrid />
        </div>
        <div
            v-else
            class="w-full h-[80vh] flex justify-center align-middle"
        >
            <CircleSpinner class="text-center text-slate-500 w-1/2 h-auto p-6 " />
        </div>
    </section>
</template>
