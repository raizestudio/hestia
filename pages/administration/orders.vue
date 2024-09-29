<template>
  <NuxtLayout>
    <div :class="clsx('grid grid-cols-2')">
      <div :class="clsx('flex flex-col gap-2')">
        <span>Services</span>
        <div
          v-for="service in fakeServices"
          :key="service.id"
          :class="clsx('flex items-center gap-2')"
        >
          <div :class="clsx('flex gap-2 bg-light-200 p-1 rounded')">
            <div>{{ service.name }}</div>
            <div>{{ service.description }}</div>
            <div>{{ service.estimated_duration }}</div>
            <div>{{ service.created_at }}</div>
          </div>
          <div>
            <ButtonComponent
              :class="clsx('bg-primary-100 text-light-100')"
              @click="() => moveServiceToOrder(fakeServices[service.id])"
              >Ajouter</ButtonComponent
            >
          </div>
        </div>
      </div>
      <div :class="clsx('flex flex-col gap-2 p-1')">
        <span>Panier</span>
        <div
          v-for="(index, order) in fakeOrders"
          :id="index"
          :class="clsx('flex justify-between')"
        >
          <div :class="clsx('flex grow justify-between items-center gap-2 bg-light-200 rounded')">
            <div>{{ order }}</div>
            <div :class="clsx('bg-light-300 rounded p-1')">{{ index }}</div>
          </div>
          <div>
            <ButtonComponent @click="() => removeServiceFromOrder(order)">Retirer</ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import clsx from "clsx";
import { onMounted } from "vue";

// Stores
const serviceStore = useServiceStore();
const orderStore = useOrderStore();

const fakeServices = ref([
  {
    id: 0,
    name: "Service 1",
    description: "Description 1",
    is_active: true,
    deleted_at: null,
    restored_at: null,
    estimated_duration: 1,
    created_at: "2022-01-01",
  },
  {
    id: 1,
    name: "Service 2",
    description: "Description 2",
    is_active: true,
    deleted_at: null,
    restored_at: null,
    estimated_duration: 2,
    created_at: "2022-01-02",
  },
] as any[]);

const fakeOrders = ref({} as any);

const moveServiceToOrder = (service: any) => {
  if (fakeOrders.value[service.name]) {
    fakeOrders.value[service.name]++;
  } else {
    fakeOrders.value[service.name] = 1;
  }
};

const removeServiceFromOrder = (serviceName: any) => {
  if (fakeOrders.value[serviceName]) {
    fakeOrders.value[serviceName]--;
    if (fakeOrders.value[serviceName] === 0) {
      delete fakeOrders.value[serviceName];
    }
  }
};

watch(
  fakeOrders,
  (value) => {
    orderStore.fakeCounter = Object.values(value).reduce((acc: any, curr: any) => acc + curr, 0);
  },
  { deep: true }
);
definePageMeta({
  middleware: "auth",
});
</script>
