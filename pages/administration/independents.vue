<template>
  <NuxtLayout>
    <CardSection>
      <DefaultResponsiveModal id="create_service" box-class="max-w-none w-fit">
        <!-- <CreateService
          :refresh-action="() => updateIndependentSfScope(independentSfScope)"
        /> -->
      </DefaultResponsiveModal>
      <DefaultResponsiveModal id="view_service" box-class="max-w-none">
        <!-- <ViewService :service-id="viewIndependent" /> -->
      </DefaultResponsiveModal>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end mb-4">
          <SectionTitle title="Indépendants" :description="loading ? 'Les indépendants sont en cours de chargement' : 'Gestion des indépendants de l\'application'" />
          <TableActions
            :current-sf-scope="independentSfScope"
            create-action="create_service.showModal()"
            :selected-rows-count="selectedIndependents.length"
            :refresh-action="(scope: string) => updateIndependentSfScope(scope)"
            :update-scope-action="(scope: string) => updateIndependentSfScope(scope)"
            :should-disable="shouldDisable"
          />
        </div>
        <TableLoading v-if="loading" />
        <div v-else class="flex flex-col grow">
          <DefaultTable
          v-if="independents.length > 0"
          :options="independents"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalIndependents"
          :current-page="currentPage"
          option-key="id"
          url="/services/"
          :toggle-modal="(independentId) => toggleModal(independentId)"
          :is-active-action="(independentId: number, is_active: boolean) => toggleIsActive(independentId, is_active)"
          :delete-action="(independentId: number) => delIndependent(independentId)"
          :restore-action="(independentId: number) => restoreIndependent(independentId)"
          :go-next="goNext" 
          :go-prev="goPrev"
          :update-items-per-page="(itemsPerPage) => updateItemsPerPage(itemsPerPage)"
          :update-selected-rows="(selectedRows: IndependentInterface[]) => selectedIndependents = selectedRows"
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
      <!-- <div ref="containerRef" class="flex flex-col h-full">
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
       -->
    </CardSection>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import _ from "lodash";
import pkg from "~/package.json";

// Composables
import { fetchIndependents, retrieveIndependent, createIndependent, partialUpdateIndependent, deleteIndependent } from "~/composables/api/useIndependents";

// Components
import CardSection from "~/components/card/CardSection.vue";
import DefaultTable from "~/components/table/DefaultTable.vue";
import TableActions from "~/components/table/TableActions.vue";
import TableLoading from "~/components/loading/TableLoading.vue";
import SectionTitle from "~/components/title/SectionTitle.vue";
import DefaultResponsiveModal from "~/components/modal/DefaultResponsiveModal.vue";

// Interfaces
import type { IndependentInterface } from "~/interfaces/IndependentInterface";
import type {
  TableHeaderInterface,
  TableColumnInterface,
} from "~/interfaces/TableInterface";

const independents = ref([] as IndependentInterface[]);
const selectedIndependents = ref([] as IndependentInterface[]);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalIndependents = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewIndependent = ref("");
const independentSfScope = ref("");
const independentExpand = ref(false);
const loading = ref(false);
const shouldDisable = ref(false);

onMounted(async () => {
  loading.value = true;
  const token = localStorage.getItem("token");
  const response = await fetchIndependents(String(token));
  console.log(response);
  independents.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalIndependents.value = response.count;
  loading.value = false;
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

const updateIndependentSfScope = async (scope: string) => {
  shouldDisable.value = true;
  independentSfScope.value = scope;
  currentPage.value = 1;
  const token = localStorage.getItem('token');
  const response: any = await fetchIndependents(token, currentPage.value, itemsPerPage.value, independentSfScope.value);
  independents.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalIndependents.value = response.count;
  shouldDisable.value = false;
};

const goNext = async () => {
  shouldDisable.value = true;
  const token = localStorage.getItem("token");
  const response: any = await fetchIndependents(token, currentPage.value + 1, itemsPerPage.value);
  independents.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value += 1;
  shouldDisable.value = false;
};

const goPrev = async () => {
  shouldDisable.value = true;
  const token = localStorage.getItem("token");
  const response: any = await fetchIndependents(token, currentPage.value - 1, itemsPerPage.value);
  independents.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value -= 1;
  shouldDisable.value = false;
};

const toggleIsActive = async (id: number, is_active: boolean) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await partialUpdateIndependent(token, id, { is_active: is_active });
  independents.value = independents.value.map((independent: IndependentInterface) => {
    if (independent.id === id) {
      independent.is_active = is_active;
    }
    return independent;
  });
  shouldDisable.value = false;
};

const restoreIndependent = async (id: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await partialUpdateIndependent(token, id, { deleted_at: null });
  independents.value = independents.value.map((independent: IndependentInterface) => {
    if (independent.id === id) {
      independent.deleted_at = null;
    }
    return independent;
  });
  updateIndependentSfScope(independentSfScope.value);
};

const delIndependent = async (id: number,) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await deleteIndependent(token, id);
  updateIndependentSfScope(independentSfScope.value);

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
  const response: any = await fetchIndependents(token, currentPage.value, itemsPerPage.value, independentSfScope.value);
  independents.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalIndependents.value = response.count;
  shouldDisable.value = false;
};

const toggleModal = (serviceId: string) => {
  viewIndependent.value = serviceId;
  const modal: any = document.getElementById("view_service");
  modal?.showModal();
};

const goToPage = async (page: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  currentPage.value = page;
  const response: any = await fetchIndependents(token, currentPage.value, itemsPerPage.value, independentSfScope.value);
  independents.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalIndependents.value = response.count;
  shouldDisable.value = false;
};

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Administration - Indépendants",
  description: "Gestion des indépendants de l'application",
});
</script>
