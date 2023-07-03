<template>
    <div
        id="top-slide"
        class="absolute box-border inset-x-0 top-0 grid grid-cols-[1fr_30vh_1fr] grid-rows-[1fr_1fr_15vh] h-1/2 bg-[#ff0000]"
    >
        <div
            class="col-start-1 col-span-1 row-start-1 row-span-1 h-10 w-10 border-t-8 border-l-8 border-red-800 justify-self-start m-3"
        />
        <div
            class="col-start-3 col-span-1 row-start-1 row-span-1 h-10 w-10 border-t-8 border-r-8 border-red-800 justify-self-end m-3"
        />
        <!-- Pokeball Outer -->
        <div
            class="box-border col-start-2 row-start-3 border-8 border-b-4 border-black rounded-tl-full rounded-tr-full z-10"
        />
        <!-- Pokeball Inner -->
        <div
            class="box-border col-start-2 row-start-3 border-8 border-b-0 border-black bg-white rounded-tl-full rounded-tr-full z-20 w-[12vh] h-[6vh] justify-self-center self-end"
        />
        <!-- Right and left black bars of the pokeball -->
        <div
            class="w-100 box-border border-b-4 border-black col-start-1 row-start-3"
        />
        <div
            class="w-100 box-border border-b-4 border-black col-start-3 row-start-3"
        />
    </div>
</template>