<script setup>
import { ref } from "vue";
import { GlobeAsiaAustraliaIcon } from "@heroicons/vue/20/solid";

defineProps(["versions"]);
defineEmits(["versionSelected"]);
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";

const isOpen = ref(false);

function closeModal() {
    isOpen.value = false;
}

function openModal() {
    isOpen.value = true;
}

function checkVersionIsEmpty(versionSprites) {
    return Object.values(versionSprites).every(
        (sprite) => sprite === null || sprite === ""
    );
}
</script>

<template>
    <div class="font-bungee mt-1 flex w-full justify-end">
        <button
            type="button"
            @click="openModal"
            class="rounded-md bg-blue-500 px-2 py-1 text-xs text-white"
        >
            Select Version
        </button>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        >
                            <DialogTitle
                                as="h3"
                                class="text-lg font-medium leading-6 text-gray-900 font-bungee"
                            >
                                Select Version
                            </DialogTitle>
                            <div class="mt-2">
                                <div class="flex w-ful flex-col gap-1">
                                    <template
                                        v-for="(
                                            versionSprites, key
                                        ) in versions"
                                    >
                                        <button
                                            v-if="
                                                !checkVersionIsEmpty(
                                                    versionSprites
                                                )
                                            "
                                            @click="
                                                $emit(
                                                    'versionSelected',
                                                    versionSprites
                                                );
                                                closeModal();
                                            "
                                            class="bg-blue-500 text-white ga flex w-full items-center rounded-md px-1 py-1 text-xs capitalize font-bungee"
                                        >
                                            <GlobeAsiaAustraliaIcon
                                                class="mr-2 h-4 w-4 text-blue-400"
                                                aria-hidden="true"
                                            />
                                            {{ key.split("_").join(" ") }}
                                        </button>
                                    </template>
                                </div>
                            </div>

                            <div class="mt-4 flex w-full justify-center">
                                <button
                                    type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white"
                                    @click="closeModal"
                                >
                                    Close
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
