<template>
  <NuxtLayout>
    <div :class="clsx('flex flex-col grow rounded')">
      <div class="p-2">
        <SectionTitle :title="`Dashboard de ${userStore.user.first_name}`" />
        <!-- <span
          :class="
            clsx(
              'text-xl font-bold',
              themeStore.current === 'light'
                ? 'text-dark-100'
                : 'text-light-100'
            )
          "
          >Dashboard de {{ userStore.user.first_name }}</span
        > -->
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <div :class="clsx('p-1 rounded', themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200')">
          <span :class="clsx('font-semibold', themeStore.current === 'light' ? 'text-dark-200' : 'text-light-200')">Nouveaux utilisateurs</span>
          <div style="width: 100%; height: 300px">
            <VChart ref="chart" :option="option" :autoresize="true" />
          </div>
        </div>
        <div :class="clsx('p-1 rounded', themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200')">
          <span :class="clsx('font-semibold', themeStore.current === 'light' ? 'text-dark-200' : 'text-light-200')">Nouvelles commandes</span>
          <div style="width: 100%; height: 300px">
            <VChart ref="chart" :option="optionNewOrders" :autoresize="true" />
          </div>
        </div>
        <div :class="clsx('p-1 rounded', themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200')">
          <span :class="clsx('font-semibold', themeStore.current === 'light' ? 'text-dark-200' : 'text-light-200')">Réclamations</span>
          <div style="width: 100%; height: 300px">
            <VChart ref="chart" :option="option" :autoresize="true" />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 mt-4">
        <div :class="clsx('p-1 rounded', themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200')">
          <span :class="clsx('font-semibold', themeStore.current === 'light' ? 'text-dark-200' : 'text-light-200')">Encore de la donnée</span>
          <div style="width: 100%; height: 300px">
            <VChart ref="chart" :option="option" :autoresize="true" />
          </div>
        </div>
        <div :class="clsx('p-1 rounded', themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200')">
          <span :class="clsx('font-semibold', themeStore.current === 'light' ? 'text-dark-200' : 'text-light-200')">Et là aussi</span>
          <div style="width: 100%; height: 300px">
            <VChart ref="chart" :option="option" :autoresize="true" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import clsx from "clsx";
import packageJson from "@/package.json";
import { VChart } from "#components";

// Helpers
import { capitalize } from "@/utils/textHelper";

// Components
import SectionTitle from "@/components/section/SectionTitle.vue";

// Stores
const userStore = useUserStore();
const themeStore = useThemeStore();

const chart = ref<InstanceType<typeof VChart> | null>(null);

function getData(): ECOption {
  return {
    animation: true,
    tooltip: {
      className: "echarts-tooltip",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {},
        saveAsImage: {},
      },
    },
    dataset: {
      dimensions: ["Label", "Semaine dernière", "Cette semaine"],
      source: [
        {
          Label: "Nouveaux utilisateurs",
          "Semaine dernière": 10,
          "Cette semaine": 2,
        },
        {
          Label: "Nouveaux admins",
          "Semaine dernière": 1,
          "Cette semaine": 5,
        },
        {
          Label: "Nouveaux pros",
          "Semaine dernière": 6,
          "Cette semaine": 20,
        },
      ],
    },
    xAxis: { type: "category" },
    yAxis: { type: "value" },
    itemStyle: { borderRadius: 3 },
    series: [
      { type: "bar", color: "#ff5861" },
      { type: "bar", color: "#00a96e" },
    ],
  };
}

function getDataNewOrders(): ECOption {
  return {
    animation: true,
    tooltip: {
      className: "echarts-tooltip",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {},
        saveAsImage: {},
      },
    },
    dataset: {
      dimensions: ["Label", "Semaine dernière", "Cette semaine"],
      source: [
        {
          Label: "Nouvelles commandes",
          "Semaine dernière": 10,
          "Cette semaine": 2,
        },
        {
          Label: "Nouveaux admins",
          "Semaine dernière": 1,
          "Cette semaine": 5,
        },
        {
          Label: "Nouveaux pros",
          "Semaine dernière": 6,
          "Cette semaine": 20,
        },
      ],
    },
    xAxis: { type: "category" },
    yAxis: { type: "value" },
    itemStyle: { borderRadius: 3 },
    series: [
      { type: "line", color: "#ff5861" },
      { type: "line", color: "#00a96e" },
    ],
  };
}

const option = shallowRef(getData());
const optionNewOrders = shallowRef(getDataNewOrders());

function refreshData() {
  option.value = getData();
}

function hideToolbox() {
  chart.value?.setOption({ toolbox: { show: false } });
}
function showToolbox() {
  chart.value?.setOption({ toolbox: { show: true } });
}

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: `${capitalize(packageJson.name)} - Dashboard`,
});
</script>
