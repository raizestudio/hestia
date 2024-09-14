<template>
  <div :class="`flex items-center px-1.5 py-0.5 rounded ${badgeBackground} ${props.containerClasses}`">
    <span
      v-if="props.isCopyable"
      :class="`font-semibold text-xs select-none ${
        themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100'
      } ${props.spanClasses}`"
      @click="() => copyToClipboard(props.text)"
    >
    {{ hasCopiedToClipboard ? 'Id session copié' : props.text }}
    </span>
    <span
      v-else
      :class="`font-semibold text-xs ${
        themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100'
      } ${props.isTextSelectable && !isCopyable ? '' : 'select-none'} ${props.spanClasses}`"
    >
      {{ props.text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Stores
const themeStore = useThemeStore();

const hasCopiedToClipboard = ref(false);

const badgeBackground = computed(() => {
  if (props.color) {
    return `bg-${props.color}-100`;
  }
  return themeStore.current === 'light' ? 'bg-light-100' : 'bg-dark-100';
});

const props = defineProps<{
  text: string;
  containerClasses?: string;
  spanClasses?: string;
  isTextSelectable?: boolean;
  isCopyable?: boolean;
  color?: string;
}>();

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  hasCopiedToClipboard.value = true;
  setTimeout(() => {
    hasCopiedToClipboard.value = false;
  }, 2000);
};
</script>
