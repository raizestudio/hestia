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
        <div>
          <div class="flex flex-col gap-2">
            <div v-for="settingValue, settingKey in coreStore.settings" class="flex">
                <div class="join w-full">
                  <label class="btn btn-sm join-item rounded-r-full w-1/4">{{settingKey}}</label>
                  <input
                    type="text"
                    :placeholder="`${settingValue}`"
                    class="input input-sm join-item"
                  />
                  <button class="btn btn-sm btn-warning join-item">Reset</button>
                  <button class="btn btn-sm btn-success join-item">Sauvegarder</button>
                </div>
            </div>
            
          </div>
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

const coreStore = useCoreStore();
import SectionFullScreen from '~/components/section/SectionFullScreen.vue';
import CardSection from '~/components/card/CardSection.vue';

</script>