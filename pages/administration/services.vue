<template>
  <NuxtLayout>
    <SectionFullScreen>
      <CardSection>
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl font-black">Services</h1>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <!-- head -->
              <thead>
                <tr>
                  <th></th>
                  <th>Nom</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="service, index in services">
                  <th>{{index + 1}}</th>
                  <td>{{service.name}}</td>
                  <td>{{service.description}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardSection>
    </SectionFullScreen>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import _ from 'lodash';
import pkg from "~/package.json";

import type { ServiceInterface } from '~/interfaces/ServiceInterface';
import { fetchServices } from '~/composables/api/useServices'

const services = ref([] as ServiceInterface[]);
onMounted(async () => {
  document.title = `Administration services - ${_.capitalize(pkg.name)}`;
  const token = localStorage.getItem('token');
  services.value = await fetchServices(token);
});

definePageMeta({
  title: "Administration - Services",
  middleware: "auth",
});
</script>
