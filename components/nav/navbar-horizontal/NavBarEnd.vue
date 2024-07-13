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
        placeholder="Recherche"
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

    <button>
      <SupportAgentIcon class="w-6 h-6" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const route = useRoute();

//Stores
const userStore = useUserStore();
const coreStore = useCoreStore();

// Icons
import LoginRoundedIcon from "../../assets/icons/material-symbols/LoginRoundedIcon.vue";
import MoonIcon from "~/components/assets/icons/MoonIcon.vue";
import SunIcon from "~/components/assets/icons/SunIcon.vue";
import BellIcon from "~/components/assets/icons/BellIcon.vue";
import ProfileComponent from "../ProfileComponent.vue";
import SupportAgentIcon from "~/components/assets/icons/SupportAgentIcon.vue";

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
  },
];
</script>

<style></style>
