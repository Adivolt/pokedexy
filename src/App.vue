<script setup>
import { RouterView, useRoute } from "vue-router";
import TheTopBar from "@/components/TopBar/TheTopBar.vue";
import TheLockScreen from "@/components/LockScreen/TheLockScreen.vue";
import { usePokedexStore } from "@/stores/pokedex";

import { computed, onMounted, ref } from "vue";

const pokedexStore = usePokedexStore();
let locked = ref(true);
const route = useRoute();

onMounted(() => {
    pokedexStore.init();
});

const showLock = computed(() => {
    const isHome = route.name === "home";
    const alreadyUnlocked = sessionStorage.getItem("locked") === "false";
    return locked.value && isHome && !alreadyUnlocked;
});
</script>

<template>
    <main>
        <TheTopBar />
        <RouterView class="bg-white min-h-[75vh]" />
        <TheLockScreen
            v-if="showLock"
            @unlocked="locked = false"
        />
    </main>
</template>
