<template>
  <NuxtLayout>
    <SectionFullScreen>
      <CardSection>
        <div class="flex items-end">
          <div class="grow">
            <h2 class="text-2xl font-bold">Devis</h2>
            <p class="text-sm opacity-50">
              Gestion des devis
            </p>
          </div>
          <!-- <div v-if="selectedUsers.length > 0" class="flex gap-2 mr-4">
            <button class="btn btn-warning btn-xs">Désactiver {{selectedUsers.length}}</button>
            <button class="btn btn-error btn-xs">Supprimer {{selectedUsers.length}}</button>
          </div> -->

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
              v-model="userSearch"
              type="text"
              placeholder="Recherche"
              class="input input-xs input-bordered w-24 md:w-auto"
              @change="filterUsers"
            /> -->
          </div>
        </div>
      </CardSection>
    </SectionFullScreen>
  </NuxtLayout>
</template>

<script lang="ts" setup>

</script>