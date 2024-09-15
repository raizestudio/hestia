<template>
  <NuxtLayout>
    <div class="flex justify-center items-center h-full">
      <div
        :class="`flex flex-col justify-center items-center px-6 py-4 rounded ${
          themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
        }`"
      >
        <div class="flex justify-center mb-4">
          <span
            :class="`font-black text-2xl ${
              themeStore.current === 'light'
                ? 'text-dark-100'
                : 'text-light-100'
            }`"
            >Connexion</span
          >
        </div>
        <div class="flex flex-col gap-2">
          <InputComponent
            label="Email"
            name="email"
            :modelValue="inputUsername"
            type="email"
            placeholder="Entrez votre email"
            labelClasses="text-sm"
            inputClasses="px-2.5 py-1.5"
            @input="handleInputUsername"
          />
          <InputComponent
            label="Password"
            name="password"
            :modelValue="inputPassword"
            type="password"
            placeholder="Entrez votre email"
            labelClasses="text-sm"
            inputClasses="px-2.5 py-1.5"
            @input="handleInputPassword"
          />
          <ButtonComponent
            extraClasses="w-min self-center items-center flex justify-center mt-4"
            @click="handleAuth"
          >
            <span>Entrer</span>
            <LoginIcon
              class="w-7"
              arrow-classes="fill-primary-200"
              door-classes="fill-primary-100"
            />
          </ButtonComponent>
        </div>
        <div class="flex flex-col items-center gap-1 mt-4">
          <span
            :class="`text-sm ${
              themeStore.current === 'light'
                ? 'text-dark-100'
                : 'text-light-100'
            }`"
            ><nuxt-link to="/auth/register">Inscrivez-vous</nuxt-link></span
          >
          <span
            :class="`text-sm ${
              themeStore.current === 'light'
                ? 'text-dark-100'
                : 'text-light-100'
            }`"
            >J'ai besoin d'assistance</span
          >
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import packageJson from "@/package.json";

// Components
import InputComponent from "@/components/input/InputComponent.vue";
import ButtonComponent from "@/components/button/ButtonComponent.vue";

// Icons
import LoginIcon from "@/components/icons/LoginIcon.vue";

// Helpers
import { capitalize } from "@/helpers/textHelper";

// Stores
const themeStore = useThemeStore();
const userStore = useUserStore();
const coreStore = useCoreStore();

const router = useRouter();

const inputUsername = ref("");
const inputPassword = ref("");

const handleInputUsername = (event: InputEvent) => {
  inputUsername.value = (event.target as HTMLInputElement).value;
};

const handleInputPassword = (event: InputEvent) => {
  inputPassword.value = (event.target as HTMLInputElement).value;
};

const handleAuth = async () => {
  coreStore.isLoadingLocal = true;
  try {
    await userStore.handleAuthentication(
      inputUsername.value,
      inputPassword.value
    );
    router.push("/dashboard");
  } catch (error) {
  } finally {
    coreStore.isLoadingLocal = false;
  }
};

definePageMeta({
  middleware: "auth",
})

useSeoMeta({
  title: `${capitalize(packageJson.name)} - Connexion`,
  description: "This is the home page",
});
</script>
