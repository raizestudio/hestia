<template>
  <Transition>
    <ModalComponent v-if="modalStore.showCreateModal">
      <div
        class="flex flex-col bg-light-100 p-2 rounded w-[80%] h-[80%] shadow-sm"
        v-on-click-outside="() => (modalStore.showCreateModal = false)"
      >
        <div class="flex justify-between items-center">
          <span :class="clsx('font-semibold text-lg')"
            >Que souhaitez vous créer ?</span
          >
          <ButtonComponent @click="() => (modalStore.showCreateModal = false)"><CloseIcon class="w-5 h-5" /></ButtonComponent>
        </div>
        <div class="grow">Body</div>
        <div class="flex justify-end gap-2">
          <ButtonComponent class="bg-light-200" @click="() => (modalStore.showCreateModal = false)">Annuler</ButtonComponent>
          <ButtonComponent
            class="bg-primary-100 hover:bg-primary-300 text-light-100"
            >Créer</ButtonComponent
          >
        </div>
      </div>
    </ModalComponent>
  </Transition>
</template>

<script setup lang="ts">
import clsx from "clsx";
import { vOnClickOutside } from "@vueuse/components";

// Components
import ButtonComponent from "@/components/button/ButtonComponent.vue";
import ModalComponent from "./ModalComponent.vue";

// Icons
import CloseIcon from "@/components/icons/CloseIcon.vue";

// Stores
const themeStore = useThemeStore();
const modalStore = useModalStore();
</script>
