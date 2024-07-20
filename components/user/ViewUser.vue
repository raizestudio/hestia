<template>
  <div class="flex flex-col gap-4">   
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>   
    <div class="flex gap-6 mx-4 my-2">
      <div class="flex flex-col justify-center gap-10 basis-1/5">
        <input
          ref="avatarUpload"
          type="file"
          name="avatar"
          style="display: none"
          @change="handleFileUpload"
        />
        <div class="avatar flex justify-center">
          <div
            class="mask mask-squircle hover:bg-primary hover:bg-opacity-25 cursor-pointer w-32 h-32"
          >
            <img
              v-if="userStore.user.username === props.username"
              :src="`http://localhost:8000${user.avatar}`"
              :alt="`Avatar de ${user.username}`"
              class=""
              @click="uploadAvatar"
            />
            <img
              v-else
              :src="`${user.avatar}`"
              :alt="`Avatar de ${user.username}`"
              class=""
            />
          </div>
        </div>
        <div class="flex flex-col gap-2 bg-base-200 shadow-sm p-2 rounded-sm">
          <span class="text-center font-semibold text-primary">{{user.username}}</span>
          <span class="text-center font-semibold text-primary">{{user.first_name}} {{user.last_name}}</span>
          <span class="text-center font-semibold text-primary">{{user.email}}</span>
          <span v-if="user.role" class="text-center font-semibold text-primary">{{user.role.group.name}} / {{user.role.name}}</span>
          <span class="text-center font-semibold text-primary">{{dateToLocaleString(user.date_joined)}}</span>
          <span class="text-center font-semibold text-primary">{{dateToLocaleString(user.updated_at)}}</span>
        </div>
      </div>
      <div>
        <div class="grow">
          <h2 class="text-2xl font-bold">Activité</h2>
          <div style="width: 1200px; height: 400px">
            <VChart ref="chart" :option="option" />
          </div>
        </div>
        <div class="flex flex-col gap-6 grow">
          <h2 class="text-2xl font-bold">Mes adresses</h2>
          <div class="flex flex-col gap-2">
            <div v-for="address in user.addresses" :key="address.id" class="flex gap-2">
              <HomeIcon v-if="address.address_type.name === 'domicile'" class="w-6 h-6" />
              <OfficeIcon v-if="address.address_type.name === 'bureau'" class="w-6 h-6" />
              <h4 class="text-lg font-semibold">{{address.label}}</h4>
              <span class="text-center font-semibold text-primary">{{address.street.number}}</span>
              <span class="text-center font-semibold text-primary">{{address.street.label.name}}</span>
              <span class="text-center font-semibold text-primary">{{address.street.name}}, </span>
              <span class="text-center font-semibold text-primary">{{address.city.name}}, </span>

              <span class="text-center font-semibold text-primary">{{address.country.iso_name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, watch } from "vue";
import { VChart } from "#components";

// Interface
import type { UserInterface } from "~/interfaces/UserInterface";

// Composables
import { retrieveUser } from "~/composables/api/useUsers";

// Icons
import HomeIcon from "~/components/assets/icons/HomeIcon.vue";
import OfficeIcon from "../assets/icons/OfficeIcon.vue";

const route = useRoute();
const userStore = useUserStore();

const props = defineProps<{
  username: string;
}>();

const user = ref({} as UserInterface)
const avatarUpload: Component = ref(null);

const dateToLocaleString = (date: string) => {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return new Date(date).toLocaleDateString("fr-FR");
};


onMounted(async () => {
  console.log("mounted");
  console.log(route.params.username)

  if (userStore.user.username === props.username) {
    user.value = userStore.user
  } else {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;
    const response = await retrieveUser(token, String(props.username));

    console.log(response);
    if (response.id) {
      user.value = await response;
    } else {
      console.error("Failed to retrieve user");
    }
  }
});

const uploadAvatar = () => {
  avatarUpload.value?.click();
};

const handleFileUpload = async (event: any) => {
  if (!event.target) return;
  const token = localStorage.getItem("token");
  const avatar = event.target.files[0];
  console.log("File selected:", avatar);
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const response = await fetch("http://localhost:8000/api/users/upload/avatar/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (response.ok) {
      userStore.user.avatar = await response.json().then((data) => data.user.avatar);
    } else {
      console.error("File upload failed");
    }
  } catch (error) {
    console.error("An error occurred during file upload:", error);
  }
};

const chart = ref<InstanceType<typeof VChart> | null>(null);

function random() {
  return Math.round(300 + Math.random() * 700) / 10;
}

function getData(): ECOption {
  return {
    animation: true,
    tooltip: {
      className: "echarts-tooltip",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {},
        saveAsImage: {},
      },
    },
    dataset: {
      dimensions: ["Label", "Nouveaux utilisateurs", "Nouveaux utilisateurs validés", "Nouveaux utilisateurs refusés"],
      source: [
        {
          Label: new Date(new Date().setDate(new Date().getDate() - 5)).toLocaleDateString(),
          "Nouveaux utilisateurs": 14,
          "Nouveaux utilisateurs validés": 4,
          "Nouveaux utilisateurs refusés": 1,
        },
        {
          Label: new Date(new Date().setDate(new Date().getDate() - 4)).toLocaleDateString(),
          "Nouveaux utilisateurs": 14 + 3,
          "Nouveaux utilisateurs validés": 4 + 12,
          "Nouveaux utilisateurs refusés": 1 + 1,
        },
        {
          Label: new Date(new Date().setDate(new Date().getDate() - 3)).toLocaleDateString(),
          "Nouveaux utilisateurs": 17 + 30,
          "Nouveaux utilisateurs validés": 10 + 5,
          "Nouveaux utilisateurs refusés": 2 + 1,
        },
        {
          Label: new Date(new Date().setDate(new Date().getDate() - 2)).toLocaleDateString(),
          "Nouveaux utilisateurs": 37 + 23,
          "Nouveaux utilisateurs validés": 10 + 12,
          "Nouveaux utilisateurs refusés": 3 + 2,
        },
        {
            Label: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString(),
          "Nouveaux utilisateurs": 60 + 20,
          "Nouveaux utilisateurs validés": 22 + 4,
          "Nouveaux utilisateurs refusés": 5 + 0,
        },
        {
          Label: new Date().toLocaleDateString(),
          "Nouveaux utilisateurs": 80 + 63,
          "Nouveaux utilisateurs validés": 26 + 22,
          "Nouveaux utilisateurs refusés": 5 + 4,
        },
      ],
    },
    xAxis: { type: "category" },
    yAxis: { type: "value" },
    itemStyle: { borderRadius: 3 },
    series: [{ type: "line", color: '#000' }, { type: "line", color: '#00a96e' }, { type: "line", color: '#ff5861' }],
  };
}

const option = shallowRef(getData());
function refreshData() {
  option.value = getData();
}

function hideToolbox() {
  chart.value?.setOption({ toolbox: { show: false } });
}
function showToolbox() {
  chart.value?.setOption({ toolbox: { show: true } });
}

watch(() => props.username, async (newUsername) => {
  console.log("watched");
  console.log(newUsername);
  if (userStore.user.username === newUsername) {
    user.value = userStore.user
  } else {
    const token: string | null = localStorage.getItem("token");
    if (!token) return;
    const response = await retrieveUser(token, String(newUsername));

    console.log(response);
    if (response.id) {
      user.value = await response;
    } else {
      console.error("Failed to retrieve user");
    }
  }
});
</script>