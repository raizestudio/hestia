<template>
  <NuxtLayout>
    <CardSection>
      <DefaultResponsiveModal id="create_service" box-class="max-w-none w-fit">
        <CreateService
          :refresh-action="() => updateAgencySfScope(agencySfScope)"
        />
      </DefaultResponsiveModal>
      <DefaultResponsiveModal id="view_service" box-class="max-w-none">
        <ViewService :service-id="viewAgency" />
      </DefaultResponsiveModal>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end mb-4">
          <SectionTitle title="Agences" :description="loading ? 'Les agences sont en cours de chargement' : 'Gestion des agences de l\'application'" />
          <TableActions
            :current-sf-scope="agencySfScope"
            create-action="create_service.showModal()"
            :selected-rows-count="selectedAgencies.length"
            :refresh-action="(scope: string) => updateAgencySfScope(scope)"
            :update-scope-action="(scope: string) => updateAgencySfScope(scope)"
            :should-disable="shouldDisable"
          />
        </div>
        <TableLoading v-if="loading" />
        <div v-else class="flex flex-col grow">
          <DefaultTable
          v-if="agencies.length > 0"
          :options="agencies"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalAgencies"
          :current-page="currentPage"
          option-key="id"
          url="/services/"
          :toggle-modal="(serviceId) => toggleModal(serviceId)"
          :is-active-action="(id: number, is_active: boolean) => toggleIsActive(id, is_active)"
          :delete-action="(id: number) => delAgency(id)"
          :restore-action="(id: number) => restoreAgency(id)"
          :go-next="goNext" 
          :go-prev="goPrev"
          :update-items-per-page="(itemsPerPage) => updateItemsPerPage(itemsPerPage)"
          :update-selected-rows="(selectedRows: AgencyInterface[]) => selectedAgencies = selectedRows"
          :go-to-page="(page: number) => goToPage(page)"
          table-class="table-zebra table-pin-cols table-pin-rows"
          table-size="xs"
          :should-disable="shouldDisable"
        />
        <div v-else class="flex flex-col items-center mt-10">
          <DocumentMagnifyingGlassIcon class="w-24 h-24" />
          <p class="text-center text-content">Aucun service trouvé</p>
        </div>
        </div>
      </div>      
    </CardSection>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import _ from "lodash";
import pkg from "~/package.json";

// Composables
import { fetchAgencies, partialUpdateAgency, deleteAgency, retrieveAgency } from "~/composables/api/useAgencies";

// Components
import CardSection from "~/components/card/CardSection.vue";
import DefaultTable from "~/components/table/DefaultTable.vue";
import TableActions from "~/components/table/TableActions.vue";
import TableLoading from "~/components/loading/TableLoading.vue";
import SectionTitle from "~/components/title/SectionTitle.vue";
import DefaultResponsiveModal from "~/components/modal/DefaultResponsiveModal.vue";


// Interfaces
import type { AgencyInterface } from "~/interfaces/AgencyInterface";
import type {
  TableHeaderInterface,
  TableColumnInterface,
} from "~/interfaces/TableInterface";

const agencies = ref([] as AgencyInterface[]);
const selectedAgencies = ref([] as AgencyInterface[]);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalAgencies = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewAgency = ref("");
const agencySfScope = ref("");
const agencyExpand = ref('');
const loading = ref(false);
const shouldDisable = ref(false);

onMounted(async () => {
  loading.value = true;
  const token = localStorage.getItem("token");
  const response = await fetchAgencies(String(token));
  console.log(response);
  agencies.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalAgencies.value = response.count;
  loading.value = false;
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
const updateAgencySfScope = async (scope: string) => {
  shouldDisable.value = true;
  agencySfScope.value = scope;
  currentPage.value = 1;
  const token = localStorage.getItem('token');
  const response: any = await fetchAgencies(token, currentPage.value, itemsPerPage.value, agencySfScope.value);
  agencies.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalAgencies.value = response.count;
  shouldDisable.value = false;
};

const goNext = async () => {
  shouldDisable.value = true;
  const token = localStorage.getItem("token");
  const response: any = await fetchAgencies(token, currentPage.value + 1, itemsPerPage.value);
  agencies.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value += 1;
  shouldDisable.value = false;
};

const goPrev = async () => {
  shouldDisable.value = true;
  const token = localStorage.getItem("token");
  const response: any = await fetchAgencies(token, currentPage.value - 1, itemsPerPage.value);
  agencies.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value -= 1;
  shouldDisable.value = false;
};

const toggleIsActive = async (id: number, is_active: boolean) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await partialUpdateAgency(token, id, { is_active: is_active });
  agencies.value = agencies.value.map((agency: AgencyInterface) => {
    if (agency.id === id) {
      agency.is_active = is_active;
    }
    return agency;
  });
  shouldDisable.value = false;
};

const restoreAgency = async (id: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await partialUpdateAgency(token, id, { deleted_at: null });
  agencies.value = agencies.value.map((agency: AgencyInterface) => {
    if (agency.id === id) {
      agency.deleted_at = null;
    }
    return agency;
  });
  updateAgencySfScope(agencySfScope.value);
};

const delAgency = async (id: number,) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await deleteAgency(token, id);
  updateAgencySfScope(agencySfScope.value);

  // services.value = services.value.map((service: ServiceInterface) => {
  //   if (service.id === id) {
  //     service.deleted_at = response.deleted_at;
  //   }

  //   return service;
  // });

};

const updateItemsPerPage = async (updatedItemsPerPage: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  currentPage.value = 1;
  itemsPerPage.value = updatedItemsPerPage;
  const response: any = await fetchAgencies(token, currentPage.value, itemsPerPage.value, agencySfScope.value);
  agencies.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalAgencies.value = response.count;
  shouldDisable.value = false;
};

const toggleModal = (serviceId: string) => {
  viewAgency.value = serviceId;
  const modal: any = document.getElementById("view_service");
  // modal?.showModal();
};

const goToPage = async (page: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  currentPage.value = page;
  const response: any = await fetchAgencies(token, currentPage.value, itemsPerPage.value, agencySfScope.value);
  agencies.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalAgencies.value = response.count;
  shouldDisable.value = false;
};

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Administration - Agences",
  description: "Gestion des agences de l'application",
});
</script>
