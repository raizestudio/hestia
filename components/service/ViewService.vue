<template>
  <SectionTitle v-if="service" :title="`Service ${service.name}`" :description="service.description"/>
  <div>
    <!-- <TextInput v-model="service.name" label="Name" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// Components
import SectionTitle from '~/components/title/SectionTitle.vue';
import TextInput from '~/components/input/TextInput.vue';

// Composables
import { retrieveService } from '~/composables/api/useServices';

// Interfaces
import type { ServiceInterface } from '~/interfaces/ServiceInterface';

const route = useRoute()

const service = ref({} as ServiceInterface);

const props = defineProps<{
  serviceId: string;
}>();


onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) return;
  let response: any = null;
  response = await retrieveService(token, String(props.serviceId));
  service.value = response;
})

watch(() => props.serviceId, async (newServiceId) => {
  console.log("watched");
  console.log(newServiceId);
  const token = localStorage.getItem('token');
  if (!token) return;

  const response = await retrieveService(token, String(newServiceId));
  service.value = response;
});
</script>