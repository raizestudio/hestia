<template>
  <div
    :class="
      clsx(
        'w-[200px]',
        themeStore.current === 'light' ? 'bg-light-300' : 'bg-dark-300'
      )
    "
  >
    <div :class="clsx('flex justify-between items-center p-2')">
      <span :class="clsx('font-semibold text', themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100')">Menu</span>
      <ButtonComponent
        :class="
          clsx(
            'rounded-full',
            themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
          )
        "
        padding-class="p-1"
        ><CloseIcon :class="clsx('w-5 rotate-180', themeStore.current === 'light' ? 'fill-dark-200' : 'fill-light-200')"
      /></ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Components
import ButtonComponent from "@/components/button/ButtonComponent.vue";
import SideBarCollapsed from "./SideBarCollapsed.vue";

// Icons
import CloseIcon from "@/components/icons/CloseIcon.vue";

const themeStore = useThemeStore();
</script>
