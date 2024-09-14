<template>
  <footer
    :class="`flex justify-between px-10 py-0.5 ${
      themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
    }`"
  >
    <div>
      <div class="flex items-center gap-1 select-none">
        <div class="flex items-center gap-1">
          <span
            :class="`font-semibold ${
              themeStore.current === 'light'
                ? 'text-dark-100'
                : 'text-light-100'
            }`"
            >{{ capitalize(packageJson.name) }}</span
          >
          <span
            :class="`text-xs ${
              themeStore.current === 'light'
                ? 'text-dark-200'
                : 'text-light-200'
            }`"
            >développé avec
          </span>
        </div>
        <HeartIcon class="w-4 fill-rose-500" />
        <div class="flex items-center">
          <span
            :class="`text-xs ${
              themeStore.current === 'light'
                ? 'text-dark-200'
                : 'text-light-200'
            }`"
            >par {{ capitalize(packageJson.author.name) }}</span
          >
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-2">
        <BadgeComponent :text="`${packageJson.version}`"/>
        <!-- <BadgeComponent :text="`#someinfo`"/> -->
      </div>
      <div>
        <CircleComponent widthClass="w-2.5" heightClass="h-2.5" />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import packageJson from "@/package.json";

// Stores
const themeStore = useThemeStore();

// Helpers
import { capitalize } from "~/helpers/textHelper";

// Components
import BadgeComponent from "~/components/badge/BadgeComponent.vue";
import CircleComponent from "~/components/shape/CircleComponent.vue";

// Icons
import HeartIcon from "~/components/icons/HeartIcon.vue";
</script>
