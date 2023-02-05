import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EvolutionView from "@/views/EvolutionView.vue";
import MovesView from "@/views/MovesView.vue";
import StatsView from "@/views/StatsView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/evolution",
            name: "evolution",
            component: EvolutionView,
        },
        {
            path: "/moves",
            name: "moves",
            component: MovesView,
        },
        {
            path: "/stats",
            name: "Stats",
            component: StatsView,
        },
    ],
});

export default router;
