<template>
  <div class="drawer lg:drawer-open">
    <input id="drawer-sidebar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col ">
      <slot />
    </div>
    <div class="drawer-side">
      <label for="drawer-sidebar" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="flex flex-col min-h-full bg-base-200 ">
        <div class="flex items-center bg-base-100 h-12 p-2">
          <h2 class="text-lg font-bold">Menu</h2>
        </div>
        <ul class="menu text-base-content w-80 p-4 grow">
          <li v-for="menu in coreStore.menus">
            <summary v-if="menu.menu_items.length === 0">{{menu.name}}</summary>
            <details v-else :open="false">
              <summary>{{menu.name}}</summary>
              <ul>
                <li v-for="subMenu in menu.menu_items">
                  <summary @click="() => router.push(subMenu.url)">{{subMenu.name}}</summary>
                </li>
              </ul>
            </details>
          </li>
        </ul>
        <div class="flex flex-col justify-center bg-base-200 p-2 border-t border-base-100 gap-4">
          <div class="flex flex-col justify-center items-center gap-1 mt-1">
            <button class="btn btn-xs btn-primary">J'ai besoin d'assistance</button>
            <button class="btn btn-xs btn-primary">Documentation</button>
          </div>
          <span class="text-xs font-bold select-none">Session: <span class="btn btn-xs btn-ghost font-medium">{{userStore.session}}</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const router = useRouter();
const coreStore = useCoreStore();
const userStore = useUserStore();

onMounted(async () => {
  await coreStore.fetchMenus();
});
</script>