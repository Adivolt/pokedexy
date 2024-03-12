<script setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import { ChevronDownIcon,TagIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

defineProps({
  versionOptions: {
    type: Array,
    default: null
  }
});

const emit = defineEmits(["versionSelected"]);

const selectedVersion = ref(null);

function setSelectedVersion(version) {
  emit("versionSelected", version);
  selectedVersion.value = version;
}

</script>

<template>
    <Listbox
        as="div"
        class="relative inline-block text-left"
    >
        <div>
            <ListboxButton
                class="inline-flex w-full justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-800"
            >
                {{ selectedVersion?.name ?? "Official Artwork" }}
                <ChevronDownIcon
                    class="-mr-1 ml-2 h-5 w-5 text-white hover:text-white"
                    aria-hidden="true"
                />
            </ListboxButton>
        </div>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <ListboxOptions
                class="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
                <template
                    v-for="(version) in versionOptions"
                    :key="version.name"
                >
                    <ListboxOption v-slot="{ active }">
                        <button
                            :class="[
                                active ? 'bg-red-500 text-white' : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                            @click="setSelectedVersion(version)"
                        >
                            <TagIcon
                                :active="active"
                                class="mr-2 h-5 w-5 text-red-400 group-hover:text-white"
                                aria-hidden="true"
                            />
                            {{ version.name }}
                        </button>
                    </ListboxOption>
                </template>
            </ListboxOptions>
        </transition>
    </Listbox>
</template>
