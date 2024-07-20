<template>
  <div class="navbar !min-h-12 h-12 bg-base-100 shadow">
    <div v-if="userStore.isLogged" class="flex-none lg:hidden mr-2">
      <label for="drawer-sidebar" aria-label="open sidebar" class="btn btn-sm btn-square btn-ghost">
        <HamburgerMenuIcon />
      </label>
    </div>
    <NavBarStart />
    <NavBarEnd />
  </div>
</template>

<script setup lang="ts">

// Stores
const userStore = useUserStore();

// Components
import NavBarStart from './navbar-horizontal/NavBarStart.vue';
import NavBarEnd from './navbar-horizontal/NavBarEnd.vue';

import HamburgerMenuIcon from '~/components/assets/icons/HamburgerMenuIcon.vue';
</script>