<template>
  <NuxtLayout>
    <div
      :class="
        clsx(
          'flex flex-col grow h-full p-2',
        )
      "
    >
      <div :class="clsx('flex flex-col grow rounded', themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200')">
        <div>
          <span :class="clsx('', themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100')">Dashboard</span>
        </div>
        <div>
          <span :class="clsx('', themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100')">Welcome to the dashboard</span>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import clsx from "clsx";
import packageJson from "@/package.json";

// Helpers
import { capitalize } from "~/utils/textHelper";

// Stores
const themeStore = useThemeStore();

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: `${capitalize(packageJson.name)} - Dashboard`,
});
</script>
