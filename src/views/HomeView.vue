<script setup>
import { useRegionPokemonStore } from "@/stores/regionPokemon.js";
import { usePokedexStore } from "@/stores/pokedex.js";
import VLazyImage from "v-lazy-image";
import ThePokemonSearchField from "@/components/Search/ThePokemonSearchField.vue";
import TheRegionSelector from "@/components/Search/TheRegionSelector.vue";

const region_pokemon = useRegionPokemonStore();
const pokedex = usePokedexStore();
</script>

<template>
    <section v-if="pokedex.loaded && region_pokemon.loaded">
        <div class="bg-gray-700 flex p-1 w-full gap-1 sticky top-[5vh]">
            <TheRegionSelector />
            <ThePokemonSearchField />
        </div>

        <p class="font-bungee text-sm py-1 px-2 text-slate-500">
            <span class="text-slate-600">{{ region_pokemon.pokemon.length }}</span>
            Pokémon in {{ pokedex.active_region.name }}
        </p>


        <div

            class="grid grid-cols-3 gap-2 py-1 px-2"
        >
            <template v-if="region_pokemon.filter && region_pokemon.filteredPokemon.length > 0">
                <div
                    v-for="pokemon in region_pokemon.filteredPokemon"
                    v-show="region_pokemon.filter &&region_pokemon.filteredPokemon.length > 0"
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
                            {{ pokemon.name }}
                        </p>
                    </a>
                </div>
            </template>

            <div
                v-for="pokemon in region_pokemon.pokemon"
                v-show="region_pokemon.filter === null || region_pokemon.filter === ''"
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
                        {{ pokemon.name }}
                    </p>
                </a>
            </div>
        </div>
    </section>
</template>
