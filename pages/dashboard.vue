<template>
  <NuxtLayout>
    <SectionFullScreen>
      <CardSection>
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl font-black">
            Dashboard {{ _.capitalize(userStore.user.role.name) }}
          </h1>
          <div class="flex flex-col gap-2">
            <div class="flex flex-col">
              <h3 class="text-lg font-semibold">Statistiques utilisateurs</h3>
              <StatThreeCol
                :new-users="dashboard.new_users"
                :new-enterprises="dashboard.new_enterprises"
                :new-pros="dashboard.new_pros"
                :new-users-week="dashboard.new_users_week"
                :new-users-week-pct="dashboard.new_users_week_pct"
              />
            </div>
            <div class="flex flex-col">
              <h3 class="text-lg font-semibold">Statistiques personelles</h3>
              <!-- <StatThreeColAlt /> -->
            </div>
          </div>
          <div v-if="dashboard.new_users" style="width: 600px; height: 400px">
            <VChart ref="chart" :option="option" />
          </div>
        </div>
      </CardSection>
    </SectionFullScreen>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import pkg from "~/package.json";
import _ from "lodash";
import { VChart } from "#components";


import { fetchDashboard } from "~/composables/api/useDashboard";

const userStore = useUserStore();

const dashboard = ref({} as any);


onMounted(async () => {

  const token = localStorage.getItem("token");
  dashboard.value = await fetchDashboard(token);
  refreshData();
  console.log(dashboard.value);
});

const chart = ref<InstanceType<typeof VChart> | null>(null);

function random() {
  return Math.round(300 + Math.random() * 700) / 10;
}

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
          "Semaine dernière": 1,
          "Cette semaine": dashboard.value?.new_users,
        },
        {
          Label: "Nouveaux admins",
          "Semaine dernière": 1,
          "Cette semaine": dashboard.value?.new_enterprises,

        },
        {
          Label: "Nouveaux pros",
          "Semaine dernière": 1,
          "Cette semaine": dashboard.value?.new_pros,

        },
      ],
    },
    xAxis: { type: "category" },
    yAxis: { type: "value" },
    itemStyle: { borderRadius: 3 },
    series: [{ type: "bar", color: '#ff5861' }, { type: "bar", color: '#00a96e' }],
  };
}

const option = shallowRef(getData());
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
  // description: 'Dashboard page',
  // image: '/images/dashboard.png',
  // url: 'https://example.com/dashboard',
  middleware: "auth",
});

useSeoMeta({
  title: `${_.capitalize(pkg.name)} - Dashboard`,
})
</script>
