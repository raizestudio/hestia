<template>
  <div class="navbar-start">
    <div @click="$router.push('/')">
      <div class="cursor-pointer">
        <h1 class="text-xl font-black select-none">{{coreStore.settings.app_name || _.capitalize(pkg.name) }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import pkg from "~/package.json";
import _ from 'lodash';

const coreStore = useCoreStore()
</script>