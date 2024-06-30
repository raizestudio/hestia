<template>
  <NuxtLayout>
    <div class="flex justify-center items-center flex-grow">
      <div class="flex items-center flex-col gap-10">
        <div class="">
          <h1 class="text-4xl font-black select-none">Connexion</h1>
        </div>
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <label class="input input-bordered flex items-center gap-2">
              <UserIcon />
              <input
                v-model="username"
                type="text"
                class="grow"
                placeholder="Username"
                autofocus
                @change="validateUsername"
              />
            </label>
            <label class="input input-bordered flex items-center gap-2">
              <KeyIcon />
              <input
                v-model="password"
                type="password"
                class="grow"
                placeholder="Mot de passe"
                @change="validatePassword"
              />
            </label>
          </div>
          <button
            class="btn btn-primary"
            :disabled="!isUsernameValid || !isPasswordValid ? true : false"
            @click="login"
          >
            Connexion
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import pkg from "~/package.json";

const router = useRouter();

// State
const username = ref("");
const password = ref("");
const isUsernameValid = ref(false);
const isPasswordValid = ref(false);
const pageTitle = ref("Connexion");

// Stores
const userStore = useUserStore();

// Icons
import KeyIcon from "~/components/assets/icons/KeyIcon.vue";
import UserIcon from "~/components/assets/icons/UserIcon.vue";

const login = async () => {
  await userStore.authenticate(username.value, password.value);
  router.push("/dashboard");
};

const validateUsername = () => {
  isUsernameValid.value = username.value.length > 0;
};

const validatePassword = () => {
  isPasswordValid.value = password.value.length > 0;
};

onMounted(() => {
  document.title = `${pkg.name} - ${pageTitle.value}`;
});

definePageMeta({
  title: "login",
  name: "login",
});
</script>
