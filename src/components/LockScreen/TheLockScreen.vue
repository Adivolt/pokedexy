<script setup>
import { onMounted, ref } from "vue";
import anime from "animejs";
import TopHalf from "@/components/LockScreen/TopHalf.vue";
import BottomHalf from "@/components/LockScreen/BottomHalf.vue";
import LoadingOverlay from "@/components/LockScreen/LoadingOverlay.vue";

const loading = ref(true);
const unlocked = ref(false);

onMounted(() => {

    // minimum and maximum for random time range
    const MINIMUM = 1;
    const MAXIMUM = 3;

    // Generate a random number of seconds between our defined time range
    let time_to_unlock = Math.floor(
        (Math.random() * (MAXIMUM - MINIMUM) + MINIMUM) * 1000
    );
    // Start a timer using the generated time length
    setTimeout(() => {
        // When done, set "loading" to false
        loading.value = false;
    }, time_to_unlock);
});

function unlock() {

    if (!loading.value) {

        anime({
            targets: "#top-slide",
            translateY: -500,
            duration: 850,
            easing: "easeOutQuad"
        });

        anime({
            targets: "#bottom-slide",
            translateY: 500,
            duration: 850,
            easing: "easeOutQuad",
            complete: () => {
                unlocked.value = true;
            }
        });
    }
}
</script>

<template>
    <div
        v-if="!unlocked"
        class="fixed inset-0 z-10"
        :class="unlocked ? 'hidden' : ''"
    >
        <TopHalf :loading="loading" />
        <BottomHalf :loading="loading" />
        <LoadingOverlay
            :loading="loading"
            @unlock-button-clicked="unlock"
        />
    </div>
</template>
