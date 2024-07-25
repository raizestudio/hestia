<template>
  <NuxtLayout>
    <CardSection>
      <ViewService :service-id="String(serviceId)" />
    </CardSection>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Composables
import { retrieveService } from '~/composables/api/useServices'

// Interfaces
import type { ServiceInterface } from '~/interfaces/ServiceInterface';

// Components
import CardSection from '~/components/card/CardSection.vue';
import ViewService from '~/components/service/ViewService.vue';

const route = useRoute()

const serviceId = ref(route.params.serviceId)

definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Service',
  description: 'Service description'
})
</script>