<script setup>
import { usePokedexStore } from "@/stores/pokedex";
import VLazyImage from "v-lazy-image";
import ThePokemonSearchField from "@/components/Search/ThePokemonSearchField.vue";
import TheRegionSelector from "@/components/Search/TheRegionSelector.vue";

const pokedexStore = usePokedexStore();
</script>

<template>
    <div>
        <div class="bg-gray-700 flex px-1 py-2 w-full">
            <TheRegionSelector />
            <ThePokemonSearchField />
        </div>
        <section class="grid grid-cols-3 gap-4 p-2">
            <div
                v-for="pokemon in pokedexStore.searchable_pokemon"
                :key="pokemon.species_id"
                class="border-2"
            >
                <v-lazy-image
                    :src=" pokemon?.species_id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.species_id}.png` : './img/pokeball-grayscale.png'"
                    class="w-full h-auto"
                />
                <p class="text-center font-bungee text-xs p-1">
                    {{ pokemon.pokemon_species.name }}
                </p>
            </div>
        </section>
    </div>
</template>
