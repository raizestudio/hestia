<template>
  <div class="flex px-1 py-0.5 items-center mt-2 gap-4">
    <div class="flex grow gap-2">
      <button
        :class="`btn btn-sm ${hasPrev ? 'btn-ghost' : 'btn-disabled'}`"
        :disabled="props.shouldDisable"
        @click="props.goPrev"
      >
        <ChevronIcon />
      </button>
      <button
        :class="`btn btn-sm ${hasNext ? 'btn-ghost' : 'btn-disabled'}`"
        :disabled="props.shouldDisable"
        @click="props.goNext"
      >
        <ChevronIcon class="rotate-180" />
      </button>
    </div>
    <div class="flex gap-2"></div>

    <div class="flex gap-2">
      <!-- <span class="bg-content px-2 py-1 shadow rounded-sm"
        >Items total: <span class="">{{ props.count }}</span></span
      > -->
      <button class="btn btn-sm btn-content">
        <span>Items: {{ props.count }}</span>
      </button>
      <button class="btn btn-sm btn-content">
        <span
          >De:
          {{ currentItemStartCount }}
          à
          {{ currentItemEndCount }}
        </span>
      </button>
      <DefaultDropdown>
        <template #trigger>
          <button class="btn btn-sm btn-content" :disabled="props.shouldDisable">
            <span>Pages: {{ pagesCount }}</span>
          </button>
        </template>
        <template #content>
          <div class="max-h-72 overflow-scroll flex flex-col">
            <li
              v-for="(_, index) in pagesCount"
              @click="() => props.goToPage(Number(pagesCount) - index)"
            >
              <a>{{ Number(pagesCount) - index }}</a>
            </li>
          </div>
        </template>
      </DefaultDropdown>

      <DefaultDropdown>
        <template #trigger>
          <button class="btn btn-sm btn-content" :disabled="props.shouldDisable">
            <span>Items par page: {{ props.optionsCount }}</span>
          </button>
        </template>
        <template #content>
          <li @click="() => props.updateItemsPerPage(10)"><a>10</a></li>
          <li @click="() => props.updateItemsPerPage(20)"><a>20</a></li>
          <li @click="() => props.updateItemsPerPage(50)"><a>50</a></li>
          <li @click="() => props.updateItemsPerPage(100)"><a>100</a></li>
        </template>
      </DefaultDropdown>
      <button class="btn btn-sm btn-content">
        <span>Page: {{ props.currentPage }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Compoenents
import DefaultDropdown from "~/components/dropdown/DefaultDropdown.vue";

// Icons
import ChevronIcon from "~/components/assets/icons/ChevronIcon.vue";

const props = defineProps<{
  count?: number;
  currentPage?: number;
  optionsCount: number;
  goPrev?: () => void;
  goNext?: () => void;
  updateItemsPerPage: (itemsPerPage: number) => void;
  goToPage: (page: number) => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  shouldDisable?: boolean;
}>();

const pagesCount = computed(() => {
  if (!props.count) return "";

  if (!props.hasNext) {
    return props.currentPage;
  } else {
    return Math.ceil(props.count / props.optionsCount);
  }
});

const currentItemStartCount = computed(() => {
  if (!props.count || !props.currentPage) return "";

  if (!props.hasNext) {
    return props.count - props.optionsCount;
  } else {
    return props.optionsCount * props.currentPage - props.optionsCount;
  }
});

const currentItemEndCount = computed(() => {
  if (!props.currentPage) return "";
  if (!props.hasNext) {
    return props.count;
  } else {
    return props.optionsCount * props.currentPage;
  }
});
</script>
