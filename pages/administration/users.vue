<template>
  <NuxtLayout>
    <CardSection>
      <div class="flex flex-col h-full">
        <div class="flex items-end">
          <div class="grow">
            <h2 class="text-2xl font-bold">Utilisateurs</h2>
            <p class="text-sm opacity-50">
              Gestion des utilisateurs de l'application
            </p>
          </div>
          <div v-if="selectedUsers.length > 0" class="flex gap-2 mr-4">
            <button class="btn btn-warning btn-xs">Désactiver {{selectedUsers.length}}</button>
            <button class="btn btn-error btn-xs">Supprimer {{selectedUsers.length}}</button>
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
        
        <div class="overflow-x-auto grow">
          <table class="table table-zebra">
            <!-- head -->
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" @change="selectAll" :checked="selectedUsers.length === users.length" />
                  </label>
                </th>
                <TableTh label="Utilisateur" field="username" :sort="tableConfig.sort" :update-table-config="(field: string, sort: string) => updateTableConfigSort(field, sort)" />
                <TableTh label="Prénom" field="first_name" :sort="tableConfig.sort" :update-table-config="(field: string, sort: string) => updateTableConfigSort(field, sort)" />
                <TableTh label="Nom" field="last_name" :sort="tableConfig.sort" :update-table-config="(field: string, sort: string) => updateTableConfigSort(field, sort)" />
                <TableTh label="Groupe" field="group" :sort="tableConfig.sort" :update-table-config="(field: string, sort: string) => updateTableConfigSort(field, sort)" />
                <TableTh label="Email" field="email" :sort="tableConfig.sort" :update-table-config="(field: string, sort: string) => updateTableConfigSort(field, sort)" />
                <TableTh label="Est actif" field="is_active" :sort="tableConfig.sort" :update-table-config="(field: string, sort: string) => updateTableConfigSort(field, sort)" />
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr v-for="user in users">
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" @change="() => checkUser(user.id)" :checked="selectedUsers.includes(user.id)" />
                  </label>
                </th>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-12 w-12">
                        <img
                          :src="user.avatar"
                          :alt="`${user.username} avatar`"
                        />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{{ user.username }}</div>
                      <div class="text-sm opacity-50">France</div>
                    </div>
                  </div>
                </td>
                <TableTd :field="user.first_name" />
                <TableTd :field="user.last_name" />
                <TableTd :field="_.capitalize(user.role.group.name)">
                  
                  <br />
                  <span class="badge badge-ghost badge-sm">{{
                    user.role.name
                  }}</span>
                </TableTd>
                <td>{{ user.email }}</td>
                <td>{{ user.is_active ? "Oui" : "Non" }}</td>
                <th>
                  <div class="flex gap-1">
                    <button class="btn btn-accent btn-xs"><EyeIcon class="w-4 h-4 fill-base-100" /></button>
                    <button class="btn btn-accent btn-xs"><EditIcon class="w-4 h-4 fill-base-100" /></button>
                    <button class="btn btn-warning btn-xs"><CloseIcon class="w-4 h-4 fill-base-100" /></button>
                    <button class="btn btn-error btn-xs"><DeleteIcon class="w-4 h-4 fill-base-100" /></button>
                    <button class="btn btn-info btn-xs"><InfoIcon class="w-4 h-4 fill-base-100" /></button>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex px-1 py-0.5 items-center">
          <div class="flex grow">
            <button class="btn btn-sm btn-ghost"><ChevronIcon /></button>
            <button class="btn btn-sm btn-ghost">
              <ChevronIcon class="rotate-180" />
            </button>
          </div>
          <div class="flex gap-2">
            <span class="badge badge-ghost"
              >Items par page: <span class="bg-base-100">{{users.length}}</span></span
            >
            <span class="badge badge-ghost"
              >Page: <span class="bg-base-100">1</span></span
            >
          </div>
        </div>
      </div>
    </CardSection>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import pkg from "~/package.json";
import _ from "lodash";

// Composables
import { fetchUsers, searchUsers } from "~/composables/api/useUsers";

// Interfaces
import type { UserInterface } from "../../interfaces/UserInterface";

// Components
import CardSection from "~/components/card/CardSection.vue";
import TableTh from "~/components/table/TableTh.vue";
import TableTd from "~/components/table/TableTd.vue";

// Icons
import ChevronIcon from "~/components/assets/icons/ChevronIcon.vue";
import DeleteIcon from "~/components/assets/icons/DeleteIcon.vue";
import CloseIcon from "~/components/assets/icons/CloseIcon.vue";
import EditIcon from "~/components/assets/icons/EditIcon.vue";
import PreviewIcon from "~/components/assets/icons/PreviewIcon.vue";
import EyeIcon from "~/components/assets/icons/EyeIcon.vue";
import InfoIcon from "~/components/assets/icons/InfoIcon.vue";

const users = ref([] as UserInterface[]);
const selectedUsers = ref([] as number[]);
const userSearch = ref('');
const tableConfig = ref({
  sort: {
    field: '',
    order: '',
  },
});

onMounted(async () => {
  document.title = `${_.capitalize(pkg.name)} - Utilisateurs`;
  const token = localStorage.getItem("token");
  const response: any = await fetchUsers(token);
  users.value = response.results;
});

const usersHeaders = computed(() => {
  return Object.keys(users.value[0]);
});

const updateTableConfigSort = (field: string, order: string) => {
  console.log(`DEBUG: ${field} - ${order}`)
  tableConfig.value.sort.field = field;
  tableConfig.value.sort.order = order;

  // Sort users
  users.value = _.orderBy(users.value, [field], [order]);
}

const checkUser = (id: number) => {
  if (selectedUsers.value.includes(id)) {
    selectedUsers.value = selectedUsers.value.filter((user) => user !== id);
    return;
  }
  selectedUsers.value.push(id);
}

const selectAll = () => {
  if (selectedUsers.value.length === users.value.length) {
    selectedUsers.value = [];
    return;
  }
  selectedUsers.value = users.value.map((user) => user.id);
}

const filterUsers = async () => {
  if (!userSearch.value) {
    const token = localStorage.getItem("token");
    const response: any = fetchUsers(token);
    users.value = response.results;
  }

  const token = localStorage.getItem("token")
  const response: any = await searchUsers(token, 'username', userSearch.value);
  users.value = response.results.filter((user: UserInterface) => {
    return user.username.toLowerCase().includes(userSearch.value.toLowerCase());
  });
}
definePageMeta({
  title: "users",
  name: "users",
  middleware: "auth",
});
</script>
