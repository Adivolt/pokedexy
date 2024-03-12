<script setup>
import { computed, ref } from "vue";
import TheLanguageSelector from "@/components/TheLanguageSelector.vue";

const props = defineProps({
  flavorTextEntries: {
    type: Array,
    required: true
  }
});

const language = ref("en");

// Process the flavor text entries to remove non-alphanumeric characters,
const processedFlavorTextEntries = computed(() => {
  return props.flavorTextEntries.map((entry) => {

    let uncleanText = entry.flavor_text;
    let cleanText = entry.flavor_text;

    // Only perform the following cleanup for the English language.
    if (entry.language.name === "en") {
      cleanText = uncleanText
          .replace(/[^a-zA-Z0-9é\s]/g, "") // Remove all non-alphanumeric characters, keep accented é
          .replace(/[\n\r]+/g, " ") // Replace all newlines with spaces
          .replace(/<0xad>/g, "-")  // Replace <0xad> with "-"
          .replace(/\f/g, " ")  // Replace Form Feed (Ff) (U+000C) with an empty string
          .toLowerCase();  // Convert to lower case
    }

    // Uppercase the first letter of the clean text.
    cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);

    return {
      language: entry.language.name,
      text: cleanText,
      version: entry.version.name
    };
  });
});

// Filter the processed flavor text entries to only include the selected language.
const flavorTextsForSelectedLanguage = computed(() => {
  return processedFlavorTextEntries.value.filter((flavorText) => {
    return flavorText.language === language.value;
  });
});

</script>

<template>
    <The-language-selector @language-selected="(selectedLanguage) => language = selectedLanguage" />
    <template
        v-for="(flavorText) in flavorTextsForSelectedLanguage"
        :key="flavorText.version"
    >
        <p class="mt-3 font-noto">
            ({{ flavorText.version }}) {{ flavorText.text }}
        </p>
    </template>
</template>
