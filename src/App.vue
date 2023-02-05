<script setup>
import { RouterView } from "vue-router";
import TheNavbar from "@/components/Nav/TheNav.vue";
</script>

<template>
    <TheNavbar />
    <RouterView class="bg-white min-h-screen" />
    <footer
        class="bg-slate-800 fixed inset-x-0 bottom-0 py-3 px-1 border-t-2 border-blue-500"
    >
        <!-- TODO Refactor UI into components-->
        <nav class="flex justify-between font-bungee text-xs text-blue-500">
            <RouterLink
                class="border border-blue-500 border-2 px-2 py-0.5 rounded"
                to="/"
            >
                Basic
            </RouterLink>
            <RouterLink
                class="border border-blue-500 border-2 px-2 py-0.5 rounded"
                to="/evolution"
                >Evolution
            </RouterLink>
            <RouterLink
                class="border border-blue-500 border-2 px-2 py-0.5 rounded"
                to="/moves"
                >Moves
            </RouterLink>
            <RouterLink
                class="border border-blue-500 border-2 px-2 py-0.5 rounded"
                to="/stats"
                >Stats
            </RouterLink>
        </nav>
    </footer>
</template>
