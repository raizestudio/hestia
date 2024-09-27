<template>
  <NuxtLayout>
    <div class="flex flex-col grow">
      <div class="flex flex-col justify-center items-center grow">
        <div class="flex flex-col items-center gap-2">
          <span
            :class="clsx('text-4xl font-semibold text-primary-100 text-center')"
            >La nouvelle application arrive bientôt!</span
          >
          <span
            :class="
              clsx(
                'text-center',
                themeStore.current === 'light'
                  ? 'text-dark-200'
                  : 'text-light-200'
              )
            "
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit alias
            nihil incidunt.
          </span>
        </div>
        <div class="flex items-center gap-4 mt-8">
          <InputComponent
            :model-value="email"
            type="email"
            name="email"
            placeholder="Entrez votre email"
            class="w-80"
            input-classes="p-2"
            pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
          />
          <ButtonComponent
            :class="clsx('bg-primary-100 hover:bg-primary-300 text-light-100')"
            padding-class="p-2"
            >M'avertir</ButtonComponent
          >
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-center p-2">
        <div class="flex grow">
          <span
            :class="
              clsx(
                'hover:text-primary-100 cursor-pointer transition-colors duration-300 ease-in-out',
                themeStore.current === 'light'
                  ? 'text-dark-300'
                  : 'text-light-300'
              )
            "
            >Politique de confidentialité</span
          >
        </div>
        <div class="flex gap-2">
          <span
            :class="
              clsx(
                '',
                themeStore.current === 'light'
                  ? 'text-dark-300'
                  : 'text-light-300'
              )
            "
            >Nos réseaux:
          </span>
          <div class="flex gap-1">
            <FacebookIcon
              :class="
                clsx(
                  'w-6 h-6 hover:fill-primary-300 transition-colors duration-300 ease-in-out cursor-pointer',
                  themeStore.current === 'light'
                    ? 'fill-light-300'
                    : 'fill-dark-300'
                )
              "
            />
            <InstagramIcon
              :class="
                clsx(
                  'w-6 h-6 hover:fill-primary-300 transition-colors duration-300 ease-in-out cursor-pointer',
                  themeStore.current === 'light'
                    ? 'fill-light-300'
                    : 'fill-dark-300'
                )
              "
            />
            <TwitterIcon
              :class="
                clsx(
                  'w-6 h-6 hover:fill-primary-300 transition-colors duration-300 ease-in-out cursor-pointer',
                  themeStore.current === 'light'
                    ? 'fill-light-300'
                    : 'fill-dark-300'
                )
              "
            />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import packageJson from "@/package.json";
import clsx from "clsx";

// Helpers
import { capitalize } from "~/utils/textHelper";

// Icons
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import InstagramIcon from "@/components/icons/InstagramIcon.vue";
import TwitterIcon from "@/components/icons/TwitterIcon.vue";

// Stores
const themeStore = useThemeStore();

const email = ref("");
definePageMeta({
  layout: "landing",
});

useSeoMeta({
  title: `${capitalize(packageJson.name)} - Accueil`,
  description: "This is the home page",
});
</script>
