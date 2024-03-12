<script setup>
import SignalIndicator from "@/components/TopBar/SignalIndicator.vue";
import TrainerInfo from "@/components/TopBar/TrainerInfo.vue";
</script>
<template>
    <header
        class="sticky bg-red-600 h-[5vh] p-2 inset-x-0 top-0 flex flex-row flex-nowrap items-center flex-grow justify-between z-40"
    >
        <SignalIndicator />
        <TrainerInfo />
    </header>
</template>
