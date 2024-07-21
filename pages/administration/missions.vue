<template>
  <NuxtLayout>
    <CardSection>
      <div ref="containerRef" class="flex flex-col h-full">
        <div class="flex items-end">
          <div class="grow">
            <h2 class="text-2xl font-bold">Missions</h2>
            <p class="text-sm opacity-50">Gestion des missions de l'application</p>
          </div>
        </div>
        <!-- <DefaultTable
          :options="quotations"
          :headers="headers"
          :columns="columns"
          :has-next="hasNext"
          :has-prev="hasPrev"
          :count="totalQuotations"
          :current-page="currentPage"
          option-key="id"
          url="/quotation/reference/"
          :toggle-modal="() => {}"
          :is-active-action="(id, is_active) => {}"
          :go-next="() => {}"
          :go-prev="() => {}"
          table-class="table-zebra table-pin-cols table-pin-rows table-sm"
          
        /> -->
      </div>
      
    </CardSection>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import _ from 'lodash';
import pkg from "~/package.json";

// Components
import CardSection from '~/components/card/CardSection.vue';

</script>