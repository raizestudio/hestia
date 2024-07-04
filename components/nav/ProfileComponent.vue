<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" class="flex items-center flex-nowrap btn btn-sm btn-ghost" role="button">
      <div class="avatar">
        <div class="w-7 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            :src="`http://localhost:8000${userStore.user.avatar}`"
          />
        </div>
      </div>
      <span class="text-sm whitespace-nowrap">{{userDisplayName}}</span>
    </div>

    <ul
      tabindex="0"
      class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    >
      <li>
        <a class="justify-between" @click="router.push(`/user/${userStore.user.username}`)">
          Profil
          <span class="badge">Nouveau</span>
        </a>
      </li>
      <li><a>Préfèrences</a></li>
      <li @click="logUserOut"><a>Déconnexion</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const router = useRouter();
const userStore = useUserStore()
const coreStore = useCoreStore()

const userDisplayName = computed(() => userStore.user.first_name ? userStore.user.first_name : userStore.user.username);

const logUserOut = () => {
  coreStore.isLoading = true;
  userStore.logout();
  router.push("/login");
  coreStore.isLoading = false;
};
</script>