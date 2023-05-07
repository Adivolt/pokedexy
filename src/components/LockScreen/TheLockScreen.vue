<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import TopHalf from "@/components/LockScreen/TopHalf.vue";
import BottomHalf from "@/components/LockScreen/BottomHalf.vue";
import UnlockButton from "@/components/LockScreen/UnlockButton.vue";
import { useRandomSecondsInRange } from "@/composables/randomSecondsInRange";

const loading = ref(true);
// Generate a loading delay of 1 to 3 seconds using the composable
const loading_delay = useRandomSecondsInRange(1, 3);

const body = document.querySelector("body");

const emit = defineEmits(["unlocked"]);

onMounted(() => {
    // When the delay expires set the loading to false
    setTimeout(() => loading.value = false, loading_delay);

    // Set the body elements overflow to hidden
    body.style.overflow = "hidden";
});

function animate_opening() {

    if (!loading.value) {

        gsap.to("#top-slide", {
            translateY: -500,
            duration: 0.85,
            ease: "power2.in"
        });
        gsap.to("#bottom-slide", {
            translateY: 500,
            duration: 0.85,
            ease: "power2.in"
        }).then(() => {
            emit("unlocked");
            // Set the body elements overflow to hidden
            body.style.overflow = "auto";
        });
    }
}
</script>

<template>
    <div class="fixed inset-0 z-10">
        <TopHalf :loading="loading" />
        <BottomHalf :loading="loading" />
        <UnlockButton
            :loading="loading"
            @button-clicked="animate_opening"
        />
    </div>
</template>
