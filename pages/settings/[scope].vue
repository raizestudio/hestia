<template>
  <NuxtLayout>
    <SectionFullScreen>
      <CardSection>
        <div>
          <h2 class="text-2xl font-bold">Paramètres de l'application</h2>
          <p class="text-sm opacity-50">
            Gestion des paramètres de l'application
          </p>
        </div>



















        
      </CardSection>
    </SectionFullScreen>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import pkg from "~/package.json";
import _ from "lodash";

const router = useRouter();
const route = useRoute();

import SectionFullScreen from '~/components/section/SectionFullScreen.vue';
import CardSection from '~/components/card/CardSection.vue';

</script>