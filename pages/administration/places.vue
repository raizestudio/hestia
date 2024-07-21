<template>
  <NuxtLayout>
    <CardSection>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end">
          <div class="grow">
            <h2 class="text-2xl font-bold">Lieux</h2>
            <p class="text-sm opacity-50">Gestion des lieux de l'application</p>
          </div>
        </div>
        <DefaultTable
          :options="places"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalPlaces"
          :current-page="currentPage"
          option-key="id"
          url="/services/"
          :toggle-modal="() => {}"
          :is-active-action="(id: string | number, is_active: boolean) => toggleIsActive(id, is_active)"
          :go-next="() => {}" 
          :go-prev="() => {}"
          table-class="table-zebra table-pin-cols table-pin-rows table-xs"
        />
      </div>
      
    </CardSection>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import _, { has } from 'lodash';
import pkg from "~/package.json";

// Interfaces
import type { ServiceInterface } from '~/interfaces/ServiceInterface';
import type { TableColumnInterface, TableHeaderInterface } from '~/interfaces/TableInterface';

// Composables
import { fetchPlaces } from '~/composables/api/usePlaces'

// Components
import CardSection from '~/components/card/CardSection.vue';
import DefaultTable from '~/components/table/DefaultTable.vue';

const places = ref([] as ServiceInterface[]);
const selectedPlaces = ref([] as ServiceInterface[]);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalPlaces = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewPlace = ref('');

onMounted(async () => {
  document.title = `Administration lieux - ${_.capitalize(pkg.name)}`;
  const token = localStorage.getItem('token');
  const response: any = await fetchPlaces(token);
  places.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalPlaces.value = response.count;
});

const headers: TableHeaderInterface[] = [
  { label: "Actions", field: "actions" },
  { label: "Name", field: "name" },
  { label: "Description", field: "description" },
];

const columns: TableColumnInterface[] = [
  {
    labelKey: "actions",
    type: "actions",
  },
  {
    labelKey: "name",
    type: "text",
  },
  {
    labelKey: "description",
    type: "text",
  },
];

const toggleIsActive = async (id: string | number, is_active: boolean) => {
  const token = localStorage.getItem('token');
  // const response: any = await partialUpdateService(token, id, { is_active: !is_active });
  // if (response) {
  //   const index = services.value.findIndex((service) => service.id === id);
  //   services.value[index].is_active = !is_active;
  // }
};

definePageMeta({
  title: "Administration - Services",
  middleware: "auth",
});
</script>
