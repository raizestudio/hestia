<template>
  <div :class="clsx('flex flex-col grow gap-2 px-2 py-1')">
    <div :class="clsx('flex flex-col grow gap-1')">
      <SideBarMenuItem
      v-for="menu in menuStore.menus"
      :key="menu.label"
      :label="menu.label"
      :description="menu.description"
      :url="menu.url"
      :icon="menu.icon"
    />
    </div>
    <div class="">
      Sidebar footer
    </div>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Components
import SideBarMenuItem from "./SideBarMenuItem.vue";

// Stores
const menuStore = useMenuStore();
</script>
