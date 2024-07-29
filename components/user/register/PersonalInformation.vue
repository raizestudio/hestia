<template>
  <div class="flex flex-col gap-2 mt-10 basis-1/2">
    <TextInput
      :model-value="first_name"
      name="first_name"
      label="Prénom"
      placeholder="Johnathan"
      :saving="inputConfig[0].saving"
      :valid="inputConfig[0].valid"
      :change-action="(fieldName: string, field: string) => saveUserState(fieldName, field)"
    />
    <TextInput
      :model-value="props.user.last_name"
      name="last_name"
      label="Nom"
      placeholder="Martin"
      :saving="inputConfig[1].saving"
      :valid="inputConfig[1].valid"
      :change-action="(fieldName: string, field: string) => saveUserState(fieldName, field)"
    />
    <PasswordInput
      :model-value="password"
      name="password"
      label="Mot de passe"
      :saving="inputConfig[2].saving"
      :valid="inputConfig[2].valid"
      :change-action="(fieldName: string, field: string) => validatePassword(fieldName, field)"
    />
    <PasswordInput
      :model-value="password2"
      name="password2"
      label="Confirmation mot de passe"
      :saving="inputConfig[3].saving"
      :valid="inputConfig[3].valid"
      :change-action="(fieldName: string, field: string) => validatePassword2(fieldName, field)"
    />
    {{ password }}
    {{ password2 }}
    {{ first_name }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// Composables
import { partialUpdateUser } from "~/composables/api/useUsers";

// Components
import PasswordInput from "~/components/input/PasswordInput.vue";
import TextInput from "~/components/input/TextInput.vue";

// Interfaces
import type { UserInterface } from "~/interfaces/UserInterface";

const props = defineProps<{
  user: UserInterface;
}>();

const password = ref("");
const password2 = ref("");
const first_name = ref(props.user.first_name);
const inputConfig = ref([
  {
    key: "first_name",
    saving: false,
    valid: false,
  },
  {
    key: "last_name",
    saving: false,
    valid: false,
  },
  {
    key: "password",
    saving: false,
    valid: false,
  },
  {
    key: "password2",
    saving: false,
    valid: false,
  },
]) as any;



const validatePassword = (fieldName: string, field: string) => {
  password.value = field;
  inputConfig.value.forEach((input: any) => {
    if (input.key === "password") {
      input.valid = true;
    }
  });
  return password.value.length >= 4;
};

const validatePassword2 = (fieldName: string, field: string) => {
  password2.value = field;
  if (password2.value === password.value) {
    inputConfig.value[3].valid = true;
    saveUserState("password", password.value);
  }
  // inputConfig.value.forEach((input: any) => {
  //   if (input.key === "password2") {
  //     input.valid = true;
  //   }
  // });
};

const saveUserState = async (fieldName: string, field: string) => {
  if (fieldName === "username") {
    first_name.value = field;
  }
  inputConfig.value.forEach((input: any) => {
    if (input.key === fieldName) {
      input.saving = true;
    } else {
      input.saving = false;
    }
  });
  // const token = localStorage.getItem("token");
  // if (!token) return;
  // let fieldFromInput = new FormData(field);
  let data = {} as any;
  data[fieldName] = field;
  try {
    const response = await partialUpdateUser(props.user.username, data);
    inputConfig.value.forEach((input: any) => {
      if (input.key === fieldName) {
        input.valid = true;
      }
    });
    // console.log(response);
  } catch (error) {
    console.error(error);
  } finally {
    inputConfig.value.forEach((input: any) => {
      if (input.key === fieldName) {
        input.saving = false;
      }
    });
  }
};
</script>
