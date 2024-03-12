<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { SparklesIcon } from "@heroicons/vue/24/solid";
import TheImageVersionSelector from "@/components/ImageNavigator/TheImageVersionSelector.vue";
import FemaleIcon from "@/components/Icons/FemaleIcon.vue";
import MaleIcon from "@/components/Icons/MaleIcon.vue";

const props = defineProps({
  sprites: {
    type: Object,
    default: null
  },
  genderRate: {
    type: Number,
    default: null,
  }
});

const selectedVersion = ref(null);
const selectedImage = ref(null);

onMounted(() => {
  selectedVersion.value = sortedSprites.value[0];
  selectedImage.value = selectedVersion.value.sprites.front_default;
});

const isGenderLess = computed(() => {return  props.genderRate === -1 });
const sortedSprites = computed(() => {
  return [
    {
      name: "Official Artwork",
      sprites: {...props.sprites.other["official-artwork"]},
    },
    {
      name: "Default",
      sprites: {
        back_default: props.sprites.back_default,
        back_female: props.sprites.back_female,
        back_shiny: props.sprites.back_shiny,
        back_shiny_female: props.sprites.back_shiny_female,
        front_default: props.sprites.front_default,
        front_female: props.sprites.front_female,
        front_shiny: props.sprites.front_shiny,
        front_shiny_female: props.sprites.front_shiny_female
      },
    },
    {
      name: 'Dream World',
      sprites: {...props.sprites.other.dream_world},
    },
    {
      name: "Home",
      sprites: {...props.sprites.other.home},
    },
    {
      name: "Red & Blue",
      sprites: {
        ...props.sprites.versions["generation-i"]["red-blue"]
      },
    },
    {
      name: "Yellow",
      sprites: {
        ...props.sprites.versions["generation-i"]["yellow"]
      },
    },
    {
      name: "Gold",
      sprites: {
        ...props.sprites.versions["generation-ii"]["gold"]
      },
    },
    {
      name: "Silver",
      sprites: {
        ...props.sprites.versions["generation-ii"]["silver"]
      },
    },
    {
      name: "Crystal",
      sprites: {
        ...props.sprites.versions["generation-ii"]["crystal"]
      },
    },
    {
      name: "Ruby & Saphire",
      sprites: {
        ...props.sprites.versions["generation-iii"]["ruby-sapphire"]
      },
    },
    {
      name: "Emerald",
      sprites: {
        ...props.sprites.versions["generation-iii"]["emerald"]
      },
    },
    {
      name: "Firered & Leafgreen",
      sprites: {
        ...props.sprites.versions["generation-iii"]["firered-leafgreen"]
      }
    },
    {
      name: "Diamond & Pearl",
      sprites: {
        ...props.sprites.versions["generation-iv"]["diamond-pearl"]
      }
    },
    {
      name: "Heart Gold & Soul Silver",
      sprites: {
        ...props.sprites.versions["generation-iv"]["heartgold-soulsilver"]
      },
    },
    {
      name: "Platinum",
      sprites: {
        ...props.sprites.versions["generation-iv"]["platinum"]
      },
    },
    {
      name: "Black & White",
      sprites: {
        ...props.sprites.versions["generation-v"]["black-white"]["animated"]
      },
    },
    {
      name: "Omega Ruby & Alpha Saphire",
      sprites: {...props.sprites.versions["generation-vi"]["omegaruby-alphasapphire"]},
    },
    {
      name: "X & Y",
      sprites: {
        ...props.sprites.versions["generation-vi"]["x-y"]
      }
    }
  ];
});

</script>

<template>
    <div class="md:min-w-[450px] md:max-w-[450px] md:mx-auto">
        <div class="relative w-full">
            <img
                class="rounded shadow w-full max-h-[450px]"
                :src="selectedImage"
                alt="selected image"
            >
            <div class="absolute top-0 right-0">
                <TheImageVersionSelector
                    :version-options="sortedSprites"
                    @version-selected="(version) => {
                        selectedVersion = version;
                        selectedImage = version.sprites.front_default;
                    }"
                />
            </div>
        </div>

        <div class="mt-1 flex w-full overflow-y-scroll snap-x gap-1">
            <template
                v-for="(sprite, key) in selectedVersion?.sprites"
                :key="sprite"
            >
                <div
                    v-if="sprite"
                    class="snap-start flex-shrink-0 flex-grow-0 w-1/4 relative border border-slate-200 rounded"
                    @click="selectedImage = sprite"
                >
                    <img
                        class="shadow w-full h-full max-h-[110px]"
                        :src="sprite"
                        alt="front-sprite"
                    >
                    <div class="absolute top-0 right-0 inline-flex flex-row bg-slate-100 rounded p-0.5 gap-1">
                        <FemaleIcon
                            v-if="key.includes('female') && !isGenderLess"
                            class="text-pink-500 w-3 h-3"
                        />
                        <MaleIcon
                            v-if="!key.includes('female') && !isGenderLess"
                            class="text-blue-600 w-3 h-3"
                        />
                        <SparklesIcon
                            v-if="key.includes('shiny')"
                            class="text-yellow-600 w-3 h-3"
                        />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
