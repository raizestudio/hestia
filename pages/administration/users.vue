<template>
  <NuxtLayout>
    <CardSection>
      <DefaultResponsiveModal id="create_service" box-class="max-w-none w-fit">
        <!-- <CreateService
          :refresh-action="() => updateUserSfScope(usersSfScope)"
        /> -->
      </DefaultResponsiveModal>
      <DefaultResponsiveModal id="view_user" box-class="max-w-none">
        <ViewUser :username="viewUser" />
      </DefaultResponsiveModal>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end mb-4">
          <SectionTitle
            title="Utilisateurs"
            :description="
              loading
                ? 'Les utilisateurs sont en cours de chargement'
                : 'Gestion des utilisateurs de l\'application'
            "
          />
          <div class="flex flex-col justify-start h-full mr-10">
            <button class="btn btn-primary btn-xs" @click="() => updateUsersSfScope('new')">
              <span class="text-content font-semibold">Nouveaux comptes</span>
            </button>
          </div>
          <TableActions
            :current-sf-scope="usersSfScope"
            create-action="create_service.showModal()"
            :selected-rows-count="selectedUsers.length"
            :refresh-action="(scope: string) => updateUsersSfScope(scope)"
            :update-scope-action="(scope: string) => updateUsersSfScope(scope)"
            :should-disable="shouldDisable"
          />
        </div>
        <TableLoading v-if="loading" />
        <div v-else class="flex flex-col grow">
          <DefaultTable
            v-if="users.length > 0"
            :options="users"
            :headers="headers"
            :columns="columns"
            :has-next="hasNext"
            :has-prev="hasPrev"
            :count="totalUsers"
            :current-page="currentPage"
            :items-per-page="itemsPerPage"
            option-key="username"
            url="/user/"
            :toggle-modal="(serviceId) => toggleModal(serviceId)"
            :is-active-action="(username: string, is_active: boolean) => toggleIsActive(username, is_active)"
            :delete-action="(username: string) => delUser(username)"
            :restore-action="(username: string) => restoreUser(username)"
            :go-next="goNext"
            :go-prev="goPrev"
            :update-items-per-page="
              (itemsPerPage) => updateItemsPerPage(itemsPerPage)
            "
            :update-selected-rows="(selectedRows: UserInterface[]) => selectedUsers = selectedRows"
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

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import pkg from "~/package.json";
import _, { has } from "lodash";

// Composables
import {
  fetchUsers,
  searchUsers,
  partialUpdateUser,
  deleteUser,
} from "~/composables/api/useUsers";

// Interfaces
import type { UserInterface } from "../../interfaces/UserInterface";
import type {
  TableHeaderInterface,
  TableColumnInterface,
} from "~/interfaces/TableInterface";

// Components
import CardSection from "~/components/card/CardSection.vue";
import ViewUser from "~/components/user/ViewUser.vue";
import DefaultTable from "~/components/table/DefaultTable.vue";
import TableActions from "~/components/table/TableActions.vue";
import TableLoading from "~/components/loading/TableLoading.vue";
import SectionTitle from "~/components/title/SectionTitle.vue";
import DocumentMagnifyingGlassIcon from "~/components/assets/icons/DocumentMagnifyingGlassIcon.vue";

// Icons
import ChevronIcon from "~/components/assets/icons/ChevronIcon.vue";
import DefaultResponsiveModal from "~/components/modal/DefaultResponsiveModal.vue";

const router = useRouter();

const coreStore = useCoreStore();

const users = ref([] as UserInterface[]);
const selectedUsers = ref([] as UserInterface[]);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalUsers = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewUser = ref("");
const usersSfScope = ref("");
const usersExpand = ref("");
const loading = ref(false);
const shouldDisable = ref(false);

const userSearch = ref("");

const headers: TableHeaderInterface[] = [
  { label: "Actions", field: "actions" },
  { label: "Utilisateur", field: "username" },
  { label: "Prénom", field: "first_name" },
  { label: "Nom", field: "last_name" },
  { label: "Groupe", field: "role.group.name" },
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
];

const columns: TableColumnInterface[] = [
  {
    labelKey: "actions",
    type: "actions",
  },
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
  {
    labelKey: "role",
    type: "group",
  },
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
];

onMounted(async () => {
  const token = localStorage.getItem("token");
  const response: any = await fetchUsers(token);
  users.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  totalUsers.value = response.count;
});

const restoreUser = async (username: string) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await partialUpdateUser(username, { deleted_at: null }, '',token);
  users.value = users.value.map((user: UserInterface) => {
    if (user.username === username) {
      user.deleted_at = null;
    }
    return user;
  });
  updateUsersSfScope(usersSfScope.value);
};

const delUser = async (username: string,) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  if (!token) return;
  const response: any = await deleteUser(token, username);
  updateUsersSfScope(usersSfScope.value);

  // services.value = services.value.map((service: ServiceInterface) => {
  //   if (service.id === id) {
  //     service.deleted_at = response.deleted_at;
  //   }

  //   return service;
  // });

};

const filterUsers = async () => {
  shouldDisable.value = true;
  if (userSearch.value === "") {
    const token = localStorage.getItem("token");
    const response: any = await fetchUsers(token);
    users.value = response.results;
    shouldDisable.value = false;
    return;
  }

  const token = localStorage.getItem("token");
  const response: any = await searchUsers(token, "username", userSearch.value);
  // users.value = response.results.filter((user: UserInterface) => {
  //   return user.username.toLowerCase().includes(userSearch.value.toLowerCase());
  // });
  users.value = response;
  shouldDisable.value = false;
};

const updateUsersSfScope = async (scope: string) => {
  shouldDisable.value = true;
  usersSfScope.value = scope;
  currentPage.value = 1;
  const token = localStorage.getItem('token');
  const response: any = await fetchUsers(token, currentPage.value, itemsPerPage.value, usersSfScope.value);
  users.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalUsers.value = response.count;
  shouldDisable.value = false;
};

const updateItemsPerPage = async (updatedItemsPerPage: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  currentPage.value = 1;
  itemsPerPage.value = updatedItemsPerPage;
  const response: any = await fetchUsers(token, currentPage.value, itemsPerPage.value, usersSfScope.value);
  users.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalUsers.value = response.count;
  shouldDisable.value = false;
};
const goNext = async () => {
  shouldDisable.value = true;
  const token = localStorage.getItem("token");
  const response: any = await fetchUsers(token, currentPage.value + 1);
  users.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value += 1;
  shouldDisable.value = false;
};

const goPrev = async () => {
  shouldDisable.value = true;
  const token = localStorage.getItem("token");
  const response: any = await fetchUsers(token, currentPage.value - 1);
  users.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value -= 1;
  shouldDisable.value = false;
};

const toggleModal = (username: string) => {
  viewUser.value = username;
  const modal: any = document.getElementById("view_user");
  modal?.showModal();
};

const toggleIsActive = (username: string, is_active: boolean) => {
  shouldDisable.value = true;
  console.log("Toggle is active");
  const token = localStorage.getItem("token");
  if (!token) return;
  const response: any = partialUpdateUser(username, {
    is_active: is_active,
  }, '', token);
  users.value = users.value.map((user: UserInterface) => {
    if (user.username === username) {
      user.is_active = is_active;
    }
    return user;
  });
  shouldDisable.value = false;
};

const goToPage = async (page: number) => {
  shouldDisable.value = true;
  const token = localStorage.getItem('token');
  currentPage.value = page;
  const response: any = await fetchUsers(token, currentPage.value, itemsPerPage.value, usersSfScope.value);
  users.value = response.results;
  hasNext.value = response.next !== null;
  hasPrev.value = response.previous !== null;
  totalUsers.value = response.count;
  shouldDisable.value = false;
};
definePageMeta({
  title: "users",
  name: "users",
  middleware: "auth",
});

useSeoMeta({
  title: "Administration - Utilisateurs",
  description: "Gestion des utilisateurs de l'application",
});
</script>
