<template>
  <div :class="`avatar ${avatarClass || ''}`">
    <div :class="`mask mask-squircle ${maskClass}`">
      <img
        v-if="props.avatar.length > 0"
        :src="props.avatar"
        :alt="`${props.label} avatar`"
        :class="`${imgClass}`"
        
      />
      <div
        v-else
        :class="`flex items-center justify-center h-full w-full ${!props.userFirstName && !props.userLastName ? 'bg-info opacity-40' : 'bg-accent-content'} ${altClass}`"
      >
        <span class="font-semibold text-base-100">
          {{
            props.userFirstName ? props.userFirstName.charAt(0).toUpperCase() : ""
          }}
          {{
            props.userLastName ? props.userLastName.charAt(0).toUpperCase() : ""
          }}
          {{ !props.userFirstName && !props.userLastName ? props.label.charAt(0).toUpperCase() : "" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  avatar: string;
  label: string;
  userFirstName?: string;
  userLastName?: string;
  avatarClass?: string;
  maskClass?: string;
  imgClass?: string;
  altClass?: string;
}>();
</script>
