<template>
  <NuxtLayout>
    <CardSection>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end">
          <div class="grow">
            <h2 class="text-2xl font-bold">Agences</h2>
            <p class="text-sm opacity-50">Gestion des agences de l'application</p>
          </div>
        </div>
        <DefaultTable
          :options="agencies"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalAgencies"
          :current-page="currentPage"
          option-key="id"
          url="/agency/"
          :toggle-modal="() => {}"
          :is-active-action="(id, is_active) => {}"
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
import { fetchAgencies } from "~/composables/api/useAgencies";

// Components
import CardSection from "~/components/card/CardSection.vue";
import DefaultTable from "~/components/table/DefaultTable.vue";

// Interfaces
import type { AgencyInterface } from "~/interfaces/AgencyInterface";
import type {
  TableHeaderInterface,
  TableColumnInterface,
} from "~/interfaces/TableInterface";

const agencies = ref([] as AgencyInterface[]);
const selectedAgencies = ref(0);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalAgencies = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewAgency = ref("");
const agencySearch = ref("");

onMounted(async () => {
  const token = localStorage.getItem("token");
  const response = await fetchAgencies(String(token));
  console.log(response);
  agencies.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalAgencies.value = response.count;
});

const headers: TableHeaderInterface[] = [
  { label: "Actions", field: "actions" },
  { label: "Nom", field: "name" },
  { label: "Statut legal", field: "legal_status" },
  { label: "Siret", field: "siret" },
  { label: "Siren", field: "siren" },
  { label: "Est active", field: "is_active" },
  { label: "Groupe", field: "group_pro.name" },
  { label: "Membres", field: "members_count" },
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
    labelKey: "is_active",
    type: "boolean",
  },
  {
    labelKey: "group_pro",
    type: "role",
  },
  {
    labelKey: "members_count",
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
  const response: any = await fetchAgencies(token, currentPage.value + 1);
  agencies.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value += 1;
  totalAgencies.value = response.count;
};

const goPrev = async () => {
  const token = localStorage.getItem("token");
  const response: any = await fetchAgencies(token, currentPage.value - 1);
  agencies.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value -= 1;
  totalAgencies.value = response.count;
};

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Administration - Agences",
  description: "Gestion des agences de l'application",
});
</script>
