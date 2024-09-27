import { defineStore } from "pinia";

// Interfaces
import { type DRFInterface } from "@/interfaces/api/DRFInterface";
import { type UserInterface } from "@/interfaces/UserInterface";

// Composables
import { fetchUsers } from "@/composables/api/useUser";

export const useUsersStore = defineStore({
  id: "usersStore",
  state: () => ({
    users: [] as UserInterface[],
    next: '',
    prev: '',
    count: 0
  }),
  actions: {
    async getUsers() {
      const response: DRFInterface = await fetchUsers();
      this.users = response.results;
      this.next = response.next ?? '';
      this.prev = response.previous ?? '';
      this.count = response.count;
    },
  },
});
