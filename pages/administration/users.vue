<template>
  <NuxtLayout>
    <CardSection>
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
              <th>Utilisateur</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Role</th>
              <th>Email</th>
              <th>Est actif</th>
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
                Snexi
                <br />
                <span class="badge badge-ghost badge-sm">Admin</span>
              </td>
              <td>{{user.email}}</td>
              <td>{{user.is_active}}</td>
              <th>
                <button class="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
          <!-- foot -->
          <tfoot>
            <!-- <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr> -->
          </tfoot>
        </table>
      </div>
    </CardSection>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import { fetchUsers } from '~/composables/api/useUsers';

import type { UserInterface } from '../../interfaces/UserInterface';

const users = ref([] as UserInterface[])

onMounted(async () => {
  const token = localStorage.getItem('token')
  const response: any = await fetchUsers(token)
  users.value = response
})

const usersHeaders = computed(() => {
  return Object.keys(users.value[0])
})

definePageMeta({
  title: 'users',
  name: 'users',
})
</script>