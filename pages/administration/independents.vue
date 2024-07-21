<template>
  <NuxtLayout>
    <CardSection>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end">
          <div class="grow">
            <h2 class="text-2xl font-bold">Indépendants</h2>
            <p class="text-sm opacity-50">Gestion des indépendants de l'application</p>
          </div>
        </div>
        <DefaultTable
          :options="independents"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalIndependents"
          :current-page="currentPage"
          option-key="id"
          url="/independent/"
          :toggle-modal="() => {}"
          :go-next="goNext"
          :go-prev="goPrev"
          table-class="table-zebra table-pin-cols table-pin-rows table-sm"
        />
      </div>
      
    </CardSection>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import _ from "lodash";
import pkg from "~/package.json";

// Composables
import { fetchIndependents } from "~/composables/api/useIndependents";

// Components
import CardSection from "~/components/card/CardSection.vue";
import DefaultTable from "~/components/table/DefaultTable.vue";

// Interfaces
import type { AgencyInterface } from "~/interfaces/AgencyInterface";
import type {
  TableHeaderInterface,
  TableColumnInterface,
} from "~/interfaces/TableInterface";

const independents = ref([] as AgencyInterface[]);
const selectedIndependents = ref(0);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalIndependents = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewIndependent = ref("");
const independentSearch = ref("");

onMounted(async () => {
  const token = localStorage.getItem("token");
  const response = await fetchIndependents(String(token));
  console.log(response);
  independents.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalIndependents.value = response.count;
});

const headers: TableHeaderInterface[] = [
  { label: "Actions", field: "actions" },
  { label: "Nom", field: "name" },
  { label: "Statut legal", field: "legal_status" },
  { label: "Siret", field: "siret" },
  { label: "Siren", field: "siren" },
  { label: "Date création", field: "creation_date" },
  { label: "Membre depuis le", field: "created_at" },
  { label: "Mis à jour le", field: "updated_at" },

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
    labelKey: "legal_status",
    type: "text",
  },
  {
    labelKey: "siret",
    type: "text",
  },
  {
    labelKey: "siren",
    type: "text",
  },
  {
    labelKey: "creation_date",
    type: "date",
  },
  {
    labelKey: "created_at",
    type: "date",
  },
  {
    labelKey: "updated_at",
    type: "date",
  },
];

const goNext = async () => {
  const token = localStorage.getItem("token");
  const response: any = await fetchIndependents(token, currentPage.value + 1);
  independents.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value += 1;
  totalIndependents.value = response.count;
};

const goPrev = async () => {
  const token = localStorage.getItem("token");
  const response: any = await fetchIndependents(token, currentPage.value - 1);
  independents.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value -= 1;
  totalIndependents.value = response.count;
};

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Administration - Indépendants",
  description: "Gestion des indépendants de l'application",
});
</script>
