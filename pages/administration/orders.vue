<template>
  <NuxtLayout>
    <CardSection>
      <DefaultResponsiveModal id="create_service" box-class="max-w-none w-fit">
        <!-- <CreateService
          :refresh-action="() => updateQuotationSfScope(quotationSfScope)"
        /> -->
      </DefaultResponsiveModal>
      <DefaultResponsiveModal id="view_quotation" box-class="max-w-none">
        <!-- <ViewService :quotation-id="viewQuotation" /> -->
      </DefaultResponsiveModal>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end mb-4">
          <SectionTitle title="Demandes" :description="loading ? 'Les demandes sont en cours de chargement' : 'Gestion des demandes de l\'application'" />
          <TableActions
            :current-sf-scope="quotationSfScope"
            create-action="create_service.showModal()"
            :selected-rows-count="selectedQuotations.length"
            :refresh-action="(scope: string) => updateQuotationSfScope(scope)"
            :update-scope-action="(scope: string) => updateQuotationSfScope(scope)"
            :should-disable="shouldDisable"
          />
        </div>
        <TableLoading v-if="loading" />
        <div v-else class="flex flex-col grow">
          <DefaultTable
          v-if="quotations.length > 0"
          :options="quotations"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalQuotations"
          :current-page="currentPage"
          option-key="id"
          url="/quotations/"
          :toggle-modal="(serviceId) => toggleModal(serviceId)"
          :is-active-action="(id: number, is_active: boolean) => {}"
          :delete-action="(id: number) => delQuotation(id)"
          :restore-action="(id: number) => restoreQuotation(id)"
          :go-next="goNext" 
          :go-prev="goPrev"
          :update-items-per-page="(itemsPerPage) => updateItemsPerPage(itemsPerPage)"
          :update-selected-rows="(selectedRows: QuotationInterface[]) => selectedQuotations = selectedRows"
          :go-to-page="(page: number) => goToPage(page)"
          table-class="table-zebra table-pin-cols table-pin-rows"
          table-size="xs"
          :should-disable="shouldDisable"
        />
        <div v-else class="flex flex-col items-center mt-10">
          <DocumentMagnifyingGlassIcon class="w-24 h-24" />
          <p class="text-center text-content">Aucun devis trouvé</p>
        </div>
        </div>
      </div>
    </CardSection>
  </NuxtLayout>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import _ from 'lodash';
import pkg from "~/package.json";

// Composables
import { fetchQuotations, retrieveQuotation, partialUpdateQuotation, deleteQuotation } from '~/composables/api/useQuotations';

// Components
import CardSection from '~/components/card/CardSection.vue';
import DefaultTable from '~/components/table/DefaultTable.vue';
import TableActions from '~/components/table/TableActions.vue';
import TableLoading from '~/components/loading/TableLoading.vue';
import SectionTitle from '~/components/title/SectionTitle.vue';
import DefaultResponsiveModal from '~/components/modal/DefaultResponsiveModal.vue';
import DocumentMagnifyingGlassIcon from '~/components/assets/icons/DocumentMagnifyingGlassIcon.vue';

// Interfaces
import type { QuotationInterface } from '~/interfaces/QuotationInterface';
import type { TableColumnInterface, TableHeaderInterface } from '~/interfaces/TableInterface';


const quotations = ref([] as QuotationInterface[]);
const selectedQuotations = ref([] as QuotationInterface[]);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalQuotations = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewQuotation = ref('');
const quotationSfScope = ref('');
const quotationExpand = ref('');
const loading = ref(false);
const shouldDisable = ref(false);

onMounted(async () => {
  loading.value = true;
  const token = localStorage.getItem('token');
  const response: any = await fetchQuotations(token);
  quotations.value = response.results;
  totalQuotations.value = response.count;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  loading.value = false;
});

const headers: TableHeaderInterface[] = [
  { label: "Actions", field: "actions" },
  { label: "Libellé", field: "label" },
  { label: "État", field: "state" },
  { label: "Est archivé", field: "deleted_at" },
  { label: "A été restauré", field: "restored_at" },
  { label: "Références", field: "quotation_references" },
  { label: "Crée le", field: "created_at" },
  { label: "Crée par", field: "author.username" },
  { label: "Modifié le", field: "updated_at" },
  { label: "Modifié par", field: "updated_by.username" },
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
    labelKey: "state",
    type: "state",
  },
  {
    labelKey: "deleted_at",
    type: "boolean",
  },
  {
    labelKey: "restored_at",
    type: "boolean",
  },
  {
    labelKey: "quotation_references",
    type: "relation",
    fieldKey: "label"
  },
  {
    labelKey: "created_at",
    type: "date",
    dateType: "full"
  },
  {
    avatarKey: "avatar",
    labelKey: "author",
    type: "user",
  },
  {
    labelKey: "updated_at",
    type: "date",
    dateType: "full"
  },
  {
    avatarKey: "avatar",
    labelKey: "updated_by",
    type: "user",
  },
];

const updateQuotationSfScope = async (scope: string) => {
  shouldDisable.value = true;
  quotationSfScope.value = scope;
  currentPage.value = 1;
  const token = localStorage.getItem('token');
  const response: any = await fetchQuotations(token, currentPage.value, itemsPerPage.value, quotationSfScope.value);
  quotations.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalQuotations.value = response.count;
  shouldDisable.value = false;
};

const goNext = async () => {
  shouldDisable.value = true;
  const token = localStorage.getItem("token");
  const response: any = await fetchQuotations(token, currentPage.value + 1, itemsPerPage.value);
  quotations.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value += 1;
  shouldDisable.value = false;
};

const goPrev = async () => {
  shouldDisable.value = true;
  const token = localStorage.getItem("token");
  const response: any = await fetchQuotations(token, currentPage.value - 1, itemsPerPage.value);
  quotations.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value -= 1;
  shouldDisable.value = false;
};

// const toggleIsActive = async (id: number, is_active: boolean) => {
//   shouldDisable.value = true;
//   const token = localStorage.getItem('token');
//   if (!token) return;
//   const response: any = await partialUpdateService(token, id, { is_active: is_active });
//   quotations.value = quotations.value.map((quotation: QuotationInterface) => {
//     if (quotation.id === id) {
//       quotation.is_active = is_active;
//     }
//     return quotation;
//   });
//   shouldDisable.value = false;
// };

const restoreQuotation = async (id: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await partialUpdateQuotation(token, id, { deleted_at: null });
  quotations.value = quotations.value.map((quotation: QuotationInterface) => {
    if (quotation.id === id) {
      quotation.deleted_at = null;
    }
    return quotation;
  });
  updateQuotationSfScope(quotationSfScope.value);
};

const delQuotation = async (id: number,) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await deleteQuotation(token, id);
  updateQuotationSfScope(quotationSfScope.value);

  // quotations.value = quotations.value.map((quotation: ServiceInterface) => {
  //   if (quotation.id === id) {
  //     quotation.deleted_at = response.deleted_at;
  //   }

  //   return quotation;
  // });

};

const updateItemsPerPage = async (updatedItemsPerPage: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  currentPage.value = 1;
  itemsPerPage.value = updatedItemsPerPage;
  const response: any = await fetchQuotations(token, currentPage.value, itemsPerPage.value, quotationSfScope.value);
  quotations.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalQuotations.value = response.count;
  shouldDisable.value = false;
};

const toggleModal = (serviceId: string) => {
  viewQuotation.value = serviceId;
  const modal: any = document.getElementById("view_service");
  modal?.showModal();
};

const goToPage = async (page: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  currentPage.value = page;
  const response: any = await fetchQuotations(token, currentPage.value, itemsPerPage.value, quotationSfScope.value);
  quotations.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalQuotations.value = response.count;
  shouldDisable.value = false;
};

definePageMeta({
  title: "Administration - Demandes",
  middleware: "auth",
});

useSeoMeta({
  title: "Administration - Demandes",
  description: "Gestion des références de l'application",
});
</script>
