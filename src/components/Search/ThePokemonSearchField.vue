<script setup>
import { MagnifyingGlassCircleIcon } from "@heroicons/vue/24/outline";
import { useRegionPokemonStore } from "@/stores/regionPokemon";
import { ref } from "vue";

const region_pokemon = useRegionPokemonStore();
const query = ref(null);

function search_pokemon() {
    if (query.value !== "") {
        let query_substring = query.value.toLowerCase().split(" ");
        let suggestions = region_pokemon.pokemon.filter(
            (pokemon) => {
                return query_substring.every((substring) => {
                    return pokemon.name.includes(substring);
                });
            }
        );
        if (suggestions) {
            region_pokemon.searching = true;
            region_pokemon.filtered_pokemon = suggestions.slice(0, 6);
        }
    } else {
        region_pokemon.searching = false;
        region_pokemon.filtered_pokemon = null;
    }
}
</script>


<template>
    <div class="w-6/12 relative font-poppins">
        <form @submit.prevent="search_pokemon">
            <!-- Manually binding input values so mobile autocomplete works properly -->
            <input
                :value="query"
                type="text"
                class="w-full h-8 rounded-md border border-gray-500 bg-white pl-5 py-2 px-1 focus:border-black focus:outline-none focus:ring-black text-sm capitalize font-bungee"
                autocomplete="false"
                placeholder="Search"
                @input="query = $event.target.value; search_pokemon()"
            >
            <span
                class="absolute inset-y-0 left-0 flex items-center rounded-r-md px-1 focus:outline-none"
            >
                <MagnifyingGlassCircleIcon class="w-4 h-4 text-gray-500" />
            </span>
        </form>
    </div>
</template>
