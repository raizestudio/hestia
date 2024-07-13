<template>
  <NuxtLayout>
    <SectionFullScreen>
      <CardSection>
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl font-black">Dashboard {{_.capitalize(userStore.user.role.name)}}</h1>
          <div class="flex flex-col gap-2">
            <div class="flex flex-col">
              <h3 class="text-lg font-semibold">Statistiques utilisateurs</h3>
              <StatThreeCol :new-users="dashboard.new_users" :new-enterprises="dashboard.new_enterprises" :new-pros="dashboard.new_pros" />
            </div>
            <div class="flex flex-col">
              <h3 class="text-lg font-semibold">Statistiques personelles</h3>
              <!-- <StatThreeColAlt /> -->
            </div>
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

import { fetchDashboard } from "~/composables/api/useDashboard";

const userStore = useUserStore();

const dashboard = ref({} as any)

onMounted(async () => {
  document.title = `${_.capitalize(pkg.name)} - Dashboard`;
  
  const token = localStorage.getItem("token")
  dashboard.value = await fetchDashboard(token)

  console.log(dashboard.value)
});
definePageMeta({
  title: "Dashboard",
  // description: 'Dashboard page',
  // image: '/images/dashboard.png',
  // url: 'https://example.com/dashboard',
  middleware: "auth",
});
</script>
