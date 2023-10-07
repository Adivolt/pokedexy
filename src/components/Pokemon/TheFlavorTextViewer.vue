<script setup>
import { computed } from "vue";

const props = defineProps({
    flavorTextEntries: {
        type: Array,
        required: true
    }
});

const processedFlavorTextEntries = computed(() => {
    return props.flavorTextEntries.map((entry) => {
        
        let uncleanText = entry.flavor_text;
        let cleanText = uncleanText
            .replace(/[^a-zA-Z0-9\s]/g, "") // Remove all non-alphanumeric characters
            .replace(/[\n\r]+/g, " ") // Replace all newlines with spaces
            .replace(/<0xad>/g, "-")  // Replace <0xad> with "-"
            .replace(/\f/g, "")  // Replace Form Feed (Ff) (U+000C) with an empty string
            .toLowerCase();  // Convert to lower case
        
        return {
            language: entry.language.name,
            text: cleanText,
            version: entry.version.name
        };
    });
});

</script>

<template>
    <template v-for="(flavorText,index) in processedFlavorTextEntries">
        <p class="mt-3 font-bold md:text-center">
            {{ index }} - ({{ flavorText.language }}) ({{ flavorText.version }}) {{ flavorText.text }}
        </p>
    </template>
</template>
