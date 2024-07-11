<template>
  <NuxtLayout>
    <CardSection>
      <div>
        <div class="flex justify-end gap-2">
          <label class="form-control">
            <select class="select select-xs select-bordered">
              <option disabled selected>Champ à filter</option>
              <option>Nom</option>
              <option>Prénom</option>
              <option>Nom</option>
              <option>Role</option>
              <option>Email</option>
            </select>
          </label>
          <input
            type="text"
            placeholder="Recherche"
            class="input input-xs input-bordered w-24 md:w-auto"
          />
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <!-- head -->
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th>
                <TableTh label="Utilisateur" />
                <TableTh label="Prénom" />
                <TableTh label="Nom" />
                <TableTh label="Groupe" />
                <TableTh label="Email" />
                <TableTh label="Est actif" />
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr v-for="user in users">
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-12 w-12">
                        <img
                          :src="user.avatar"
                          :alt="`${user.username} avatar`" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{{user.username}}</div>
                      <div class="text-sm opacity-50">France</div>
                    </div>
                  </div>
                </td>
                <td>{{user.first_name}}</td>
                <td>{{user.last_name}}</td>
                <td>
                  {{ _.capitalize(user.role.group.name) }}
                  <br />
                  <span class="badge badge-ghost badge-sm">{{user.role.name}}</span>
                </td>
                <td>{{user.email}}</td>
                <td>{{user.is_active ? 'Oui' : 'Non'}}</td>
                <th>
                  <div class="flex gap-1">
                    <button class="btn btn-ghost btn-xs">Éditer</button>
                    <button class="btn btn-warning btn-xs">Désactiver</button>
                    <button class="btn btn-error btn-xs">Supprimer</button>
                  </div>
                </th>
              </tr>
            </tbody>            
          </table>
        </div>
        <div class="flex px-1 py-0.5 items-center">
          <div class="flex grow">
            <button class="btn btn-sm btn-ghost"><ChevronIcon /></button>
            <button class="btn btn-sm btn-ghost"><ChevronIcon class="rotate-180" /></button>
          </div>
          <div class="flex gap-2">
            <span class="badge badge-ghost">Items par page: <span class="bg-base-100">10</span></span>
            <span class="badge badge-ghost">Page: <span class="bg-base-100">1</span></span>
          </div>
        </div>
      </div>
    </CardSection>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import pkg from '~/package.json';
import _ from 'lodash'

// Composables
import { fetchUsers } from '~/composables/api/useUsers';

// Interfaces
import type { UserInterface } from '../../interfaces/UserInterface';

// Components
import CardSection from '~/components/card/CardSection.vue';
import TableTh from '~/components/table/TableTh.vue';

// Icons
import ChevronIcon from '~/components/assets/icons/ChevronIcon.vue';

const users = ref([] as UserInterface[])
const tableConfig = ref({
  sort: {
    field: 'username',
    order: 'asc'
  }
})

onMounted(async () => {
  document.title = `${_.capitalize(pkg.name)} - Users`
  const token = localStorage.getItem('token')
  const response: any = await fetchUsers(token)
  users.value = response.results
})

const usersHeaders = computed(() => {
  return Object.keys(users.value[0])
})

definePageMeta({
  title: 'users',
  name: 'users',
  middleware: 'auth'
})
</script>