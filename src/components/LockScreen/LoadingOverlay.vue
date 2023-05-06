<script setup>

import { ref } from "vue";

const clicked = ref(false);

defineProps({
    "loading": {
        type: Boolean,
        default: true
    }
});
defineEmits(["unlock-button-clicked"]);
</script>

<template>
    <div
        v-show="!clicked"
        class="z-40 absolute inset-0 grid grid-cols-[1fr_30vh_1fr] grid-rows-[1fr_30vh_1fr]"
    >
        <template v-if="loading">
            <div
                class="self-center justify-self-center col-start-2 col-span-1 row-start-2 row-span-1 h-[12vh] w-[12vh] border-black border-[.4em] rounded-full box-border bg-blue-conical-gradient from-cyan-500 to-blue-600 animate-spin"
            />
            <div
                class="z-20 self-center justify-self-center col-start-2 col-span-1 row-start-2 row-span-1 h-[8vh] w-[8vh] border-black border-4 rounded-full box-border bg-white"
            />
        </template>
        <template v-else>
            <div
                class="self-center justify-self-center col-start-2 col-span-1 row-start-2 row-span-1 h-[12vh] w-[12vh] border-black border-[.4em] rounded-full box-border bg-lime-300"
            />
            <div
                class="z-20 self-center justify-self-center col-start-2 col-span-1 row-start-2 row-span-1 h-[8vh] w-[8vh] border-black border-4 rounded-full box-border bg-white"
                @:click.once="$emit('unlock-button-clicked')"
                @click.once="clicked = true"
            />
        </template>
    </div>
</template>

