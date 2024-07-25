<template>
  <div class="flex gap-1">
    <button
      class="btn btn-accent btn-xs"
      @click="() => toggleModal(option[optionKey])"
    >
      <EyeIcon class="w-3.5 h-3.5 fill-base-100" />
    </button>
    <button
      class="btn btn-accent btn-xs"
      @click="() => router.push(`${url}${option[optionKey]}`)"
    >
      <EditIcon class="w-3.5 h-3.5 fill-base-100" />
    </button>
    <button
      class="btn btn-warning btn-xs"
      @click="
        () => isActiveAction(option[optionKey], !option.is_active)
      "
    >
      <CloseIcon class="w-3.5 h-3.5 fill-base-100" />
    </button>
    <button
      v-if="!option.deleted_at"
      class="btn btn-warning btn-xs"
      @click="() => deleteAction(option[optionKey])"
    >
      <ArchiveIcon class="w-3.5 h-3.5 stroke-base-100" />
    </button>
    <button
      v-if="option.deleted_at && !option.restored_at"
      class="btn btn-success btn-xs"
      @click="() => restoreAction(option[optionKey])"
    >
      <ArchiveIcon class="w-3.5 h-3.5 stroke-base-100" />
    </button>
    <button class="btn btn-error btn-xs">
      <DeleteIcon class="w-3.5 h-3.5 stroke-base-100" />
    </button>
    <button class="btn btn-info btn-xs">
      <InfoIcon class="w-3.5 h-3.5 fill-base-100" />
    </button>
  </div>
</template>

<script setup lang="ts">

// Components
import InfoIcon from '../assets/icons/InfoIcon.vue';
import EyeIcon from '../assets/icons/EyeIcon.vue';
import EditIcon from '../assets/icons/EditIcon.vue';
import CloseIcon from '../assets/icons/CloseIcon.vue';
import ArchiveIcon from '../assets/icons/ArchiveIcon.vue';
import DeleteIcon from '../assets/icons/DeleteIcon.vue';

const router = useRouter();

const props = defineProps<{
  option: any;
  optionKey: string;
  url: string;
  isActiveAction: (key: any, isActive: boolean) => void;
  deleteAction: (key: any) => void;
  restoreAction: (key: any) => void;
  toggleModal: (key: any) => void;
}>();
</script>