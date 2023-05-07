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
        <section class="sm:hidden">
            <TheTopBar />
            <RouterView class="bg-white min-h-[75vh]" />
            <TheLockScreen
                v-if="lock_enabled && locked"
                @unlocked="locked = false"
            />
        </section>
        <section class="hidden sm:grid h-screen">
            <div
                class="font-bungee font-gray sm:self-center text-center text-gray-400"
            >
                <h1 class="text-3xl">
                    Mobile Only Experience
                </h1>
                <p>Try accessing using your mobile phone</p>
            </div>
        </section>
    </main>
</template>
