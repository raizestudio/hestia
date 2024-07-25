<template>
  <div class="flex items-center gap-2">
    <div class="grid justify-items-end grid-rows-2 gap-1">
      <div class="flex gap-2">
        <button
          class="btn btn-primary btn-xs"
          :disabled="props.shouldDisable"
          :onclick="createAction"
        >
          <PlusIcon class="w-5 h-5" />
          <span class="text-content font-semibold">Ajouter</span>
        </button>
        <button
          class="btn btn-primary btn-xs"
          :disabled="props.shouldDisable"
          @click="() => refreshAction(currentSfScope)"
        >
          <ArrowPathIcon class="w-5 h-5" />
          <span class="text-content font-semibold">Actualiser</span>
        </button>
        <button
          v-if="currentSfScope !== 'deleted'"
          class="btn btn-primary btn-xs"
          :disabled="props.shouldDisable"
          @click="() => updateScopeAction('deleted')"
        >
          <span class="text-content font-semibold">Voir archivés</span>
        </button>
        <button
          v-if="currentSfScope !== 'all'"
          class="btn btn-primary btn-xs"
          :disabled="props.shouldDisable"
          @click="() => updateScopeAction('all')"
        >
          <span class="text-content font-semibold">Voir tout</span>
        </button>
        <button
          v-if="currentSfScope"
          class="btn btn-warning btn-xs"
          :disabled="props.shouldDisable"
          @click="() => updateScopeAction('')"
        >
          <span class="text-content font-semibold">Réinitialiser</span>
        </button>
      </div>
      <div v-if="selectedRowsCount && selectedRowsCount > 0" class="flex gap-2">
        <div></div>
        <button class="btn btn-warning btn-xs" :disabled="props.shouldDisable">
          <CloseIcon class="w-5 h-5 fill-base-100" />
          <span class="text-base-100 font-semibold">{{
            selectedRowsCount
          }}</span>
        </button>
        <button class="btn btn-error btn-xs" :disabled="props.shouldDisable">
          <ArchiveIcon class="w-5 h-5 stroke-base-100" />
          <span class="text-base-100 font-semibold">{{
            selectedRowsCount
          }}</span>
        </button>
        <button class="btn btn-error btn-xs" :disabled="props.shouldDisable">
          <DeleteIcon class="w-5 h-5 stroke-base-100" />
          <span class="text-base-100 font-semibold">{{
            selectedRowsCount
          }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Icons
import PlusIcon from "~/components/assets/icons/PlusIcon.vue";
import ArrowPathIcon from "~/components/assets/icons/ArrowPathIcon.vue";
import CloseIcon from "~/components/assets/icons/CloseIcon.vue";
import ArchiveIcon from "~/components/assets/icons/ArchiveIcon.vue";
import DeleteIcon from "~/components/assets/icons/DeleteIcon.vue";

const props = defineProps<{
  currentSfScope: string;
  createAction: string;
  selectedRowsCount?: number;
  shouldDisable?: boolean;
  refreshAction: (currentSfScope: string) => void;
  updateScopeAction: (scope: string) => void;
}>();
</script>
