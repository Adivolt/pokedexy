<template>
    <div
        id="bottom-slide"
        class="absolute box-border inset-x-0 bottom-0 grid grid-cols-[1fr_30vh_1fr] grid-rows-[15vh_1fr_1fr] h-1/2 bg-[#ff0000]"
    >
        <div
            class="col-start-1 col-span-1 row-start-3 row-span-1 h-10 w-10 border-b-8 border-l-8 border-red-800 self-end justify-self-start m-3"
        />
        <div
            class="col-start-3 col-span-1 row-start-3 row-span-1 h-10 w-10 border-b-8 border-r-8 border-red-800 self-end m-3 justify-self-end"
        />
        <!-- Lower Pokeball Outer -->
        <div
            class="box-border col-start-2 row-start-1 border-8 border-t-4 border-black rounded-bl-full rounded-br-full overflow-hidden z-10 bg-white"
        />
        <!-- Lower Pokeball Inner -->
        <div
            class="box-border col-start-2 row-start-1 border-8 border-t-0 border-black rounded-bl-full rounded-br-full z-10 w-[12vh] h-[6vh] justify-self-center self-start bg-white"
        />
        <!-- Right and left black bars of the pokeball -->
        <div
            class="w-100 box-border border-t-4 border-black col-start-1 row-start-1"
        />
        <div
            class="w-100 box-border border-t-4 border-black col-start-3 row-start-1"
        />
        <!-- Version text -->
        <div
            class="col-start-2 row-start-3 justify-self-center self-end"
        >
            <p class="text-[.6em] font-bungee mb-3">
                SYSTEM: V 1.0.1
            </p>
        </div>
    </div>
</template>
