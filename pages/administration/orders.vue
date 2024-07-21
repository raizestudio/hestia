<template>
  <NuxtLayout>
    <CardSection>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end">
          <div class="grow">
            <h2 class="text-2xl font-bold">Demandes</h2>
            <p class="text-sm opacity-50">Gestion des demandes de l'application</p>
          </div>
        </div>
        <DefaultTable
          :options="quotations"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalQuotations"
          :current-page="currentPage"
          option-key="id"
          url="/quotation/reference/"
          :toggle-modal="() => {}"
          :is-active-action="(id, is_active) => {}"
          :go-next="() => {}"
          :go-prev="() => {}"
          table-class="table-zebra table-pin-cols table-pin-rows table-sm"
          
        />
      </div>
      
    </CardSection>
  </NuxtLayout>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import _ from 'lodash';
import pkg from "~/package.json";

// Composables
import { fetchQuotations } from '~/composables/api/useQuotations';

// Components
import CardSection from '~/components/card/CardSection.vue';
import DefaultTable from '~/components/table/DefaultTable.vue';

// Interfaces
import type { QuotationInterface } from '~/interfaces/QuotationInterface';
import type { TableColumnInterface, TableHeaderInterface } from '~/interfaces/TableInterface';


const quotations = ref([] as QuotationInterface[]);
const selectedQuotations = ref(0);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalQuotations = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewQuotationReference = ref('');

onMounted(async () => {
  const token = localStorage.getItem('token');
  const response: any = await fetchQuotations(token);
  quotations.value = response.results;
  totalQuotations.value = response.count;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
});

const headers: TableHeaderInterface[] = [
  { label: "Actions", field: "actions" },
  { label: "Libellé", field: "label" },
  { label: "Description", field: "description" },
];

const columns: TableColumnInterface[] = [
  {
    labelKey: "actions",
    type: "actions",
  },
  {
    labelKey: "label",
    type: "text",
  },
  {
    labelKey: "description",
    type: "text",
  },
];

definePageMeta({
  title: "Administration - Services",
  middleware: "auth",
});

useSeoMeta({
  title: "Administration - Services",
  description: "Gestion des références de l'application",
});
</script>
