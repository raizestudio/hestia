<template>
  <NuxtLayout>
    <div class="flex justify-center items-center flex-grow">
      <div class="flex items-center flex-col gap-10">
        <div class="">
          <h1 class="text-4xl font-black select-none">Connexion</h1>
        </div>
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <label class="input input-bordered flex items-center gap-2">
              <UserIcon />
              <input v-model="username" type="text" class="grow" placeholder="Username" />
            </label>
            <label class="input input-bordered flex items-center gap-2">
              <KeyIcon />
              <input v-model="password" type="text" class="grow" placeholder="Password" />
            </label>
          </div>
          <button class="btn btn-primary" @click="login">Connexion</button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const router = useRouter()

// State
const username = ref('')
const password = ref('')

// Stores
const userStore = useUserStore()


// Icons
import KeyIcon from "~/components/icons/KeyIcon.vue";
import UserIcon from "~/components/icons/UserIcon.vue";


const login = async () => {
  await userStore.authenticate(username.value, password.value)
  router.push('/')
}

const pageTitle = ref('Connexion');

// useMeta(() => ({
//   title: pageTitle.value,
//   meta: [
//     {
//       hid: 'description',
//       name: 'description',
//       content: 'This is a dynamic page description for the Connexion page',
//     },
//   ],
// }));

// watch(username, (newUsername) => {
//   pageTitle.value = newUsername ? `Connexion - ${newUsername}` : 'Connexion';
// });
</script>