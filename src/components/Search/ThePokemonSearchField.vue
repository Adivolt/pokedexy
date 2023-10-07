<script setup>
import { MagnifyingGlassCircleIcon } from "@heroicons/vue/24/outline";
import { useRegionPokemonStore } from "@/stores/regionPokemon";
import { onMounted, ref } from "vue";


const region_pokemon = useRegionPokemonStore();
const query = ref(null);

onMounted(() => {
    query.value = region_pokemon.search_query;
});


function searchPokemon() {
    if (query.value === "") {
        region_pokemon.search_query = null;
        return;
    }
    region_pokemon.search_query = query.value;
}
</script>


<template>
    <div class="w-6/12 relative font-poppins">
        <form @submit.prevent="searchPokemon">
            <span class="absolute inset-y-0 left-0 flex items-center rounded-r-md px-1 focus:outline-none">
                <MagnifyingGlassCircleIcon class="w-4 h-4 text-gray-500" />
            </span>
            <!-- Manually binding input values so mobile autocomplete works properly -->
            <input
                :value="query"
                type="text"
                class="w-full h-8 rounded-md border border-gray-500 bg-white pl-5 py-2 px-1 focus:border-black focus:outline-none focus:ring-black text-sm capitalize font-bungee"
                autocomplete="false"
                placeholder="Search"
                @input="query = $event.target.value; searchPokemon()"
            >
        </form>
    </div>
</template>
