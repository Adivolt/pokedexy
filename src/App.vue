<script setup>
import { RouterView } from "vue-router";
import TheTopBar from "@/components/TopBar/TheTopBar.vue";
import TheLockScreen from "@/components/LockScreen/TheLockScreen.vue";
import { usePokedexStore } from "@/stores/pokedex";

import { onMounted, ref } from "vue";

const pokedexStore = usePokedexStore();
let locked = ref(true);
let lock_enabled = ref(true);

onMounted(() => {
    pokedexStore.init();
});

</script>

<template>
    <main>
        <TheTopBar />
        <RouterView class="bg-white min-h-[75vh]" />
        <TheLockScreen
            v-if="lock_enabled && locked"
            @unlocked="locked = false"
        />
    </main>
</template>
