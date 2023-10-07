<script setup>
import { usePokedexStore } from "@/stores/pokedex";
import ChevronDown from "@/components/Icons/ChevronDown.vue";
import { ref } from "vue";

const pokedex = usePokedexStore();
const visible = ref(false);

const toggle = () => {
    visible.value = !visible.value;
};
</script>

<template>
    <div class="flex flex-row flex-nowrap w-1/2 items-center">
        <div class="relative w-full h-full">
            <button
                type="button"
                class="relative w-full h-8 cursor-default rounded-[5px] border border-red-900 bg-white pl-2 pr-5 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500"
                @click="toggle"
            >
                <span class="flex flex-nowrap items-center w-full">
                    <span
                        aria-label="Active"
                        class="h-1 w-1 rounded-full bg-green-400"
                    />
                    <span
                        v-if="pokedex.active_region"
                        class="capitalize text-xs ml-1 truncate text-ellipsis font-bungee font-bold text-gray-600"
                    >
                        {{ pokedex.active_region.name }}
                    </span>
                </span>
                <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1 text-gray-800"
                >
                    <ChevronDown />
                </span>
            </button>
            
            <!-- if the state is open then show the dropdown -->
            <ul
                v-if="visible"
                class="absolute inset-x-0 z-10 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-bungee"
                tabIndex="-1"
                role="listbox"
                aria-labelledby="Pokedex Selector"
                aria-activedescendant="pokedexes"
            >
                <li
                    v-for="region in pokedex.regions"
                    :key="region.name"
                    class="text-gray-900 cursor-default select-none py-1 px-2"
                    @click="
                        pokedex.setRegion(region);
                        visible = false;
                    "
                >
                    <span class="font-normal block truncate text-xs capitalize">
                        {{ region.name }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
