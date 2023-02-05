<script setup>
import anime from "animejs";
import { onMounted, ref } from "vue";

const loading = ref(true);
const loading_overlay = ref(null);
const unlocked = ref(false);

onMounted(() => {
    const MIN_TIME = 1;
    const MAX_TIME = 3;

    // generate a random number between 2 - 5
    let random_unlock_time = Math.floor(
        (Math.random() * (MAX_TIME - MIN_TIME) + MIN_TIME) * 1000
    );
    setTimeout(() => {
        loading.value = false;
    }, random_unlock_time);
});

function open_lock_screen() {
    if (!this.loading) {
        loading_overlay.value.remove();

        anime({
            targets: "#top-slide",
            translateY: -500,
            duration: 850,
            easing: "easeOutQuad",
        });

        anime({
            targets: "#bottom-slide",
            translateY: 500,
            duration: 850,
            easing: "easeOutQuad",
            complete: () => {
                this.unlocked = true;
            },
        });
    }
}
</script>

<template>
    <div v-if="loading && !unlocked">
        <div class="fixed inset-0 z-10" :class="unlocked ? 'hidden' : ''">
            <div
                id="top-slide"
                class="absolute box-border inset-x-0 top-0 grid grid-cols-[1fr_30vh_1fr] grid-rows-[1fr_1fr_15vh] h-1/2 bg-[#ff0000]"
            >
                <div
                    class="col-start-1 col-span-1 row-start-1 row-span-1 h-10 w-10 border-t-8 border-l-8 border-red-800 justify-self-start m-3"
                ></div>
                <div
                    class="col-start-3 col-span-1 row-start-1 row-span-1 h-10 w-10 border-t-8 border-r-8 border-red-800 justify-self-end m-3"
                ></div>
                <!-- Upper pokeball Outer -->
                <div
                    class="box-border col-start-2 row-start-3 border-8 border-b-4 border-black rounded-tl-full rounded-tr-full z-10"
                ></div>
                <!-- Upper pokeball Inner -->
                <div
                    class="box-border col-start-2 row-start-3 border-8 border-b-0 border-black rounded-tl-full rounded-tr-full z-20 w-[12vh] h-[6vh] justify-self-center self-end"
                    :class="loading ? 'bg-white' : 'bg-[#00ff00]'"
                ></div>
                <!-- Right and left black bars of the pokeball -->
                <div
                    class="w-100 box-border border-b-4 border-black col-start-1 row-start-3"
                ></div>
                <div
                    class="w-100 box-border border-b-4 border-black col-start-3 row-start-3"
                ></div>
            </div>
            <div
                id="bottom-slide"
                class="absolute box-border inset-x-0 bottom-0 grid grid-cols-[1fr_30vh_1fr] grid-rows-[15vh_1fr_1fr] h-1/2 bg-[#ff0000]"
            >
                <div
                    class="col-start-1 col-span-1 row-start-3 row-span-1 h-10 w-10 border-b-8 border-l-8 border-red-800 self-end justify-self-start m-3"
                ></div>
                <div
                    class="col-start-3 col-span-1 row-start-3 row-span-1 h-10 w-10 border-b-8 border-r-8 border-red-800 self-end m-3 justify-self-end"
                ></div>
                <!-- Lower Pokeball Outer -->
                <div
                    class="box-border col-start-2 row-start-1 border-8 border-t-4 border-black rounded-bl-full rounded-br-full overflow-hidden z-10 bg-white"
                ></div>
                <!-- Lower Pokeball Inner -->
                <div
                    class="box-border col-start-2 row-start-1 border-8 border-t-0 border-black rounded-bl-full rounded-br-full z-10 w-[12vh] h-[6vh] justify-self-center self-start"
                    :class="loading ? 'bg-white' : 'bg-[#00ff00]'"
                ></div>
                <!-- Right and left black bars of the pokeball -->
                <div
                    class="w-100 box-border border-t-4 border-black col-start-1 row-start-1"
                ></div>
                <div
                    class="w-100 box-border border-t-4 border-black col-start-3 row-start-1"
                ></div>
                <!-- Version text -->
                <div
                    class="col-start-2 row-start-3 justify-self-center self-end"
                >
                    <p class="text-[.6em] font-bungee mb-3">SYSTEM: V 1.0.0</p>
                </div>
            </div>

            <div
                ref="loading_overlay"
                class="z-40 absolute inset-0 grid grid-cols-[1fr_30vh_1fr] grid-rows-[1fr_30vh_1fr]"
            >
                <div
                    class="self-center justify-self-center col-start-2 col-span-1 row-start-2 row-span-1 h-[12vh] w-[12vh] border-black border-[.4em] rounded-full box-border"
                    :class="
                        loading
                            ? 'bg-blue-conical-gradient from-cyan-500 to-blue-600 animate-spin'
                            : 'bg-lime-300'
                    "
                ></div>
                <div
                    @:click="open_lock_screen()"
                    class="z-20 self-center justify-self-center col-start-2 col-span-1 row-start-2 row-span-1 h-[8vh] w-[8vh] border-black border-4 rounded-full box-border bg-white"
                ></div>
            </div>
        </div>
    </div>
</template>
