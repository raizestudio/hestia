<template>
  <NuxtLayout>
    <SectionFullScreen>
      <div v-if="isLoading" class="flex flex-col justify-center items-center gap-4">
        <span class="loading loading-ring loading-lg"></span>
        <span class="text-2xl font-semibold">{{loadingMessage}}</span>
      </div>
      <div v-else class="flex items-center flex-col gap-10">
        <div class="">
          <h1 class="text-4xl font-black select-none">Connexion</h1>
        </div>
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <label :class="`input input-bordered flex items-center gap-2 ${!isUsernameValid ? 'input-error' : 'input-success'}`">
              <UserIcon />
              <input
                v-model="username"
                type="text"
                :class="`grow`"
                placeholder="Username"
                autofocus
                @keyup="validateUsername"
                @change="validateUsername"
              />
            </label>
            <label :class="`input input-bordered flex items-center gap-2 ${!isPasswordValid ? 'input-error' : 'input-success'}`">
              <KeyIcon />
              <input
                v-model="password"
                type="password"
                class="grow"
                placeholder="Mot de passe"
                @keyup="validatePassword"
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
        <div>
          <span class="btn btn-sm btn-ghost">Je n'arrive pas a me connecter</span>
        </div>
      </div>
    </SectionFullScreen>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import pkg from "~/package.json";

const router = useRouter();
const route = useRoute();

// State
const username = ref("");
const password = ref("");
const isUsernameValid = ref(false);
const isPasswordValid = ref(false);
const pageTitle = ref("Connexion");
const isLoading = ref(false);
const loadingMessage = ref("Chargement...");

// Stores
const userStore = useUserStore();

// Icons
import KeyIcon from "~/components/assets/icons/KeyIcon.vue";
import UserIcon from "~/components/assets/icons/UserIcon.vue";

const login = async () => {
  isLoading.value = true;
  try {
    await userStore.authenticate(username.value, password.value);
    router.push(route.query.redirect as string || "/dashboard");
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const validateUsername = () => {
  isUsernameValid.value = username.value.length > 0;
};

const validatePassword = () => {
  isPasswordValid.value = password.value.length > 0;
};

onMounted(() => {
  document.title = `${pkg.name} - ${pageTitle.value}`;
  validateUsername();
  validatePassword();
});

definePageMeta({
  title: "login",
  name: "login",
  layout: "anonymous",
});
</script>
