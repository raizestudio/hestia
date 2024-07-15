<template>
  <NuxtLayout>
    <SectionFullScreen>
      <LoginLoading v-if="isLoading" :message="loadingMessage" />
      <div v-else class="flex items-center flex-col gap-10">
        <div class="">
          <DefaultH1 :title="pageTitle" />
        </div>
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <DefaultLoginInput
              v-model="username"
              type="text"
              :class="`grow`"
              placeholder="Utilisateur"
              :is-input-valid="isUsernameValid"
              :icon="UserIcon"
              :onKeyUp="validateUsername"
              :onChange="validateUsername"
            />
            <DefaultLoginInput
              v-model="password"
              type="password"
              :class="`grow`"
              placeholder="Mot de passe"
              :is-input-valid="isPasswordValid"
              :icon="KeyIcon"
              :onKeyUp="validatePassword"
              :onChange="validatePassword"
            />
          </div>
          <DefaultButton
            :disabled="!isUsernameValid || !isPasswordValid ? true : false"
            @click="login"
          >
            <span>Connexion</span>
          </DefaultButton>
        </div>
        <div class="flex flex-col gap-2">
          <button
            v-if="coreStore.settings.let_users_create_account === '1'"
            class="btn btn-sm btn-ghost"
            onclick="responsive_modal.showModal()"
            >Je n'ai pas de compte</button
          >
          <button class="btn btn-sm btn-ghost">
            Je n'arrive pas a me connecter
          </button>
          <span class="text-xs text-end">{{ userStore.session.session }}</span>
        </div>
      </div>
      <DefaultResponsiveModal>
        <CreateFromEmail />
      </DefaultResponsiveModal>
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
const creationEmail = ref("");
const isUsernameValid = ref(false);
const isPasswordValid = ref(false);
const pageTitle = ref("Connexion");
const isLoading = ref(false);
const loadingMessage = ref("Chargement...");

// Stores
const userStore = useUserStore();
const coreStore = useCoreStore();

// Composables
import { getSessionId } from "~/composables/api/useSession";

// Icons
import KeyIcon from "~/components/assets/icons/KeyIcon.vue";
import UserIcon from "~/components/assets/icons/UserIcon.vue";

// Components
import SectionFullScreen from "~/components/section/SectionFullScreen.vue";
import LoginLoading from "~/components/loading/LoginLoading.vue";
import DefaultLoginInput from "~/components/input/DefaultLoginInput.vue";
import DefaultButton from "~/components/button/DefaultButton.vue";
import DefaultH1 from "~/components/title/DefaultH1.vue";
import DefaultResponsiveModal from "~/components/modal/DefaultResponsiveModal.vue";
import CreateFromEmail from "~/components/user/CreateFromEmail.vue";

const login = async () => {
  isLoading.value = true;
  try {
    await userStore.authenticate(username.value, password.value);
    router.push((route.query.redirect as string) || "/dashboard");
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const validateUsername = () => {
  const usernameRegex = /^(?![-_])[a-zA-Z0-9_-]{4,16}(?<![-_])$/;
  if (usernameRegex.test(username.value)) {
    isUsernameValid.value = true;
  } else {
    isUsernameValid.value = false;
  }
};

const validatePassword = () => {
  isPasswordValid.value = password.value.length > 3;
};



onMounted(async () => {
  document.title = `${_.capitalize(pkg.name)} - ${pageTitle.value}`;
  validateUsername();
  validatePassword();

  const data = await getSessionId();
  userStore.session.session = data.session;
});

definePageMeta({
  title: "login",
  name: "login",
  layout: "anonymous",
});
</script>
