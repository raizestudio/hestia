<template>
  <NuxtLayout>
    <CardSection>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end">
          <div class="grow">
            <h2 class="text-2xl font-bold">Utilisateurs</h2>
            <p class="text-sm opacity-50">
              Gestion des utilisateurs de l'application
            </p>
          </div>
          <div v-if="selectedUsers > 0" class="flex gap-2 mr-4">
            <button class="btn btn-warning btn-xs">
              Désactiver {{ selectedUsers }}
            </button>
            <button class="btn btn-error btn-xs">
              Supprimer {{ selectedUsers }}
            </button>
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
            <input
              v-model="userSearch"
              type="text"
              placeholder="Recherche"
              class="input input-xs input-bordered w-24 md:w-auto"
              @change="filterUsers"
            />
          </div>
        </div>
        <DefaultTable
          v-if="users.length > 0"
          :options="users"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalUsers"
          :current-page="currentPage"
          optionKey="username"
          url="/user/"
          :toggle-modal="(username) => toggleModal(username)"
          :is-active-action="(username, is_active) => toggleIsActive(username, is_active)"
          :go-next="goNext"
          :go-prev="goPrev"
          table-class="table-zebra table-pin-cols table-pin-rows"
        />
      </div>
      <DefaultResponsiveModal
        id="view_user"
        box-class="max-w-none"
        v-if="viewUser.length > 0 && viewUser !== undefined"
      >
        <ViewUser :username="viewUser" />
      </DefaultResponsiveModal>
    </CardSection>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import pkg from "~/package.json";
import _, { has } from "lodash";

// Composables
import { fetchUsers, searchUsers, partialUpdateUser } from "~/composables/api/useUsers";

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

// Icons
import ChevronIcon from "~/components/assets/icons/ChevronIcon.vue";
import DefaultResponsiveModal from "~/components/modal/DefaultResponsiveModal.vue";

const router = useRouter();

const coreStore = useCoreStore();

const users = ref([] as UserInterface[]);
const selectedUsers = ref(0);
const hasPrev = ref(false);
const hasNext = ref(false);
const totalUsers = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const viewUser = ref("");
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

const filterUsers = async () => {
  if (userSearch.value === '') {
    const token = localStorage.getItem("token");
    const response: any = await fetchUsers(token);
    users.value = response.results;
    return;
  }

  const token = localStorage.getItem("token");
  const response: any = await searchUsers(token, "username", userSearch.value);
  // users.value = response.results.filter((user: UserInterface) => {
  //   return user.username.toLowerCase().includes(userSearch.value.toLowerCase());
  // });
  users.value = response;
};

const goNext = async () => {
  const token = localStorage.getItem("token");
  const response: any = await fetchUsers(token, currentPage.value + 1);
  users.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value += 1;
};

const goPrev = async () => {
  const token = localStorage.getItem("token");
  const response: any = await fetchUsers(token, currentPage.value - 1);
  users.value = response.results;
  hasPrev.value = response.previous !== null;
  hasNext.value = response.next !== null;
  currentPage.value -= 1;
};

const toggleModal = (username: string) => {
  viewUser.value = username;
  const modal: any = document.getElementById("view_user");
  modal?.showModal();
};

const toggleIsActive = (username: string, is_active: boolean) => {
  console.log("Toggle is active");
  const token = localStorage.getItem("token");
  if (!token) return;
  const response: any = partialUpdateUser(token, username, {"is_active": is_active});
  users.value = users.value.map((user: UserInterface) => {
    if (user.username === username) {
      user.is_active = is_active;
    }
    return user;
  });

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
