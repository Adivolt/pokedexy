<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon,LanguageIcon } from "@heroicons/vue/24/solid";

defineEmits(["language-selected"]);

const languageOptions = [
  {
    key: "en",
    value: "English"
  },
  {
    key: "ja",
    value: "Japanese"
  },
  {
    key: "fr",
    value: "French"
  },
  {
    key: "de",
    value: "German"
  },
  {
    key: "es",
    value: "Spanish"
  },
  {
    key: "it",
    value: "Italian"
  },
  {
    key: "ko",
    value: "Korean"
  },
  {
    key: "zh-Hans",
    value: "Chinese (Simplified)"
  },
  {
    key: "zh-Hant",
    value: "Chinese (Traditional)"
  }
];

</script>

<template>
    <Menu
        as="div"
        class="relative inline-block text-left"
    >
        <div>
            <MenuButton
                class="inline-flex w-full justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-800"
            >
                Language
                <ChevronDownIcon
                    class="-mr-1 ml-2 h-5 w-5 text-white hover:text-white"
                    aria-hidden="true"
                />
            </MenuButton>
        </div>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems
                class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
                <template
                    v-for="language in languageOptions"
                    :key="language.key"
                >
                    <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                                active ? 'bg-red-500 text-white' : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                            @click="$emit('language-selected', language.key)"
                        >
                            <LanguageIcon
                                :active="active"
                                class="mr-2 h-5 w-5 text-red-400 group-hover:text-white"
                                aria-hidden="true"
                            />
                            {{ language.value }}
                        </button>
                    </MenuItem>
                </template>
            </MenuItems>
        </transition>
    </Menu>
</template>
