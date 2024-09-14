<template>
  <NuxtLayout>
    <div class="flex justify-center items-center h-full">
      <div
        :class="`px-6 py-4 rounded ${
          themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
        }`"
      >
        <div class="flex justify-center">
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
            modelValue=""
            type="email"
            placeholder="Entrez votre email"
            labelClasses="text-sm"
            inputClasses="px-2.5 py-1.5"
          />
          <InputComponent
            label="Password"
            name="password"
            modelValue=""
            type="password"
            placeholder="Entrez votre email"
            labelClasses="text-sm"
            inputClasses="px-2.5 py-1.5"
          />
          <ButtonComponent extraClasses="mt-4" @click="mockAuth">
            Connexion
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

// Stores
const themeStore = useThemeStore();
const userStore = useUserStore();

// Components
import InputComponent from "~/components/input/InputComponent.vue";
import ButtonComponent from "~/components/button/ButtonComponent.vue";

// Helpers
import { capitalize } from "~/helpers/textHelper";

const router = useRouter();

const mockAuth = () => {
  userStore.isAuthenticated = true;
  router.push("/dashboard");
};

// definePageMeta({
// })

useSeoMeta({
  title: `${capitalize(packageJson.name)} - Connexion`,
  description: "This is the home page",
});
</script>
