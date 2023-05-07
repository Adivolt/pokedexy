// mouse.js
import { ref } from "vue";

export function useRandomSecondsInRange(min, max) {

    const minimum = ref(min);
    const maximum = ref(max);
    let random_seconds = ref(0);

    random_seconds.value = Math.floor(
        (Math.random() * (maximum.value - minimum.value) + minimum.value) * 1000
    );

    return random_seconds.value;
}