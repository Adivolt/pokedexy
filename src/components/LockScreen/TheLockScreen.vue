<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import TopHalf from "@/components/LockScreen/TopHalf.vue";
import BottomHalf from "@/components/LockScreen/BottomHalf.vue";
import UnlockButton from "@/components/LockScreen/UnlockButton.vue";
import { useRandomSecondsInRange } from "@/composables/randomSecondsInRange";

const loading = ref(true);
const locked = ref(true);

// Generate a loading delay of 1 to 3 seconds using the composable
const loading_delay = useRandomSecondsInRange(1, 3);

const emit = defineEmits(["unlocked"]);

onMounted(() => {
    // Set the body elements overflow to hidden
    document.querySelector("body").style.overflow = "hidden";
    // When the delay expires set the loading to false
    setTimeout(() => loading.value = false, loading_delay);
});

function unlock() {
    
    locked.value = false;
    sessionStorage.setItem("locked", "false");
    
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
            document.querySelector("body").style.overflow = "auto";
        });
    }
}
</script>

<template>
    <div class="fixed inset-0 z-10">
        <TopHalf />
        <BottomHalf />
        <UnlockButton
            v-if="locked"
            :loading="loading"
            @unlocked="unlock"
        />
    </div>
</template>
