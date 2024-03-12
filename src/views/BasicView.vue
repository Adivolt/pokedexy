<script setup>
import { usePokemonStore } from "@/stores/pokemon";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { ArrowLeftIcon } from "@heroicons/vue/20/solid";
import TheNavBar from "@/components/NavBar/TheNavBar.vue";
import TheSpriteViewer from "@/components/ImageNavigator/TheSpriteViewer.vue";
import TheFlavorTextViewer from "@/components/Pokemon/TheFlavorTextViewer.vue";

const pokemonStore = usePokemonStore();
const route = useRoute();

onMounted(() => {
    pokemonStore.selectPokemon(route.params.id);
});

</script>

<template>
    <section class="max-w-5xl md:mx-auto md:mt-10">
        <div class="flex flex-row flex-nowrap justify-between px-1">
            <router-link :to="{ name: 'home' }">
                <ArrowLeftIcon class="h-10 w-10" />
            </router-link>
            <p class="font-bungee text-md">
                {{ pokemonStore.pokemon?.name }}
            </p>
        </div>
        <div
            v-if="!pokemonStore.loading && pokemonStore.pokemon"
            class="p-2"
        >
            <TheSpriteViewer
                :sprites="pokemonStore.pokemon.sprites"
                :gender-rate="pokemonStore.pokemon.gender_rate"
            />
            <TheFlavorTextViewer :flavor-text-entries="pokemonStore.pokemon.flavor_text_entries" />
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
        
        <TheNavBar />
    </section>
</template>