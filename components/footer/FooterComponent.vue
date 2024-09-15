<template>
  <footer
    :class="`flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start gap-2 sm:gap-0 px-2 md:px-10 py-2 sm:py-0.5 ${
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
    <div class="flex items-center h-full gap-2">
      <div class="flex items-center gap-2">
        <TooltipComponent
          text="Ceci est votre identifiant de session"
          :show="showTooltipSessionId"
          width-class="w-48"
          @mouseover="() => setTooltipSessionId(true)"
          @mouseleave="() => setTooltipSessionId(false)"
        >
          <BadgeComponent
            :text="`${userStore.sessionId}`"
            spanClasses="text-xs-50"
            :isCopyable="true"
            text-copied-success-message="ID session copié avec succès"
          />
        </TooltipComponent>
        <BadgeComponent
          :text="`${packageJson.version}`"
          spanClasses="text-xs-50"
          :isTextSelectable="true"
        />
      </div>
      <div>
        <TooltipComponent
          :text="String(coreStore.apiHealth.latency)"
          :show="showTooltipLatency"
          width-class="w-14"
          tooltip-offset-class="-top-12"
          @mouseover="() => setTooltipLatency(true)"
          @mouseleave="() => setTooltipLatency(false)"
        >
          <CircleComponent
            widthClass="w-2.5"
            heightClass="h-2.5"
            :color="circleColor"
          />
        </TooltipComponent>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import packageJson from "@/package.json";

// Stores
const themeStore = useThemeStore();
const userStore = useUserStore();
const coreStore = useCoreStore();

// Helpers
import { capitalize } from "@/helpers/textHelper";

// Components
import BadgeComponent from "@/components/badge/BadgeComponent.vue";
import CircleComponent from "@/components/shape/CircleComponent.vue";
import TooltipComponent from "@/components/tooltip/TooltipComponent.vue";

// Icons
import HeartIcon from "@/components/icons/HeartIcon.vue";

const showTooltipSessionId = ref(false);
const showTooltipLatency = ref(false);

const circleColor = computed(() => {
  let latencyColor = "";
  if (coreStore.apiHealth.latency >= 0 && coreStore.apiHealth.latency <= 25) {
    latencyColor = "bg-success-100";
  } else if (
    coreStore.apiHealth.latency > 25 &&
    coreStore.apiHealth.latency <= 50
  ) {
    latencyColor = "bg-warning-100";
  } else if (
    coreStore.apiHealth.latency > 50 &&
    coreStore.apiHealth.latency <= 100
  ) {
    latencyColor = "bg-danger-100";
  } else {
    latencyColor = "bg-danger-100";
  }

  return coreStore.apiHealth.isUp ? latencyColor : "bg-danger-100";
});

const setTooltipSessionId = (value: boolean) => {
  showTooltipSessionId.value = value;
};

const setTooltipLatency = (value: boolean) => {
  showTooltipLatency.value = value;
};
</script>
