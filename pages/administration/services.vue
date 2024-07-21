<template>
  <NuxtLayout>
    <CardSection>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end mb-4">
          <div class="grow">
            <h2 class="text-2xl font-bold">Services</h2>
            <p class="text-sm opacity-50">Gestion des services de l'application</p>
          </div>
          <div class="grid justify-items-end grid-rows-2">
            <div>
              <button class="btn btn-primary btn-xs">
                <PlusIcon class="w-5 h-5 fill-base-100" />
                <span class="text-base-100 font-semibold">Ajouter</span>
              </button>
            </div>
            <div v-if="selectedServices.length > 0" class="flex gap-2">
              <button class="btn btn-warning btn-xs">
                <CloseIcon class="w-5 h-5 fill-base-100" />
                <span class="text-base-100 font-semibold">{{ selectedServices.length }}</span>
              </button>
              <button class="btn btn-error btn-xs">
                <ArchiveIcon class="w-5 h-5 stroke-base-100" />
                <span class="text-base-100 font-semibold">{{ selectedServices.length }}</span>
              </button>
              <button class="btn btn-error btn-xs">
                <DeleteIcon class="w-5 h-5 stroke-base-100" />
                <span class="text-base-100 font-semibold">{{ selectedServices.length }}</span>
              </button>
            </div>
          </div>

          <div class="flex gap-2">
            <!-- <label class="form-control">
              <select class="select select-xs select-bordered">
                <option disabled selected>Champ à filter</option>
                <option>Nom</option>
                <option>Prénom</option>
                <option>Nom</option>
                <option>Role</option>
                <option>Email</option>
              </select>
            </label> -->
            <!-- <input
              v-model="serviceSearch"
              type="text"
              placeholder="Recherche"
              class="input input-xs input-bordered w-24 md:w-auto"
              @change="filterUsers"
            /> -->
          </div>
        </div>
        <DefaultTable
          :options="services"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalServices"
          :current-page="currentPage"
          option-key="id"
          url="/services/"
          :toggle-modal="() => {}"
          :is-active-action="(id: number, is_active: boolean) => toggleIsActive(id, is_active)"
          :go-next="goNext" 
          :go-prev="goPrev"
          :update-selected-rows="(selectedRows: ServiceInterface[]) => selectedServices = selectedRows"
          table-class="table-zebra table-pin-cols table-pin-rows table-xs"
        />
      </div>
      
    </CardSection>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import _ from 'lodash';
import pkg from "~/package.json";

// Interfaces
import type { ServiceInterface } from '~/interfaces/ServiceInterface';
import type { TableColumnInterface, TableHeaderInterface } from '~/interfaces/TableInterface';

// Composables
import { fetchServices, partialUpdateService } from '~/composables/api/useServices'

// Components
import CardSection from '~/components/card/CardSection.vue';
import DefaultTable from '~/components/table/DefaultTable.vue';

// Icons
import XCircle from '~/components/assets/icons/XCircleIcon.vue';
import DeleteIcon from '~/components/assets/icons/DeleteIcon.vue';
import ArchiveIcon from '~/components/assets/icons/ArchiveIcon.vue';
import CloseIcon from '~/components/assets/icons/CloseIcon.vue';
import PlusIcon from '~/components/assets/icons/PlusIcon.vue';

const services = ref([] as ServiceInterface[]);
const selectedServices = ref([] as ServiceInterface[]);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalServices = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewService = ref('');

onMounted(async () => {
  document.title = `Administration services - ${_.capitalize(pkg.name)}`;
  const token = localStorage.getItem('token');
  const response: any = await fetchServices(token, currentPage.value, itemsPerPage.value);
  services.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalServices.value = response.count;
});

const headers: TableHeaderInterface[] = [
  { label: "Actions", field: "actions" },
  { label: "Name", field: "name" },
  { label: "Description", field: "description" },
  { label: "Est actif", field: "is_active" },
  { label: "Est archivé", field: "deleted_at" },
  { label: "A été restauré", field: "restored_at" },
  { label: "Estimation", field: "estimated_duration" },
  { label: "Crée le", field: "created_at" },
  { label: "Crée par", field: "created_by.username" },
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
    textClass: "font-semibold",
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
    labelKey: "estimated_duration",
    type: "duration",
  },
  {
    labelKey: "created_at",
    type: "date",
    dateType: "full"
  },
  {
    avatarKey: "created_by.avatar",
    labelKey: "created_by",
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

const goNext = async () => {
  const token = localStorage.getItem("token");
  const response: any = await fetchServices(token, currentPage.value + 1, itemsPerPage.value);
  services.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value += 1;
};

const goPrev = async () => {
  const token = localStorage.getItem("token");
  const response: any = await fetchServices(token, currentPage.value - 1, itemsPerPage.value);
  services.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value -= 1;
};

const toggleIsActive = async (id: number, is_active: boolean) => {
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await partialUpdateService(token, id, { is_active: is_active });
  services.value = services.value.map((service: ServiceInterface) => {
    if (service.id === id) {
      service.is_active = is_active;
    }
    return service;
  });
};


definePageMeta({
  title: "Administration - Services",
  middleware: "auth",
});
</script>
