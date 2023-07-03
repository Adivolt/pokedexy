<script setup>
import { usePokemonStore } from "@/stores/pokemon";
// import TheSpriteViewer from "@/components/ImageNavigator/TheSpriteViewer.vue";
import TheNavBar from "@/components/NavBar/TheNavBar.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import TheSpriteViewer from "@/components/ImageNavigator/TheSpriteViewer.vue";

const pokemonStore = usePokemonStore();
const route = useRoute();

onMounted(() => {
    pokemonStore.select_pokemon(route.params.id);
});
</script>

<template>
    <section
        v-if="pokemonStore.pokemon !== ''"
        class="p-2"
    >
        <TheSpriteViewer :sprites="pokemonStore.pokemon.sprites" />
        <p class="mt-3 font-bold">
            {{ pokemonStore?.pokemon?.flavor_text_entries[1].flavor_text }}
        </p>
        <!-- TODO: Implement loading state and to prevent rendering warnings, then simplify conditional -->
    </section>
    
    <p>{{ route.params.id }}</p>
    <TheNavBar />
</template>