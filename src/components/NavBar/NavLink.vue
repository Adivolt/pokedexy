<script setup>

defineProps({
    to: {
        type: String,
        required: true
    }
});

</script>

<template>
    <RouterLink
        class="border border-red-500 px-2 py-0.5 rounded"
        :to="to"
    >
        <slot />
    </RouterLink>
</template>