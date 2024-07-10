<template>
  <NuxtLayout>
    <SectionFullScreen>
      <CardSection>
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl font-black">Services</h1>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <!-- head -->
              <thead>
                <tr>
                  <th></th>
                  <th>Libellé</th>
                  <th>Description</th>
                  <th>Service</th>
                  <th>Lieu</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="quotationReference, index in quotationReferences">
                  <th>{{index + 1}}</th>
                  <td>{{quotationReference.label}}</td>
                  <td>{{quotationReference.description}}</td>
                  <td>{{quotationReference.service}}</td>
                  <td>{{quotationReference.place}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardSection>
    </SectionFullScreen>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import _ from 'lodash';
import pkg from "~/package.json";

import { fetchQuotationReferences } from '~/composables/api/useQuotations';
import type { QuotationReferenceInterface } from '~/interfaces/QuotationInterface';

const quotationReferences = ref([] as QuotationReferenceInterface[]);
onMounted(async () => {
  document.title = `Administration services - ${_.capitalize(pkg.name)}`;
  const token = localStorage.getItem('token');
  quotationReferences.value = await fetchQuotationReferences(token);
});

definePageMeta({
  title: "Administration - Services",
  middleware: "auth",
});
</script>
