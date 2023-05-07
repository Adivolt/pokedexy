<script setup>
import { usePokedexStore } from "@/stores/pokedex";
import VLazyImage from "v-lazy-image";
import ThePokemonSearchField from "@/components/Search/ThePokemonSearchField.vue";
import TheRegionSelector from "@/components/Search/TheRegionSelector.vue";
import CircleSpinner from "@/components/icons/CircleSpinner.vue";

const pokedexStore = usePokedexStore();
</script>

<template>
    <section>
        <div class="bg-gray-700 flex p-1 w-full gap-1 sticky top-[5vh]">
            <TheRegionSelector />
            <ThePokemonSearchField />
        </div>

        <p class="font-bungee text-sm py-1 px-2 text-slate-500">
            {{ pokedexStore.searchable_pokemon.length }} Pokémon in {{ pokedexStore.selected_region.name }}
        </p>

        <div class="grid grid-cols-3 gap-2 py-1 px-2">
            <div
                v-for="pokemon in pokedexStore.searchable_pokemon"
                :key="pokemon.species_id"
                class="border-[1px] rounded-md border-slate-600"
            >
                <a :href="`/${pokemon.species_id}/basic/`">
                    <v-lazy-image
                        :src=" pokemon?.species_id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.species_id}.png` : './img/pokeball-grayscale.png'"
                        src-placeholder="/img/loading-spinner.gif"
                        class="w-full h-auto p-2"
                    />
                    <p class="text-center font-bungee text-xs p-1 text-slate-600">
                        {{ pokemon.pokemon_species.name }}
                    </p>
                </a>
            </div>
        </div>
    </section>
</template>
