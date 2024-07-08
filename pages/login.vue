<template>
  <NuxtLayout>
    <SectionFullScreen>
      <LoginLoading v-if="isLoading" :message="loadingMessage" />
      <div v-else class="flex items-center flex-col gap-10">
        <div class="">
          <h1 class="text-4xl font-black select-none">Connexion</h1>
        </div>
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <DefaultLoginInput
              v-model="username"
              type="text"
              :class="`grow`"
              placeholder="Utilisateur"
              :isInputValid="isUsernameValid"
              :icon="UserIcon"
              :onKeyUp="validateUsername"
              :onChange="validateUsername"
            />
            <DefaultLoginInput
              v-model="password"
              type="password"
              :class="`grow`"
              placeholder="Mot de passe"
              :isInputValid="isUsernameValid"
              :icon="KeyIcon"
              :onKeyUp="validatePassword"
              :onChange="validatePassword"
            />
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
import _ from "lodash";

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

// Components
import SectionFullScreen from "~/components/section/SectionFullScreen.vue";
import LoginLoading from "~/components/loading/LoginLoading.vue";
import DefaultLoginInput from "~/components/input/DefaultLoginInput.vue";

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
  document.title = `${_.capitalize(pkg.name)} - ${pageTitle.value}`;
  validateUsername();
  validatePassword();
});

definePageMeta({
  title: "login",
  name: "login",
  layout: "anonymous",
});
</script>
