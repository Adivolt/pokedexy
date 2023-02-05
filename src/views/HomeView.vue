<script setup>
import { usePokedexStore } from "@/stores/pokedex";

const pokedexStore = usePokedexStore();
</script>

<template>
    <section v-if="pokedexStore.pokemon_data !== ''" class="p-2">
        <div class="flex gap-0.5">
            <img
                class="w-3/4 border border-slate-400 rounded shadow"
                :src="pokedexStore?.pokemon_data?.sprites?.front_default"
                alt="front-sprite"
            />
            <div class="flex w-1/4 h-1/3 gap-0.5 flex-col">
                <img
                    class="w-full h-full border border-slate-400 rounded shadow"
                    :src="pokedexStore?.pokemon_data?.sprites?.back_default"
                    alt="front-sprite"
                />
                <img
                    class="w-full h-1/3 border border-slate-400 rounded shadow"
                    :src="pokedexStore?.pokemon_data?.sprites?.front_shiny"
                    alt="front-sprite"
                />
                <img
                    class="w-full h-1/3 border border-slate-400 rounded shadow"
                    :src="pokedexStore?.pokemon_data?.sprites?.back_shiny"
                    alt="front-sprite"
                />
            </div>
        </div>
        <p class="mt-3">
            {{ pokedexStore?.pokemon_data?.flavor_text_entries[1].flavor_text }}
        </p>
        <!-- TODO: Implement loading state and to prevent rendering warnings, then simplify conditional -->
    </section>
</template>
