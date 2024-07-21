<template>
  <NuxtLayout>
    <CardSection>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end">
          <div class="grow">
            <h2 class="text-2xl font-bold">Références de devis</h2>
            <p class="text-sm opacity-50">Gestion des références de devis de l'application</p>
          </div>
        </div>
        <DefaultTable
          :options="quotationReferences"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalQuotationReferences"
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
import { fetchQuotationReferences } from '~/composables/api/useQuotations';

// Components
import CardSection from '~/components/card/CardSection.vue';
import DefaultTable from '~/components/table/DefaultTable.vue';

// Interfaces
import type { QuotationReferenceInterface } from '~/interfaces/QuotationInterface';
import type { TableColumnInterface, TableHeaderInterface } from '~/interfaces/TableInterface';


const quotationReferences = ref([] as QuotationReferenceInterface[]);
const selectedQuotationReferences = ref(0);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalQuotationReferences = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewQuotationReference = ref('');

onMounted(async () => {
  const token = localStorage.getItem('token');
  const response: any = await fetchQuotationReferences(token);
  quotationReferences.value = response.results;
  totalQuotationReferences.value = response.count;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
});

const headers: TableHeaderInterface[] = [
  { label: "Actions", field: "actions" },
  { label: "Libellé", field: "label" },
  { label: "Description", field: "description" },
  { label: "Service", field: "service.name" },
  { label: "Lieux", field: "place.name" },
  { label: "Périmètre", field: "quotation_reference_scope.id" },
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
  {
    labelKey: "service",
    type: "label",
  },
  {
    labelKey: "place",
    type: "label",
  },
  {
    labelKey: "quotation_reference_scope",
    type: "scope",
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
