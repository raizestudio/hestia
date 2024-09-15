<template>
  <div class="">
    <div>
      <div>
        <span>Message</span>
      </div>
    </div>
    <div class="flex gap-2 p-1">
      <InputComponent
        :modelValue="inputUsername"
        @input="handleInputUsername"
        placeholder="Veuillez entrer votre message"
        name="support-chat-message"
        class="grow"
      />
      <ButtonComponent><SendIcon class="w-4 h-4" /></ButtonComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import InputComponent from "@/components/input/InputComponent.vue";

// Icons
import SendIcon from "@/components/icons/SendIcon.vue";

const inputUsername = ref("");

const handleInputUsername = (event: InputEvent) => {
  inputUsername.value = (event.target as HTMLInputElement).value;
};
</script>
