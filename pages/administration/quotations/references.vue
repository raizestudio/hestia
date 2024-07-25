<template>
  <NuxtLayout>
    <CardSection>
      <DefaultResponsiveModal id="create_service" box-class="max-w-none w-fit">
        <!-- <CreateService
          :refresh-action="() => updateQuotationReferenceSfScope(quotationReferenceSfScope)"
        /> -->
      </DefaultResponsiveModal>
      <DefaultResponsiveModal id="view_service" box-class="max-w-none">
        <!-- <ViewService :asset-id="viewService" /> -->
      </DefaultResponsiveModal>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end mb-4">
          <SectionTitle title="Références de devis" :description="loading ? 'Les références de devis sont en cours de chargement' : 'Gestion des références de devis de l\'application'" />
          <TableActions
            :current-sf-scope="quotationReferenceSfScope"
            create-action="create_service.showModal()"
            :selected-rows-count="selectedQuotationReferences.length"
            :refresh-action="(scope: string) => updateQuotationReferenceSfScope(scope)"
            :update-scope-action="(scope: string) => updateQuotationReferenceSfScope(scope)"
            :should-disable="shouldDisable"
          />
        </div>
        <TableLoading v-if="loading" />
        <div v-else class="flex flex-col grow">
          <DefaultTable
          v-if="quotationReferences.length > 0"
          :options="quotationReferences"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalQuotationReferences"
          :current-page="currentPage"
          option-key="id"
          url="/quotationReferences/"
          :toggle-modal="(quotationReferenceId) => toggleModal(quotationReferenceId)"
          :is-active-action="(quotationReferenceId: number, is_active: boolean) => toggleIsActive(quotationReferenceId, is_active)"
          :delete-action="(quotationReferenceId: number) => delQuotationReference(quotationReferenceId)"
          :restore-action="(quotationReferenceId: number) => restoreQuotationReference(quotationReferenceId)"
          :go-next="goNext" 
          :go-prev="goPrev"
          :update-items-per-page="(itemsPerPage) => updateItemsPerPage(itemsPerPage)"
          :update-selected-rows="(selectedRows: QuotationReferenceInterface[]) => selectedQuotationReferences = selectedRows"
          :go-to-page="(page: number) => goToPage(page)"
          table-class="table-zebra table-pin-cols table-pin-rows"
          table-size="xs"
          :should-disable="shouldDisable"
        />
        <NoItemsTable v-else />
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
import { fetchQuotationReferences, partialUpdateQuotationReference, deleteQuotationReference } from '~/composables/api/useQuotations';

// Components
import CardSection from '~/components/card/CardSection.vue';
import DefaultTable from '~/components/table/DefaultTable.vue';
import DefaultResponsiveModal from '~/components/modal/DefaultResponsiveModal.vue';
import TableActions from '~/components/table/TableActions.vue';
import TableLoading from '~/components/loading/TableLoading.vue';
import NoItemsTable from '~/components/noop/NoItemsTable.vue';
import SectionTitle from '~/components/title/SectionTitle.vue';

// Interfaces
import type { QuotationReferenceInterface } from '~/interfaces/QuotationInterface';
import type { TableColumnInterface, TableHeaderInterface } from '~/interfaces/TableInterface';


const quotationReferences = ref([] as QuotationReferenceInterface[]);
const selectedQuotationReferences = ref([] as QuotationReferenceInterface[]);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalQuotationReferences = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewQuotationReference = ref('');
const quotationReferenceSfScope = ref('');
const quotationReferenceExpand = ref('');
const loading = ref(false);
const shouldDisable = ref(false);

onMounted(async () => {
  loading.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await fetchQuotationReferences(token, currentPage.value, itemsPerPage.value, quotationReferenceSfScope.value);
  quotationReferences.value = response.results;
  totalQuotationReferences.value = response.count;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  loading.value = false;
});

const headers: TableHeaderInterface[] = [
  { label: "Actions", field: "actions" },
  { label: "Libellé", field: "label" },
  { label: "Service", field: "quotationReference.name" },
  { label: "Actifs", field: "asset.name" },
  { label: "Montant", field: "asset.name" },
  { label: "Périmètre", field: "quotation_reference_scope.id" },
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
    labelKey: "service",
    type: "label",
  },
  {
    labelKey: "asset",
    type: "label",
  },
  {
    labelKey: "amount",
    type: "price",
    currencyKey: "currency"
  },
  {
    labelKey: "quotation_reference_scope",
    type: "scope",
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
    avatarKey: "updated_by.avatar",
    labelKey: "updated_by",
    type: "user",
  }
];

const updateQuotationReferenceSfScope = async (scope: string) => {
  shouldDisable.value = true;
  quotationReferenceSfScope.value = scope;
  currentPage.value = 1;
  const token = localStorage.getItem('token');
  const response: any = await fetchQuotationReferences(token, currentPage.value, itemsPerPage.value, quotationReferenceSfScope.value);
  quotationReferences.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalQuotationReferences.value = response.count;
  shouldDisable.value = false;
};

const goNext = async () => {
  shouldDisable.value = true;
  const token = localStorage.getItem("token");
  const response: any = await fetchQuotationReferences(token, currentPage.value + 1, itemsPerPage.value);
  quotationReferences.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value += 1;
  shouldDisable.value = false;
};

const goPrev = async () => {
  shouldDisable.value = true;
  const token = localStorage.getItem("token");
  const response: any = await fetchQuotationReferences(token, currentPage.value - 1, itemsPerPage.value);
  quotationReferences.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value -= 1;
  shouldDisable.value = false;
};


const toggleIsActive = async (id: number, is_active: boolean) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await partialUpdateQuotationReference(token, id, { is_active: is_active });
  quotationReferences.value = quotationReferences.value.map((quotationReference: QuotationReferenceInterface) => {
    if (quotationReference.id === id) {
      quotationReference.is_active = is_active;
    }
    return quotationReference;
  });
  shouldDisable.value = false;
};

const restoreQuotationReference = async (id: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await partialUpdateQuotationReference(token, id, { deleted_at: null });
  quotationReferences.value = quotationReferences.value.map((quotationReference: QuotationReferenceInterface) => {
    if (quotationReference.id === id) {
      quotationReference.deleted_at = null;
    }
    return quotationReference;
  });
  updateQuotationReferenceSfScope(quotationReferenceSfScope.value);
};

const delQuotationReference = async (id: number,) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await deleteQuotationReference(token, id);
  updateQuotationReferenceSfScope(quotationReferenceSfScope.value);

  // quotationReferences.value = quotationReferences.value.map((quotationReference: QuotationReference) => {
  //   if (quotationReference.id === id) {
  //     quotationReference.deleted_at = response.deleted_at;
  //   }

  //   return quotationReference;
  // });

};

const updateItemsPerPage = async (updatedItemsPerPage: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  currentPage.value = 1;
  itemsPerPage.value = updatedItemsPerPage;
  const response: any = await fetchQuotationReferences(token, currentPage.value, itemsPerPage.value, quotationReferenceSfScope.value);
  quotationReferences.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalQuotationReferences.value = response.count;
  shouldDisable.value = false;
};

const toggleModal = (serviceId: string) => {
  viewQuotationReference.value = serviceId;
  const modal: any = document.getElementById("view_quotation_reference");
  // modal?.showModal();
};

const goToPage = async (page: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  currentPage.value = page;
  const response: any = await fetchQuotationReferences(token, currentPage.value, itemsPerPage.value, quotationReferenceSfScope.value);
  quotationReferences.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalQuotationReferences.value = response.count;
  shouldDisable.value = false;
};

definePageMeta({
  title: "Administration - Services",
  middleware: "auth",
});

useSeoMeta({
  title: "Administration - Références de devis",
  description: "Gestion des références de devis de l'application",
});
</script>
