import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BasicView from "@/views/BasicView.vue";
import EvolutionView from "@/views/EvolutionView.vue";
import MovesView from "@/views/MovesView.vue";
import StatsView from "@/views/StatsView.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/:id/basic",
            name: "basic",
            component: BasicView
        },
        {
            path: "/:id/evolution",
            name: "evolution",
            component: EvolutionView
        },
        {
            path: "/:id/moves",
            name: "moves",
            component: MovesView
        },
        {
            path: "/:id/stats",
            name: "stats",
            component: StatsView
        },
        // will match everything and put it under `$route.params.pathMatch`
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: NotFound
        }
    ]
});

export default router;
