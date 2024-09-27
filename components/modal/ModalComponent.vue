<template>
  <div class="absolute z-50 h-full" :style="`width: ${wrapperWidth}px`">
    <!-- backdrop -->
    <!-- <div class="absolute w-full h-full bg-dark-100 opacity-80 rounded"></div> -->
    <!-- modal -->
    <div class="absolute w-full h-full flex justify-center items-center">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";
import { onMounted } from "vue";

// Components
import ButtonComponent from "@/components/button/ButtonComponent.vue";

// Icons 
import CloseIcon from "@/components/icons/CloseIcon.vue";

// Stores
const menuStore = useMenuStore();
const modalStore = useModalStore();

const wrapperWidth = ref(0);

const calcWrapperWidth = () => {
  wrapperWidth.value = window.innerWidth - (menuStore.isCollapsed ? 60 : 266);
};

onMounted(() => {
  calcWrapperWidth();
});

window.addEventListener("resize", () => {
  calcWrapperWidth();
});
</script>
