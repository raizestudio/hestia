<template>
  <DropdownComponent v-on-click-outside="() => showChat = false">
    <template v-slot:trigger>
      <div
        :class="`cursor-pointer rounded-full p-1 ${
          themeStore.current === 'light'
            ? 'hover:bg-light-300'
            : 'hover:bg-dark-300'
        }`"
        @click="showChat = !showChat"
      >
        <SupportIcon
          :class="`w-6 transition-colors duration-300 ease-in-out ${
            themeStore.current === 'light' ? 'fill-dark-300' : 'fill-light-300'
          }`"
        />
      </div>
    </template>
    <template v-slot:content>
      <SupportChatDropdownContent v-if="showChat" />
    </template>
  </DropdownComponent>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'

// Components
import DropdownComponent from '@/components/dropdown/DropdownComponent.vue';
import SupportChatDropdownContent from '@/components/chat/SupportChatDropdownContent.vue';

// Icons
import SupportIcon from '@/components/icons/SupportIcon.vue';

// Stores
const themeStore = useThemeStore();

const showChat = ref(false);
</script>