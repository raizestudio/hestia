<template>
  <div :class="clsx('w-10 flex flex-col items-center gap-2 py-2', themeStore.current === 'light' ? 'bg-light-300' : 'bg-dark-300')">
    <div>
      <ButtonComponent
        :class="
          clsx(
            'rounded-full',
            themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
          )
        "
        padding-class="p-1"
        @click="menuStore.toggleCollapse"
        ><MenuDotsCirlcle
          :class="
            clsx(
              'w-5 rotate-180',
              themeStore.current === 'light'
                ? 'stroke-dark-200 fill-none'
                : 'stroke-light-200 fill-none'
            )
          "
      /></ButtonComponent>
    </div>
    <div class="flex flex-col items-center gap-4">
      <div v-for="menu in menuStore.menus">
        <component :is="iconMap[menu.icon]" :class="clsx('w-8 h-8', menuStore.activeMenu === menu.label ? 'fill-primary-100' : themeStore.current === 'light' ? 'fill-dark-300' : 'fill-light-300')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Icons
import MenuDotsCirlcle from "@/components/icons/MenuDotsCirlcle.vue";
import DashboardIcon from "@/components/icons/DashboardIcon.vue";
import AdministrationIcon from "@/components/icons/AdministrationIcon.vue";
import SettingsIcon from "@/components/icons/SettingsIcon.vue";

// Stores
const themeStore = useThemeStore();
const menuStore = useMenuStore();

const iconMap: any = {
  DashboardIcon,
  AdministrationIcon,
  SettingsIcon,
};
</script>
