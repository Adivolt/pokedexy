<script setup>
import { usePokedexStore } from "@/stores/pokedex";
import TheSpriteViewer from "@/components/ImageNavigator/TheSpriteViewer.vue";

const pokedexStore = usePokedexStore();
</script>

<template>
    <section
        v-if="pokedexStore.pokemon_data !== ''"
        class="p-2"
    >
        <TheSpriteViewer :sprites="pokedexStore.pokemon_data.sprites" />
        <p class="mt-3 font-bold">
            {{ pokedexStore?.pokemon_data?.flavor_text_entries[1].flavor_text }}
        </p>
        <!-- TODO: Implement loading state and to prevent rendering warnings, then simplify conditional -->
    </section>
</template>
