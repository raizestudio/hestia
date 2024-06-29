<template>
  <div class="navbar-end gap-2">
    <div v-if="route.path !== '/login' && !userStore.isLogged">
      <button
        v-for="link in userStore.isLogged ? links : linksAnonymousUser"
        class="btn btn-sm btn-primary"
        @click="$router.push(link.to)"
      >
        {{ link.label }}
      </button>
    </div>

    <div v-if="userStore.isLogged" class="form-control">
      <input
        type="text"
        placeholder="Search"
        class="input input-sm input-bordered w-24 md:w-auto"
      />
    </div>

    <ProfileComponent v-if="userStore.isLogged" />

    <button v-if="userStore.isLogged" class="btn btn-xs btn-ghost btn-circle">
      <div class="indicator">
        <BellIcon />
        <span class="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>

    <label class="swap swap-rotate">
      <input type="checkbox" class="" value="light" @click="coreStore.toggleTheme" />
      <SunIcon />
      <MoonIcon />
    </label>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

//Stores
const userStore = useUserStore()
const coreStore = useCoreStore()

// Icons
import LoginRoundedIcon from "../../icons/material-symbols/LoginRoundedIcon.vue";
import MoonIcon from "~/components/icons/MoonIcon.vue";
import SunIcon from "~/components/icons/SunIcon.vue";
import BellIcon from "~/components/icons/BellIcon.vue";
import ProfileComponent from "../ProfileComponent.vue";

const linksAnonymousUser = [
  {
    label: "Connexion",
    icon: LoginRoundedIcon,
    to: "/login",
  },
];

const links = [
  {
    label: "Bouton",
    icon: "i-heroicons-home",
    to: "/getting-started/installation",
  }];

console.log()
</script>


<style></style>
