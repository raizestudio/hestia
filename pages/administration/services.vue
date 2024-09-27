<template>
  <NuxtLayout>
    <div :class="clsx('')">
      <div :class="clsx('flex justify-between items-center mb-2')">
        <div class="flex items-center gap-2">
          <span :class="clsx('font-semibold text-xl')">Services</span>
          <span :class="clsx('text-xs opacity-50 rounded p-0.5', themeStore.current === 'light' ? 'bg-light-300' : 'bg-dark-300')">{{ servicesStore.services.length }} services</span>
        </div>
        <div>
          <ButtonComponent
            :class="
              clsx(
                '',
                themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
              )
            "
            >Ajouter service</ButtonComponent
          >
        </div>
      </div>
      <DefaultTable
        v-if="!coreStore.isLoadingLocal && servicesStore.services.length > 0"
        :data="servicesStore.services"
        :headers="headers"
        :columns="columns"
        option-key="username"
        url="/users/"
        table-class="min-w-full divide-y divide-primary-100"
        table-size="xs"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Components
import DefaultTable from "@/components/table/DefaultTable.vue";
import ButtonComponent from "@/components/button/ButtonComponent.vue";

// Interfaces
import { type ServiceInterface } from '@/interfaces/ServiceInterface';

// Stores
const servicesStore = useServicesStore();
const menuStore = useMenuStore();
const themeStore = useThemeStore();
const coreStore = useCoreStore();

coreStore.isLoadingLocal = true;
servicesStore.getServices();
coreStore.isLoadingLocal = false;

const headers: any[] = [
  { label: "Actions", field: "actions" },
  { label: "Name", field: "name" },
  { label: "Description", field: "description" },
  { label: "Est actif", field: "is_active" },
  { label: "Est archivé", field: "deleted_at" },
  { label: "A été restauré", field: "restored_at" },
  { label: "Estimation", field: "estimated_duration" },
  { label: "Crée le", field: "created_at" },
  { label: "Crée par", field: "author.username" },
  { label: "Modifié le", field: "updated_at" },
  { label: "Modifié par", field: "updated_by.username" },
  // { label: "Tags", field: "tag.name" },
  { label: "Catégories", field: "categories.name" },
  { label: "Version", field: "version" },
];

const columns: any[] = [
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
  // {
  //   labelKey: "tags",
  //   type: "tags",
  // },
  {
    labelKey: "categories",
    type: "tags",
  },
  {
    labelKey: "version",
    type: "text",
  }
];
</script>