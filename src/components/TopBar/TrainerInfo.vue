<template>
    <div class="flex flex-row flex-nowrap text-white gap-1 items-baseline">
        <img
            src="/img/pokeball.png"
            alt="pokeball"
            class="w-4 h-4 self-end"
        >
        <span class="font-bungee uppercase font-bold text-sm">{{ trainer }}</span>
        <span class="font-bungee text-sm font-bold">- 00{{ id }}</span>
    </div>
</template>

<script setup>
import { ref } from "vue";

const trainer = ref(null);
const id = ref(0);

const trainers = ["Alex", "Danny", "Red"];
const ids = [1, 2, 3];

trainer.value = trainers[Math.floor(Math.random() * trainers.length)];
id.value = ids[Math.floor(Math.random() * ids.length)];

</script>