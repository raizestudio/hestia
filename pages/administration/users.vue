<template>
  <NuxtLayout>
    <div :class="clsx('flex flex-col grow')">
      <TableHeader
        title-label="Utilisateurs"
        :sub-title-label="`${usersStore.users.length} utilisateurs`"
        add-action-label="Ajouter utilisateur"
      />
      <div class="grow">
        <DefaultTable
          v-if="!coreStore.isLoadingLocal && usersStore.users.length > 0"
          :data="usersStore.users"
          :headers="headers"
          :columns="columns"
          option-key="username"
          url="/users/"
          table-class="min-w-full divide-y divide-primary-100"
          table-size="xs"
        />
      </div>
      <TableFooter
        :entities-per-page="itemsPerPage"
        :entity-count="usersStore.count"
        :current-page="currentPage"
        :has-next="hasNext"
        :has-prev="hasPrev"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Components
import DefaultTable from "@/components/table/DefaultTable.vue";
import TableFooter from "@/components/table/TableFooter.vue";
import TableHeader from "@/components/table/TableHeader.vue";
import ButtonComponent from "@/components/button/ButtonComponent.vue";

// Interfaces
import { type UserInterface } from "@/interfaces/UserInterface";
// Interfaces
import type {
  TableHeaderInterface,
  TableColumnInterface,
} from "@/interfaces/TableInterface";

// Stores
const usersStore = useUsersStore();
const menuStore = useMenuStore();
const themeStore = useThemeStore();
const coreStore = useCoreStore();

coreStore.isLoadingLocal = true;
usersStore.getUsers();
coreStore.isLoadingLocal = false;

const selectedUsers = ref([] as UserInterface[]);
const hasPrev = ref(false);
const hasNext = ref(false);
// const totalUsers = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewUser = ref("");
const usersSfScope = ref("");
const usersExpand = ref("");
const loading = ref(false);
const shouldDisable = ref(false);

const userSearch = ref("");

const headers: TableHeaderInterface[] = [
  { label: "Utilisateur", field: "username" },
  { label: "Prénom", field: "first_name" },
  { label: "Nom", field: "last_name" },
  // { label: "Groupe", field: "role.group.name" },
  { label: "Role", field: "role.name" },
  { label: "Email", field: "email" },
  { label: "Actif", field: "is_active" },
  { label: "Membre depuis le", field: "date_joined" },
  { label: "Modifié le", field: "updated_at" },
  { label: "Dernière connexion", field: "last_login" },
  { label: "Numéro de telephones", field: "phone_numbers  " },
  { label: "Adresses", field: "addresses  " },
  { label: "Préfèrences", field: "user_preferences  " },
  { label: "Sécurité", field: "user_security  " },
  { label: "Version", field: "version" },
  { label: "Actions", field: "actions" },
];

const columns: TableColumnInterface[] = [
  {
    avatarKey: "avatar",
    labelKey: "username",
    type: "avatar",
  },
  {
    labelKey: "first_name",
    type: "text",
  },
  {
    labelKey: "last_name",
    type: "text",
  },
  // {
  //   labelKey: "role",
  //   type: "group",
  // },
  {
    labelKey: "role",
    type: "role",
  },
  {
    labelKey: "email",
    type: "email",
  },
  {
    labelKey: "is_active",
    type: "boolean",
  },
  {
    labelKey: "date_joined",
    type: "date",
  },
  {
    labelKey: "updated_at",
    type: "date",
  },
  {
    labelKey: "last_login",
    type: "date",
  },
  {
    labelKey: "phone_numbers",
    type: "phone_number",
  },
  {
    labelKey: "addresses",
    type: "address",
  },
  {
    labelKey: "user_preferences",
    type: "user_preference",
  },
  {
    labelKey: "user_security",
    type: "user_security",
  },
  {
    labelKey: "version",
    type: "text",
  },
  {
    labelKey: "actions",
    type: "actions",
  },
];

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Utilisateurs",
  description: "Liste des utilisateurs",
});
</script>
