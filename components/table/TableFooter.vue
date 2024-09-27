<template>
  <div :class="clsx('flex gap-2 rounded')">
    <div class="grow">TFoot</div>
    <div class="flex gap-2">
      <ButtonComponent
        :class="
          clsx(
            '',
            themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
          )
        "
      >
        {{ props.currentPage }}
        <span class="font-semibold">/</span>
        {{ totalPages }}
      </ButtonComponent>
      <ButtonComponent
        :class="
          clsx(
            '',
            themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
          )
        "
      >
        <span class="font-semibold">Items par page:</span>
        {{ props.entitiesPerPage }}
      </ButtonComponent>
      <ButtonComponent
        :class="
          clsx(
            '',
            themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
          )
        "
      >
        <span class="font-semibold">Total:</span> {{ props.entityCount }}
      </ButtonComponent>
      <ButtonComponent
        :class="
          clsx(
            '',
            themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
          )
        "
        :is-disabled="!props.hasPrev"
        ><ArrowFilledIcon
          :class="
            clsx(
              'w-4 h-4',
              themeStore.current === 'light'
                ? 'fill-dark-100'
                : 'fill-light-100'
            )
          "
      /></ButtonComponent>
      <ButtonComponent
        :class="
          clsx(
            '',
            themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
          )
        "
        :is-disabled="!props.hasNext"
        ><ArrowFilledIcon
          :class="
            clsx(
              'w-4 h-4 -rotate-180',
              themeStore.current === 'light'
                ? 'fill-dark-100'
                : 'fill-light-100'
            )
          "
      /></ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Components

// Icons
import ArrowFilledIcon from "@/components/icons/ArrowFilledIcon.vue";

// Stores
const themeStore = useThemeStore();

const totalPages = computed(() => {
  return Math.ceil(props.entityCount / props.entitiesPerPage);
});

const props = defineProps<{
  entityCount: number;
  entitiesPerPage: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}>();
</script>
