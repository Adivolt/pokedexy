<script setup>
import { usePokedexStore } from "@/stores/pokedex";
import { ref } from "vue";

const pokedexStore = usePokedexStore();

let search_query = ref("");
let search_results = ref("");

// Search Pokémon in the available pokedex
function search_pokemon(query) {
    if (query !== "") {
        let query_substring = query.toLowerCase().split(" ");
        let suggestion_buffer = pokedexStore.searchable_pokemon.filter(
            (pokemon) => {
                return query_substring.every((substring) => {
                    return pokemon.pokemon_species.name.includes(substring);
                });
            }
        );
        search_results.value = suggestion_buffer.slice(0, 5);
    } else {
        search_results.value = null;
    }
}

// pokedexStore.set_pokemon(pokedexStore.searchable_pokemon[25]);
</script>
<template>
    <div class="basis-6/12 w-6/12 flex flex-nowrap items-center">
        <p class="font-bungee text-sm">
            <span class="text-gray-300">
                #{{ pokedexStore?.selected_pokemon?.species_id }}
            </span>
            <span class="text-white pl-1">
                {{ pokedexStore?.selected_pokemon?.pokemon_species?.name }}
            </span>
        </p>
    </div>
    <div class="basis-6/12 w-6/12 relative font-poppins">
        <!-- Manually binding input values so mobile autocomplete works properly -->
        <input
            :value="search_query"
            @input="
                search_query = $event.target.value;
                search_pokemon(search_query);
            "
            id="combobox"
            type="text"
            class="w-full h-8 rounded-md border border-gray-500 bg-white pl-5 py-2 px-1 focus:border-black focus:outline-none focus:ring-black text-sm capitalize font-bungee"
            role="combobox"
            aria-controls="options"
            aria-expanded="false"
            autocomplete="false"
            :placeholder="
                pokedexStore?.selected_pokemon
                    ? pokedexStore?.selected_pokemon?.pokemon_species?.name
                    : ''
            "
        />
        <span
            class="absolute inset-y-0 left-0 flex items-center rounded-r-md px-1 focus:outline-none"
        >
            <img
                class="w-4 h-4"
                :src="
                    pokedexStore?.selected_pokemon?.entry_number
                        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexStore.selected_pokemon.species_id}.png`
                        : './img/pokeball-grayscale.png'
                "
                alt=""
            />
        </span>
        <!-- Only show if the pokedex has more than 1 pokemon  -->

        <template v-if="search_results && search_results.length >= 1">
            <ul
                class="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                id="options"
                role="listbox"
            >
                <li
                    v-for="pokemon in search_results"
                    :key="pokemon.entry_number"
                    @:click="
                        pokedexStore.set_pokemon(pokemon);
                        search_results = '';
                        search_query = '';
                    "
                    class="relative cursor-default select-none py-1 px-2 text-gray-900 flex items-center font-bungee"
                    id="option-0"
                    role="option"
                    tabindex="-1"
                >
                    <img
                        :src="
                            pokemon?.entry_number
                                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.entry_number}.png`
                                : './img/pokeball-grayscale.png'
                        "
                        class="h-4 w-4 flex-shrink-0"
                    />
                    <span class="ml-3 truncate text-sm capitalize">
                        {{ pokemon.pokemon_species.name }}
                    </span>
                </li>
            </ul>
        </template>
    </div>
</template>
