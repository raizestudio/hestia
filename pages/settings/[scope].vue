<template>
  <NuxtLayout>
    <SectionFullScreen>
      <CardSection>
        <div class="flex flex-col gap-6 h-full">
          <div>
            <h2 class="text-2xl font-bold">Paramètres de l'application</h2>
            <p class="text-sm opacity-50">
              Gestion des paramètres de l'application
            </p>
          </div>
          <div class="grow">
            <div class="flex flex-col gap-4">
              <div class="flex">
                <label
                  class="flex items-center btn-sm bg-base-200 join-item rounded-l w-1/3 font-bold"
                >
                  Nom de l'application
                </label>
                <input
                  v-model="settings.app_name"
                  type="text"
                  :placeholder="`${coreStore.settings.app_name}`"
                  class="input-sm input-ghost w-1/3 outline-none border border-base-200"
                />
                <button class="btn-sm bg-warning">
                  <ResetIcon class="w-4 h-4" />
                </button>
                <button class="btn-sm bg-success rounded-r join-item" @click="() => updateSetting('app_name', settings.app_name)">
                  <SaveIcon class="w-4 h-4" />
                </button>
              </div>
              <div class="flex">
                <label
                  class="flex items-center btn-sm bg-base-200 join-item rounded-l w-1/3 font-bold"
                >
                  Description de l'application
                </label>
                <input
                  v-model="settings.app_description"
                  type="text"
                  :placeholder="`${coreStore.settings.app_description}`"
                  class="input-sm input-ghost w-1/3 outline-none border border-base-200"
                />
                <button class="btn-sm bg-warning">
                  <ResetIcon class="w-4 h-4" />
                </button>
                <button class="btn-sm bg-success rounded-r join-item" @click="() => updateSetting('app_description', settings.app_description)">
                  <SaveIcon class="w-4 h-4" />
                </button>
              </div>
              <div class="flex items-center gap-2">
                <label
                  class="flex items-center btn-sm bg-base-200 join-item rounded-l w-1/3 font-bold"
                >
                  Accepte les nouvelles inscriptions
                </label>
                <input
                  type="checkbox"
                  class="toggle"
                  :checked="settings.let_users_create_account === '1' ? true : false"
                  @change="() => settings.let_users_create_account === '1' ? settings.let_users_create_account = '0' : settings.let_users_create_account = '1'"
                />
                <button class="btn-sm bg-warning">
                  <ResetIcon class="w-4 h-4" />
                </button>
                <button class="btn-sm bg-success rounded-r join-item" @click="() => updateSetting('let_users_create_account', settings.let_users_create_account)">
                  <SaveIcon class="w-4 h-4" />
                </button>
              </div>
              <div class="flex items-center gap-2">
                <label
                  class="flex items-center btn-sm bg-base-200 join-item rounded-l w-1/3 font-bold"
                >
                  Les utilisateurs peuvent réinitialiser leur mot de passe
                </label>
                <input
                  type="checkbox"
                  class="toggle"
                  :checked="settings.let_users_reset_password === '1' ? true : false"
                  @change="() => settings.let_users_reset_password === '1' ? settings.let_users_reset_password = '0' : settings.let_users_reset_password = '1'"
                />
                <button class="btn-sm bg-warning">
                  <ResetIcon class="w-4 h-4" />
                </button>
                <button class="btn-sm bg-success rounded-r join-item" @click="() => updateSetting('let_users_reset_password', settings.let_users_reset_password)">
                  <SaveIcon class="w-4 h-4" />
                </button>
              </div>
              <div class="flex items-center gap-2">
                <label
                  class="flex items-center btn-sm bg-base-200 join-item rounded-l w-1/3 font-bold"
                >
                  Les nouveaux comptes nécessitent une approbation
                </label>
                <input
                  type="checkbox"
                  class="toggle"
                  :checked="settings.new_accounts_need_approval === '1' ? true : false"
                  @change="() => settings.new_accounts_need_approval === '1' ? settings.new_accounts_need_approval = '0' : settings.new_accounts_need_approval = '1'"
                />
                <button class="btn-sm bg-warning">
                  <ResetIcon class="w-4 h-4" />
                </button>
                <button class="btn-sm bg-success rounded-r join-item" @click="() => updateSetting('new_accounts_need_approval', settings.new_accounts_need_approval)">
                  <SaveIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <div class="grow">
              <span>Lorem ipsum</span>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-sm btn-warning">Reset</button>
              <button class="btn btn-sm btn-success">Enregistrer</button>
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

// Components
import SectionFullScreen from "~/components/section/SectionFullScreen.vue";
import CardSection from "~/components/card/CardSection.vue";

// Interfaces
import type { SettingsInterface } from "~/interfaces/SettingInterface";
// Icons
import ResetIcon from "~/components/assets/icons/ResetIcon.vue";
import SaveIcon from "~/components/assets/icons/SaveIcon.vue";

const settings = ref<SettingsInterface>({
  app_name: "",
  app_description: "",
  let_users_create_account: '0',
  let_users_reset_password: '0',
  new_accounts_need_approval: '0',
});

onMounted(() => {
  settings.value.let_users_create_account = coreStore.settings.let_users_create_account;
  settings.value.let_users_reset_password = coreStore.settings.let_users_reset_password;
  settings.value.new_accounts_need_approval = coreStore.settings.new_accounts_need_approval;
});

const updateSetting = (key: string, value: string | boolean) => {
  console.log(`Updating ${key} with value ${value}`);
  coreStore.updateSetting(key, value);
};

definePageMeta({
  title: "Paramètres de l'application",
  description: "Gestion des paramètres de l'application",
  middleware: "auth",
});
</script>
