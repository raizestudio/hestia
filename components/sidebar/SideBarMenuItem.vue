<template>
  <div>
    <div
      v-if="props.subMenus && props.subMenus.length === 0"
      @click="() => handleMenuClick(props.label, props.url)"
      :class="
        clsx(
          'flex items-center justify-between px-2 py-1 rounded cursor-pointer hover:bg-primary-300',
          themeStore.current === 'light' ? 'bg-light-100' : 'bg-dark-100',
          menuStore.activeMenu === props.label ? 'bg-primary-100' : ''
        )
      "
    >
      <span
        :class="
          clsx(
            'select-none',
            themeStore.current === 'light' &&  menuStore.activeMenu !== props.label ? 'text-dark-100' : 'text-light-100'
          )
        "
        >{{ props.label }}</span
      >
    </div>
    <!-- with submenus -->
    <div v-else>
      <div
        :class="
          clsx(
            'flex items-center justify-between px-2 py-1 rounded cursor-pointer hover:bg-primary-300',
            themeStore.current === 'light' ? 'bg-light-100' : 'bg-dark-100',
            menuStore.activeMenu === props.label ? 'bg-primary-100' : ''
          )
        "
        @click="() => menuStore.setActiveMenu(props.label)"
      >
        <span
          :class="
            clsx(
              'select-none',
              themeStore.current === 'light' &&
                menuStore.activeMenu !== props.label
                ? 'text-dark-100'
                : 'text-light-100'
            )
          "
          >{{ props.label }}</span
        >
      </div>
      <div v-if="isOpen" class="flex flex-col gap-1 pl-4 mt-1">
        <div v-for="submenu in props.subMenus">
          <div
            @click="() => handleMenuClick(submenu.label, submenu.url, true)"
            :class="
              clsx(
                'flex items-center justify-between px-2 py-0.5 rounded cursor-pointer',
                themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200',
                menuStore.activeSubMenu === submenu.label
                  ? 'bg-primary-200'
                  : ''
              )
            "
          >
            <span
              :class="
                clsx(
                  'select-none',
                  themeStore.current === 'light' &&  menuStore.activeSubMenu !== submenu.label
                    ? 'text-dark-200'
                    : 'text-light-200'
                )
              "
              >{{ submenu.label }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import clsx from "clsx";

// Components

// Icons
import ArrowFilledIcon from "@/components/icons/ArrowFilledIcon.vue";

// Stores
const themeStore = useThemeStore();
const menuStore = useMenuStore();

const router = useRouter();

const handleMenuClick = (
  menuLabel: string,
  menuUrl: string,
  isSubMenu?: boolean
) => {
  if (isSubMenu) {
    menuStore.setActiveSubMenu(menuLabel);
    router.push(menuUrl);
  } else {
    menuStore.setActiveMenu(menuLabel);
    router.push(menuUrl);
  }
};

const isOpen = computed(() => {
  return props.label === menuStore.activeMenu;
});

const props = defineProps<{
  label: string;
  description: string;
  url: string;
  icon: string;
  subMenus?: Array<any>;
}>();
</script>
