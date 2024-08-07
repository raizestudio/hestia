<template>
  <SectionTitle
    title="Créer service"
    description="Vue pour la création d'un service"
  />
  <div class="flex flex-col gap-4">
    <div class="flex">
      <div class="flex flex-col gap-2">
        <TextInput
          v-model="service.name"
          label="Comment voulez vous l'appeler?"
          name="name"
          placeholder="Monter un meuble ..."
          :change-action="(fieldName, field) => console.log(fieldName, field)"
        />
        <span>{{ service.name }}</span>
        <TextArea
          v-model="service.description"
          placeholder="Assemblage meuble 60x90 IKEA"
        />
        <CheckboxInput label="Est actif" :is-checked="service.is_active" />
        <TextInput
          v-model="service.name"
          label="Tags"
          name="tags"
          placeholder="meuble, ikea, assemblage, ..."
          :change-action="(fieldName, field) => console.log(fieldName, field)"
        />
        <TextInput
          v-model="service.name"
          label="Catégories"
          name="categories"
          placeholder="coaching, bricolage, ..."
          :change-action="(fieldName, field) => console.log(fieldName, field)"
        />
      </div>
      <div class="flex flex-col gap-1"></div>
    </div>
    <div class="flex justify-end gap-2">
      <button class="btn btn-sm btn-error">Annuler</button>
      <button class="btn btn-sm btn-primary" @click="handleCreateService">
        Créer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createService } from "~/composables/api/useServices";

// Interfaces
import type { ServiceInterface } from "~/interfaces/ServiceInterface";

// Components
import SectionTitle from "~/components/title/SectionTitle.vue";
import TextInput from "~/components/input/TextInput.vue";
import TextArea from "~/components/input/TextArea.vue";
import CheckboxInput from "~/components/input/CheckboxInput.vue";

const props = defineProps<{
  refreshAction: () => void;
}>();

const service = ref<ServiceInterface>({
  id: null,
  name: "",
  description: "",
  is_active: false,
  tags: null,
  categories: null,
  slug: null,
  created_at: null,
  updated_at: null,
  author: null,
  updated_by: null,
  restored_at: null,
  deleted_at: null,
});

const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, "-");
};

const handleCreateService = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const data = {
    name: service.value.name,
    description: service.value.description,
    is_active: service.value.is_active,
    slug: generateSlug(service.value.name),
  };
  console.log(data.name);
  const response: any = await createService(token, data);
  console.log(response);
  props.refreshAction();
};
</script>
