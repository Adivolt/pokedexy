<script setup>
import TheRegionSelector from "@/components/TopBar/TheRegionSelector.vue";
import TheTrainerInfo from "@/components/TopBar/TheTrainerInfo.vue";
import ThePokemonSearchField from "@/components/TopBar/ThePokemonSearchField.vue";
</script>

<template>
    <header class="sticky top-0">
        <div
            class="bg-red-600 h-10 p-1 inset-x-0 top-0 flex flex-row flex-nowrap justify-items-center items-center gap-1"
        >
            <TheTrainerInfo />
            <TheRegionSelector />
        </div>
        <div class="bg-gray-700 flex px-1 py-2 w-full">
            <ThePokemonSearchField />
        </div>
    </header>
</template>
