<script setup>
import { usePokemonStore } from "@/stores/pokemon";
// import TheSpriteViewer from "@/components/ImageNavigator/TheSpriteViewer.vue";
import TheNavBar from "@/components/NavBar/TheNavBar.vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import TheSpriteViewer from "@/components/ImageNavigator/TheSpriteViewer.vue";

const pokemonStore = usePokemonStore();
const route = useRoute();

onMounted(() => {
    pokemonStore.selectPokemon(route.params.id);
});
</script>

<template>
    <section class="max-w-5xl md:mx-auto md:mt-10">
        <div
            v-if="pokemonStore.pokemon"
            class="p-2"
        >
            <TheSpriteViewer :sprites="pokemonStore.pokemon.sprites" />
            <p class="mt-3 font-bold md:text-center">
                {{ pokemonStore?.pokemon?.flavor_text_entries[1].flavor_text }}
            </p>
            <!-- TODO: Implement loading state and to prevent rendering warnings, then simplify conditional -->
        </div>
        
        
        <!-- TODO: this is commented out because not enough time to finish have to start applying for jobs -->
        <!-- <p>{{ route.params.id }}</p> -->
        <!-- <TheNavBar /> -->
    </section>
</template>