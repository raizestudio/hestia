<template>
  <div class="overflow-x-scroll grow">
    <table :class="`table ${props.tableClass} ${props.tableSizeClass}`">
      <thead>
        <tr>
          <th class="z-10">
            <CheckboxComponent class="p-2" />
          </th>
          <TableTh
            v-for="header in props.headers"
            :label="header.label"
            :field="header.field"
          />
        </tr>
      </thead>
      <tbody class="divide-y divide-light-200">
        <tr v-for="option in localOptions">
          <th>
            <CheckboxComponent />
          </th>
          <td v-for="column in props.columns" class="p-0.5">
            <TableTdAvatar
              v-if="column.type === 'avatar'"
              :avatar="option[column.avatarKey]"
              :label="option[column.labelKey]"
              :user-first-name="option['first_name']"
              :user-last-name="option['last_name']"
            />
            <TableTdText v-if="column.type === 'text'">
              <span
                v-if="option[column.labelKey]"
                :class="
                  clsx(
                    'text-nowrap',
                    column.textClass,
                    themeStore.current === 'light'
                      ? 'text-dark-200'
                      : 'text-light-200'
                  )
                "
                >{{ option[column.labelKey] }}</span
              >
              <ExclamationCircle v-else class="stroke-warning" />
            </TableTdText>
            <TableTdBoolean
              v-if="column.type === 'boolean'"
              :option="option[column.labelKey]"
            />
            <TableTd v-if="column.type === 'role'">
              <span
                v-if="option[column.labelKey]"
                :class="clsx('px-1 py-0.5 rounded-lg text-sm text-nowrap')"
                :style="`background-color: ${option[column.labelKey].color}`"
                >{{ capitalize(option[column.labelKey].name) }}</span
              >
            </TableTd>
            <TableTdText v-if="column.type === 'email'">
              <span
                v-if="option[column.labelKey]"
                :class="
                  clsx(
                    'text-nowrap',
                    column.textClass,
                    themeStore.current === 'light'
                      ? 'text-dark-200'
                      : 'text-light-200'
                  )
                "
                >{{ option[column.labelKey] }}</span
              >
              <!-- <ExclamationCircle v-else class="stroke-warning" /> -->
            </TableTdText>
            <TableTd v-if="column.type === 'date'">
              <span
                v-if="option[column.labelKey] && column.dateType === 'full'"
                :class="
                  clsx(
                    '',
                    themeStore.current === 'light'
                      ? 'text-dark-200'
                      : 'text-light-200'
                  )
                "
                >{{
                  `${new Date(option[column.labelKey]).toLocaleDateString(
                    "fr-FR"
                  )} à ${new Date(option[column.labelKey]).toLocaleTimeString(
                    "fr-FR"
                  )}`
                }}</span
              >
              <span
                v-else-if="option[column.labelKey]"
                :class="
                  clsx(
                    'flex justify-center',
                    themeStore.current === 'light'
                      ? 'text-dark-200'
                      : 'text-light-200'
                  )
                "
                >{{
                  new Date(option[column.labelKey]).toLocaleDateString()
                }}</span
              >
              <div class="flex justify-center">
                <InfoCircleIcon
                  v-if="!option[column.labelKey]"
                  class="fill-warning-100 w-6 h-6"
                />
              </div>
            </TableTd>
            <TableTd v-if="column.type === 'address'">
              <div class="flex justify-center">
                <InfoCircleIcon
                  v-if="option[column.labelKey].length === 0"
                  class="fill-warning-100 w-6 h-6"
                />
                <div v-else>
                  {{ option[column.labelKey].length }}
                </div>
              </div>
            </TableTd>
            <TableTdActions
              v-if="column.type === 'actions'"
              :delete-action="(key: any) => () => {}"
              :is-active-action="(key: any, isActive: boolean) => () => {}"
              :option="option"
              :option-key="props.optionKey"
              :restore-action="(key: any) => () => {}"
              :toggle-modal="(key: any) => () => {}"
              :url="props.url"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

import { capitalize } from "@/utils/textHelper";

// Components
import TableTh from "./TableTh.vue";
import TableTdAvatar from "./TableTdAvatar.vue";
import InfoCircleIcon from "@/components/icons/InfoCircleIcon.vue";
import CheckboxComponent from "@/components/input/CheckboxComponent.vue";

// Stores
const menuStore = useMenuStore();
const themeStore = useThemeStore();

const props = defineProps<{
  data: any[];
  headers: any[];
  columns: any[];
  optionKey: string;
  url: string;
  tableClass?: string;
  tableSizeClass?: string;
}>();

const localOptions = ref([...props.data] as any[]);

const wrapperWidth = computed(() => {
  return window.innerWidth - (menuStore.isCollapsed ? 80 : 266);
});
</script>
