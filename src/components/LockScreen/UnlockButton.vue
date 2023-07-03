<script setup>

defineProps({
    "loading": {
        type: Boolean,
        default: true
    }
});
defineEmits(["unlocked"]);
</script>

<template>
    <div class="z-40 absolute inset-0 grid grid-cols-[1fr_30vh_1fr] grid-rows-[1fr_30vh_1fr]">
        <template v-if="loading">
            <!--Outer Ring-->
            <div
                class="self-center justify-self-center col-start-2 col-span-1 row-start-2 row-span-1 h-[12vh] w-[12vh] border-black border-[.4em] rounded-full box-border bg-blue-conical-gradient from-cyan-400 to-blue-700 animate-spin"
            />
            <!--Inner Ring -->
            <div
                class="z-20 self-center justify-self-center col-start-2 col-span-1 row-start-2 row-span-1 h-[8vh] w-[8vh] border-black border-[6px] rounded-full box-border bg-white"
            />
        </template>
        <template v-else>
            <!--Outer Ring-->
            <div
                class="self-center justify-self-center col-start-2 col-span-1 row-start-2 row-span-1 h-[12vh] w-[12vh] border-black border-[.4em] rounded-full box-border bg-lime-300"
            />
            <!-- Outer Ring Ping-->
            <div
                class="self-center justify-self-center col-start-2 col-span-1 row-start-2 row-span-1 h-[10vh] w-[10vh] bg-lime-500 border-lime-400 border-[.5em] rounded-full box-border animate-ping "
            />
            
            <!--Inner Ring -->
            <div
                class="z-20 self-center justify-self-center col-start-2 col-span-1 row-start-2 row-span-1 h-[8vh] w-[8vh] border-black border-[6px] rounded-full box-border bg-white"
                @:click.once="$emit('unlocked')"
            />
        </template>
    </div>
</template>

