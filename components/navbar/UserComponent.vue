<template>
  <DropdownComponent
    margin-top="mt-3"
    v-on-click-outside="() => (showUserDropdown = false)"
  >
    <template v-slot:trigger>
      <div
        :class="
          clsx(
            'relative flex items-center pl-5 pr-2 py-0.5 rounded cursor-pointer',
            themeStore.current === 'light' ? 'bg-dark-300' : 'bg-light-300'
          )
        "
        @click="showUserDropdown = !showUserDropdown"
      >
        <AvatarComponent
          :src="userStore.user.avatar"
          alt="user avatar"
          :first-name="userStore.user.first_name"
          :last-name="userStore.user.last_name"
          width-class="w-8"
          height-class="h-8"
          :class="clsx('absolute -top-1 -left-4 inset-2 border-2')"
          :style="`border-color: ${userStore.user.role.color}`"
        />
        <span
          :class="
            clsx(
              'text-sm font-semibold',
              themeStore.current === 'light'
                ? 'text-light-100'
                : 'text-dark-100'
            )
          "
          >{{ userStore.user.username }}</span
        >
      </div>
    </template>
    <template v-slot:content>
      <DropdownMenu v-if="showUserDropdown">
        <DropdownMenuItem text="Voir profil" url="/profile">
          <template v-slot:icon>
            <ProfileIcon class="w-5 fill-primary-100" />
          </template>
        </DropdownMenuItem>
        <DropdownMenuItem text="Paramètres" url="/settings/user">
          <template v-slot:icon>
            <SettingsMinimalIcon class="w-5 fill-primary-100" />
          </template>
        </DropdownMenuItem>
        <DropdownMenuItem text="Raccourcis">
          <template v-slot:icon>
            <KeyboardIcon class="w-5 fill-primary-100" />
          </template>
        </DropdownMenuItem>
        <HrComponent />
        <DropdownMenuItem text="Entreprise">
          <template v-slot:icon>
            <KeyboardIcon class="w-5 fill-primary-100" />
          </template>
        </DropdownMenuItem>
        <DropdownMenuItem text="Équipe">
          <template v-slot:icon>
            <TeamIcon class="w-5 fill-primary-100" />
          </template>
        </DropdownMenuItem>
        <HrComponent />
        <DropdownMenuItem text="Aide">
          <template v-slot:icon>
            <HelpIcon class="w-5 fill-primary-100" />
          </template>
        </DropdownMenuItem>
        <DropdownMenuItem text="Déconnexion" @click="logUserOut">
          <template v-slot:icon>
            <LogoutIcon class="w-5 fill-primary-100" />
          </template>
        </DropdownMenuItem>
      </DropdownMenu>
    </template>
  </DropdownComponent>
</template>

<script setup lang="ts">
import clsx from "clsx";
import { vOnClickOutside } from "@vueuse/components";

// Components
import DropdownComponent from "@/components/dropdown/DropdownComponent.vue";
import DropdownMenu from "@/components/dropdown/DropdownMenu.vue";
import DropdownMenuItem from "@/components/dropdown/DropdownMenuItem.vue";
import AvatarComponent from "@/components/avatar/AvatarComponent.vue";
import HrComponent from "@/components/hr/HrComponent.vue";

// Icons
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import SettingsMinimalIcon from "@/components/icons/SettingsMinimalIcon.vue";
import KeyboardIcon from "@/components/icons/KeyboardIcon.vue";
import HelpIcon from "@/components/icons/HelpIcon.vue";
import LogoutIcon from "@/components/icons/LogoutIcon.vue";
import TeamIcon from "@/components/icons/TeamIcon.vue";

// Stores
const userStore = useUserStore();
const themeStore = useThemeStore();
const coreStore = useCoreStore();

const router = useRouter();

const showUserDropdown = ref(false);

const logUserOut = () => {
  coreStore.isLoadingGlobal = true;
  coreStore.isLoadingGlobalMessage = "Déconnexion en cours...";
  userStore.logout();
  showUserDropdown.value = false;
  router.push("/auth/login");
};
</script>
