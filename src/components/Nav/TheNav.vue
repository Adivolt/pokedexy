<script setup>
import TheRegionSelector from "@/components/Nav/TheRegionSelector.vue";
import TheTrainerInfo from "@/components/Nav/TheTrainerInfo.vue";
import ThePokemonSearchField from "@/components/Nav/ThePokemonSearchField.vue";
</script>

<template>
    <header
        class="bg-red-600 h-10 p-1 inset-x-0 top-0 flex flex-row flex-nowrap justify-items-center items-center gap-1"
    >
        <TheTrainerInfo />
        <TheRegionSelector />
    </header>
    <!-- TODO refactor UI-->
    <div class="bg-gray-700 flex px-1 py-2 w-full">
        <ThePokemonSearchField />
    </div>
</template>
