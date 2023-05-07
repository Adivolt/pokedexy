<script setup>
import { RouterView } from "vue-router";
import TheNavbar from "@/components/Nav/TheNav.vue";
import TheLockScreen from "@/components/LockScreen/TheLockScreen.vue";

import { ref } from "vue";

let locked = ref(true);

</script>

<template>
    <main>
        <section class="sm:hidden">
            <TheNavbar />
            <RouterView class="bg-white min-h-[75vh]" />
            <footer
                class="bg-slate-800 fixed inset-x-0 bottom-0 py-3 px-1 border-t-2 border-blue-500"
            >
                <!-- TODO Refactor UI into components-->
                <nav
                    class="flex justify-between font-bungee text-xs text-red-500"
                >
                    <RouterLink
                        class="border border-red-500 px-2 py-0.5 rounded"
                        to="/"
                    >
                        Basic
                    </RouterLink>
                    <RouterLink
                        class="border border-red-500 px-2 py-0.5 rounded"
                        to="/evolution"
                    >
                        Evolution
                    </RouterLink>
                    <RouterLink
                        class="border border-red-500 px-2 py-0.5 rounded"
                        to="/moves"
                    >
                        Moves
                    </RouterLink>
                    <RouterLink
                        class="border border-red-500 px-2 py-0.5 rounded"
                        to="/stats"
                    >
                        Stats
                    </RouterLink>
                </nav>
            </footer>
            <TheLockScreen
                v-if="locked"
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
