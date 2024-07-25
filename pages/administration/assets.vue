<template>
  <NuxtLayout>
    <CardSection>
      <DefaultResponsiveModal id="create_service" box-class="max-w-none w-fit">
        <!-- <CreateService
          :refresh-action="() => updateServiceSfScope(servicesSfScope)"
        /> -->
      </DefaultResponsiveModal>
      <DefaultResponsiveModal id="view_service" box-class="max-w-none">
        <!-- <ViewService :asset-id="viewService" /> -->
      </DefaultResponsiveModal>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end mb-4">
          <SectionTitle title="Actifs" :description="loading ? 'Les actifs sont en cours de chargement' : 'Gestion des actifs de l\'application'" />
          <TableActions
            :current-sf-scope="assetsSfScope"
            create-action="create_service.showModal()"
            :selected-rows-count="selectedAssets.length"
            :refresh-action="(scope: string) => updateServiceSfScope(scope)"
            :update-scope-action="(scope: string) => updateServiceSfScope(scope)"
            :should-disable="shouldDisable"
          />
        </div>
        <TableLoading v-if="loading" />
        <div v-else class="flex flex-col grow">
          <DefaultTable
          v-if="assets.length > 0"
          :options="assets"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalAssets"
          :current-page="currentPage"
          option-key="id"
          url="/services/"
          :toggle-modal="(assetId) => toggleModal(assetId)"
          :is-active-action="(assetId: number, is_active: boolean) => toggleIsActive(assetId, is_active)"
          :delete-action="(assetId: number) => delAsset(assetId)"
          :restore-action="(assetId: number) => restoreAsset(assetId)"
          :go-next="goNext" 
          :go-prev="goPrev"
          :update-items-per-page="(itemsPerPage) => updateItemsPerPage(itemsPerPage)"
          :update-selected-rows="(selectedRows: AssetInterface[]) => selectedAssets = selectedRows"
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

// Interfaces
import type { AssetInterface } from '~/interfaces/AssetInterface';
import type { TableColumnInterface, TableHeaderInterface } from '~/interfaces/TableInterface';

// Composables
import { deleteAsset, fetchAssets, partialUpdateAsset } from '~/composables/api/useAssets';

// Components
import CardSection from '~/components/card/CardSection.vue';
import DefaultTable from '~/components/table/DefaultTable.vue';
import DefaultResponsiveModal from '~/components/modal/DefaultResponsiveModal.vue';
import TableActions from '~/components/table/TableActions.vue';
import TableLoading from '~/components/loading/TableLoading.vue';
import SectionTitle from '~/components/title/SectionTitle.vue';
import NoItemsTable from '~/components/noop/NoItemsTable.vue';

// Icons
import DocumentMagnifyingGlassIcon from '~/components/assets/icons/DocumentMagnifyingGlassIcon.vue';

const assets = ref([] as AssetInterface[]);
const selectedAssets = ref([] as AssetInterface[]);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalAssets = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewAsset = ref('');
const assetsSfScope = ref('');
const assetExpand = ref('');
const loading = ref(false);
const shouldDisable = ref(false);

onMounted(async () => {
  loading.value = true;
  const token = localStorage.getItem('token');
  const response: any = await fetchAssets(token);
  assets.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalAssets.value = response.count;
  loading.value = false;
});

const headers: TableHeaderInterface[] = [
  { label: "Actions", field: "actions" },
  { label: "Name", field: "name" },
  { label: "Description", field: "description" },
  { label: "Est actif", field: "is_active" },
  { label: "Est archivé", field: "deleted_at" },
  { label: "A été restauré", field: "restored_at" },
  { label: "Crée le", field: "created_at" },
  { label: "Crée par", field: "author.username" },
  { label: "Modifié le", field: "updated_at" },
  { label: "Modifié par", field: "updated_by.username" },
  { label: "Tags", field: "tag.name" },
  { label: "Catégories", field: "categories.name" },
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
    type: "description",
  },
  {
    labelKey: "is_active",
    type: "boolean",
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
  },
  {
    labelKey: "tags",
    type: "tags",
  },
  {
    labelKey: "categories",
    type: "tags",
  },
];

const updateServiceSfScope = async (scope: string) => {
  shouldDisable.value = true;
  assetsSfScope.value = scope;
  currentPage.value = 1;
  const token = localStorage.getItem('token');
  const response: any = await fetchAssets(token, currentPage.value, itemsPerPage.value, assetsSfScope.value);
  assets.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalAssets.value = response.count;
  shouldDisable.value = false;
};

const goNext = async () => {
  shouldDisable.value = true;
  const token = localStorage.getItem("token");
  const response: any = await fetchAssets(token, currentPage.value + 1, itemsPerPage.value);
  assets.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value += 1;
  shouldDisable.value = false;
};

const goPrev = async () => {
  shouldDisable.value = true;
  const token = localStorage.getItem("token");
  const response: any = await fetchAssets(token, currentPage.value - 1, itemsPerPage.value);
  assets.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value -= 1;
  shouldDisable.value = false;
};

const toggleIsActive = async (id: number, is_active: boolean) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await partialUpdateAsset(token, id, { is_active: is_active });
  assets.value = assets.value.map((asset: AssetInterface) => {
    if (asset.id === id) {
      asset.is_active = is_active;
    }
    return asset;
  });
  shouldDisable.value = false;
};

const restoreAsset = async (id: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await partialUpdateAsset(token, id, { deleted_at: null }, true);
  assets.value = assets.value.map((asset: AssetInterface) => {
    if (asset.id === id) {
      asset.deleted_at = null;
    }
    return asset;
  });
  updateServiceSfScope(assetsSfScope.value);
};

const delAsset = async (id: number,) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await deleteAsset(token, id);
  updateServiceSfScope(assetsSfScope.value);
};


const updateItemsPerPage = async (updatedItemsPerPage: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  currentPage.value = 1;
  itemsPerPage.value = updatedItemsPerPage;
  const response: any = await fetchAssets(token, currentPage.value, itemsPerPage.value, assetsSfScope.value);
  assets.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalAssets.value = response.count;
  shouldDisable.value = false;
};

const toggleModal = (assetId: string) => {
  viewAsset.value = assetId;
  const modal: any = document.getElementById("view_service");
  modal?.showModal();
};

const goToPage = async (page: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  currentPage.value = page;
  const response: any = await fetchAssets(token, currentPage.value, itemsPerPage.value, assetsSfScope.value);
  assets.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalAssets.value = response.count;
  shouldDisable.value = false;
};



definePageMeta({
  title: "Administration - Actifs",
  middleware: "auth",
});

useSeoMeta({
  title: "Administration - Actifs",
  description: "Gestion des actifs de l'application",
});
</script>
