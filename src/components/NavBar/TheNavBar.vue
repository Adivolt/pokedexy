<script setup>
import NavLink from "@/components/NavBar/NavLink.vue";
</script>

<template>
    <footer
        class="bg-slate-800 fixed inset-x-0 bottom-0 py-3 px-1 border-t-2 border-blue-500"
    >
        <nav
            class="flex justify-between font-bungee text-xs text-red-500"
        >
            <NavLink to="/basic">
                Basic
            </NavLink>
            <NavLink to="/evolution">
                Evolution
            </NavLink>
            <NavLink to="/moves">
                Moves
            </NavLink>
            <NavLink to="/stats">
                Stats
            </NavLink>
        </nav>
    </footer>
</template>