<template>
  <NuxtLayout>
    <div class="flex justify-center items-center  h-full">
      <div
        :class="`px-6 py-10 rounded shadow-sm ${
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
            labelClasses="text-md"
            inputClasses="px-2 py-2"
          />
          <InputComponent
            label="Password"
            name="password"
            modelValue=""
            type="password"
            placeholder="Entrez votre email"
            labelClasses="text-md"
            inputClasses="px-2 py-2"
          />
          <ButtonComponent extraClasses="mt-4" @click="mockAuth">
            Connexion
          </ButtonComponent>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

// Stores
const themeStore = useThemeStore();
const userStore = useUserStore();

// Components
import InputComponent from "~/components/input/InputComponent.vue";
import ButtonComponent from "~/components/button/ButtonComponent.vue";

const router = useRouter();

const mockAuth = () => {
  userStore.isAuthenticated = true;
  router.push('/dashboard');
}

// definePageMeta({
// })

useSeoMeta({
  title: "Home",
  description: "This is the home page",
});
</script>
