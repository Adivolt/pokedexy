<script setup>
import { onMounted, ref, watch } from "vue";
import { SparklesIcon } from "@heroicons/vue/24/solid";
import TheVersionSelector from "@/components/ImageNavigator/TheVersionSelector.vue";
import FemaleIcon from "@/components/Icons/FemaleIcon.vue";
import MaleIcon from "@/components/Icons/MaleIcon.vue";

const props = defineProps(["sprites"]);
const organizedSprites = ref(null);
const selectedVersion = ref(null);
const selectedImage = ref(null);

onMounted(() =>
{
    organizedSprites.value = sortSprites();
    selectedVersion.value = organizedSprites.value.official_artwork;
    selectedImage.value = selectedVersion.value.front_default;
});

watch(props, () =>
{
    organizedSprites.value = sortSprites();
    selectedVersion.value = organizedSprites.value.official_artwork;
    selectedImage.value = selectedVersion.value.front_default;
});

function sortSprites()
{
    return {
        official_artwork: { ...props.sprites.other["official-artwork"] },
        base: {
            back_default: props.sprites.back_default,
            back_female: props.sprites.back_female,
            back_shiny: props.sprites.back_shiny,
            back_shiny_female: props.sprites.back_shiny_female,
            front_default: props.sprites.front_default,
            front_female: props.sprites.front_female,
            front_shiny: props.sprites.front_shiny,
            front_shiny_female: props.sprites.front_shiny_female
        },
        dream_world: { ...props.sprites.other.dream_world },
        home: { ...props.sprites.other.home },
        g1_red_blue: {
            ...props.sprites.versions["generation-i"]["red-blue"]
        },
        g1_yellow: {
            ...props.sprites.versions["generation-i"]["yellow"]
        },
        g2_gold: {
            ...props.sprites.versions["generation-ii"]["gold"]
        },
        g2_silver: {
            ...props.sprites.versions["generation-ii"]["silver"]
        },
        g2_crystal: {
            ...props.sprites.versions["generation-ii"]["crystal"]
        },
        g3_ruby_sapphire: {
            ...props.sprites.versions["generation-iii"]["ruby-sapphire"]
        },
        g3_emerald: {
            ...props.sprites.versions["generation-iii"]["emerald"]
        },
        g3_firered_leafgreen: {
            ...props.sprites.versions["generation-iii"]["firered-leafgreen"]
        },
        g4_diamond_pearl: {
            ...props.sprites.versions["generation-iv"]["diamond-pearl"]
        },
        g4_heart_gold_soul_silver: {
            ...props.sprites.versions["generation-iv"]["heartgold-soulsilver"]
        },
        g4_platinum: {
            ...props.sprites.versions["generation-iv"]["platinum"]
        },
        // TODO implement static sprites for this generation
        g5_black_white: {
            ...props.sprites.versions["generation-v"]["black-white"][
            "animated"
            ]
        },
        g6_omega_ruby_alpha_saphire: {
            ...props.sprites.versions["generation-vi"][
            "omegaruby-alphasapphire"
            ]
        },
        g6_x_y: {
            ...props.sprites.versions["generation-vi"]["x-y"]
        }
    };
}

// Transform the sprites into manageable categories
</script>

<template>
    <div class="md:flex">
        <div class="md:min-w-[450px] md:max-w-[450px] md:mx-auto">
            <div class="w-full ">
                <img class="rounded shadow w-full max-h-[450px]" :src="selectedImage" alt="front-sprite">
            </div>

            <div class="mt-1 flex w-full overflow-y-scroll snap-x gap-1">
                <template v-for="(sprite, key) in selectedVersion" :key="sprite">
                    <div v-if="sprite"
                        class="snap-start flex-shrink-0 flex-grow-0 w-1/4 flex-shrink-0 relative border border-slate-200 rounded"
                        @click="selectedImage = sprite">
                        <img class="shadow w-full h-full max-h-[110px]" :src="sprite" alt="front-sprite">
                        <div class="absolute top-0 right-0 inline-flex flex-row bg-slate-100 rounded p-0.5 gap-1">
                            <FemaleIcon v-if="key.includes('female')" class="text-pink-500 w-3 h-3" />
                            <MaleIcon v-if="!key.includes('female')" class="text-blue-600 w-3 h-3" />
                            <SparklesIcon v-if="key.includes('shiny')" class="text-yellow-600 w-3 h-3" />
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <div>
            <TheVersionSelector :versions="organizedSprites" @version-selected="(e) => {
                selectedVersion = e;
                selectedImage = e.front_default;
            }
                " />
        </div>
    </div>
</template>
