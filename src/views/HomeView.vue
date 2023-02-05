<script setup>
import { usePokedexStore } from "@/stores/pokedex";

const pokedexStore = usePokedexStore();
</script>

<template>
    <main>
        <p>Home</p>
        <p>{{ pokedexStore.selected_pokemon }}</p>
    </main>
</template>
