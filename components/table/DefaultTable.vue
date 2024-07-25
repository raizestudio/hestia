<template>
  <div
    class="overflow-x-scroll grow"
    :style="`width: ${coreStore.mainContainerWidth - 50}px; height: ${
      coreStore.mainContainerHeight - 250
    }px;`"
  >
    <div :class="`w-full h-0.5 animate-pulse ${props.shouldDisable ? 'bg-primary' : ''}`"></div>
    <table :class="`table ${tableClass} ${tableSizeClass}`">
      <!-- head -->
      <thead>
        <tr>
          <th class="z-10">
            <label>
              <input
                type="checkbox"
                class="checkbox"
                @change="selectAll"
                :checked="selectedRows.length === localOptions.length"
              />
            </label>
          </th>
          <TableTh
            v-for="header in props.headers"
            :label="header.label"
            :field="header.field"
            :sort="tableConfig.sort"
            :update-table-config="(field: string, sort: string) => updateTableConfigSort(field, sort)"
          />
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr
          v-for="option in localOptions"
          class="hover:!bg-base-300 cursor-pointer"
        >
          <!-- @click="() => router.push(`/option/${option.username}`)" -->
          <th
            :class="`z-10 ${
              selectedRows.includes(option.id) ? 'bg-base-300' : ''
            }`"
          >
            <label>
              <input
                type="checkbox"
                name="option"
                class="checkbox"
                @change="() => checkUser(option.id)"
                :checked="selectedRows.includes(option.id)"
              />
            </label>
          </th>
          <td
            v-for="column in props.columns"
            :class="`${selectedRows.includes(option.id) ? 'bg-base-300' : ''}`"
          >
            <TableTdAvatar
              v-if="column.type === 'avatar'"
              :avatar="option[column.avatarKey]"
              :label="option[column.labelKey]"
              :user-first-name="option['first_name']"
              :user-last-name="option['last_name']"
              :table-size="props.tableSize"
              @click="() => router.push(`${url}${option[column.labelKey].username}`)"
            />
            <TableTdText v-if="column.type === 'text'">
              <span v-if="option[column.labelKey]" :class="column.textClass">{{
                option[column.labelKey]
              }}</span>
              <ExclamationCircle v-else class="stroke-warning" />
            </TableTdText>
            <TableTdTags
              v-if="column.type === 'tags'"
              :tags="option[column.labelKey]"
            />
            <TableTdDescription
              v-if="column.type === 'description'"
              :description="option[column.labelKey]"
            />
            <TableTdDuration
              v-if="column.type === 'duration'"
              :duration="option[column.labelKey]"
            />
            <TableTdPrice
              v-if="column.type === 'price'"
              :amount="option[column.labelKey]"
              :currency="option[column.currencyKey]"
            />
            <TableTd
              v-if="column.type === 'email'"
              :label="option[column.labelKey]"
            />
            <TableTdBoolean
              v-if="column.type === 'boolean'"
              :option="option[column.labelKey]"
            />
            <TableTd v-if="column.type === 'date'">
              <span
                v-if="option[column.labelKey] && column.dateType === 'full'"
                >{{
                  `${new Date(option[column.labelKey]).toLocaleDateString(
                    "fr-FR"
                  )} à ${new Date(option[column.labelKey]).toLocaleTimeString(
                    "fr-FR"
                  )}`
                }}</span
              >
              <span v-else-if="option[column.labelKey]">{{
                new Date(option[column.labelKey]).toLocaleDateString()
              }}</span>
              <div class="flex justify-center">
                <ExclamationCircle
                  v-if="!option[column.labelKey]"
                  class="stroke-warning"
                />
              </div>
            </TableTd>
            <TableTdAvatar
              v-if="column.type === 'user' && option[column.labelKey]"
              :avatar="option[column.labelKey][column.avatarKey]"
              :user-first-name="option[column.labelKey].first_name"
              :user-last-name="option[column.labelKey].last_name"
              :label="option[column.labelKey].username"
              mask-class="h-8 w-8"
              :table-size="props.tableSize"
              @click="() => router.push(`/user/${option[column.labelKey].username}`)"
            >
              <div class="flex justify-center">
                <XCircle v-if="!option[column.labelKey]" class="stroke-error" />
              </div>
            </TableTdAvatar>
            <TableTd v-if="column.type === 'group'">
              <span
                :class="`px-1.5 py-0.5 rounded-lg text-base-100`"
                :style="`background-color: ${
                  option[column.labelKey].group.color
                }`"
                >{{ _.capitalize(option[column.labelKey].group.name) }}</span
              >
            </TableTd>
            <TableTd v-if="column.type === 'role'">
              <span
                v-if="option[column.labelKey]"
                :class="`px-1 py-0.5 rounded-lg text-sm text-nowrap bg-base-300`"
                >{{ _.capitalize(option[column.labelKey].name) }}</span
              >
            </TableTd>
            <TableTd v-if="column.type === 'scope'">
              <span
                v-if="option[column.labelKey]"
                :class="`px-1 py-0.5 rounded-lg text-sm text-nowrap text-base-100 bg-warning`"
              >
                Contraint
                <span v-if="option[column.labelKey].city.length > 0"
                  >- Ville</span
                >
              </span>
              <span
                v-else
                :class="`px-1 py-0.5 rounded-lg text-sm text-nowrap text-accent-content bg-primary`"
                >Universel</span
              >
            </TableTd>
            <TableTd v-if="column.type === 'label'">
              <span
                v-if="option[column.labelKey]"
                :class="`px-2 py-1 rounded-lg text-sm text-nowrap bg-base-300`"
                >{{ _.capitalize(option[column.labelKey].name) }}</span
              >
            </TableTd>

            <TableTd v-if="column.type === 'address'">
              <div class="flex justify-center">
                <ExclamationCircle
                  v-if="option[column.labelKey].length === 0"
                  class="stroke-warning"
                />
                <div v-else>
                  {{ option[column.labelKey].length }}
                </div>
              </div>
            </TableTd>
            <TableTd v-if="column.type === 'phone_number'">
              <div class="flex justify-center">
                <ExclamationCircle
                  v-if="option[column.labelKey].length === 0"
                  class="stroke-warning"
                />
                <div v-else>
                  {{ option[column.labelKey].length }}
                </div>
              </div>
            </TableTd>
            <TableTdActions
              v-if="column.type === 'actions'"
              :delete-action="(key: any) => props.deleteAction(key)"
              :is-active-action="(key: any, isActive: boolean) => props.isActiveAction(key, isActive)"
              :option="option"
              :option-key="props.optionKey"
              :restore-action="(key: any) => props.restoreAction(key)"
              :toggle-modal="(key: any) => props.toggleModal(key)"
              :url="props.url"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <TableFooter
    :count="count"
    :currentPage="currentPage"
    :options-count="localOptions.length"
    :go-next="props.goNext"
    :go-prev="props.goPrev"
    :has-next="props.hasNext"
    :has-prev="props.hasPrev"
    :update-items-per-page="(itemsPerPage: number) => props.updateItemsPerPage(itemsPerPage)"
    :go-to-page="(page: number) => props.goToPage(page)"
    :should-disable="props.shouldDisable"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import pkg from "~/package.json";
import _ from "lodash";

const router = useRouter();

// Stores
const coreStore = useCoreStore();

// Components
import TableTh from "~/components/table/TableTh.vue";
import TableTd from "~/components/table/TableTd.vue";
import TableTdAvatar from "~/components/table/TableTdAvatar.vue";
import TableTdText from "~/components/table/TableTdText.vue";
import TableTdTags from "~/components/table/TableTdTags.vue";
import TableTdDescription from "~/components/table/TableTdDescription.vue";
import TableTdDuration from "~/components/table/TableTdDuration.vue";
import TableTdBoolean from "~/components/table/TableTdBoolean.vue";
import TableTdPrice from "~/components/table/TableTdPrice.vue";
import TableTdActions from "~/components/table/TableTdActions.vue";
import TableFooter from "~/components/footer/TableFooter.vue";

// Icons
import XCircle from "../assets/icons/XCircleIcon.vue";
import ExclamationCircle from "../assets/icons/ExclamationCircle.vue";
import ChevronIcon from "../assets/icons/ChevronIcon.vue";

// Data
const selectedRows = ref([] as number[]);
const viewRow = ref("");
const tableConfig = ref({
  sort: {
    field: "",
    order: "",
  } as { field: string; order: string },
});

// Interfaces
interface TableHeaderInterface {
  label: string;
  field: string;
}
const props = defineProps<{
  options: any[];
  headers: TableHeaderInterface[];
  columns?: any[];
  hasNext?: boolean;
  hasPrev?: boolean;
  count?: number;
  currentPage?: number;
  toggleModal: (key: any) => void;
  isActiveAction: (key: any, is_active: boolean) => void;
  deleteAction: (key: any) => void;
  restoreAction: (key: any) => void;
  infoAction?: (key: any) => void;
  goNext?: () => void;
  goPrev?: () => void;
  updateSelectedRows?: (selectedRows: any[]) => void;
  updateItemsPerPage: (itemsPerPage: number) => void;
  goToPage: (page: number) => void;
  url: string;
  optionKey: string;
  tableClass?: string;
  tableSize?: "xs" | "sm" | "md" | "lg" | "xl";
  shouldDisable?: boolean;
}>();
const localOptions = ref([...props.options] as any[]);

onMounted(() => {
  localOptions.value = props.options;
});

const tableSizeClass = computed(() => {
  return props.tableSize ? `table-${props.tableSize}` : "";
});
/*
 * Select all rows
 */
const selectAll = () => {
  if (selectedRows.value.length === localOptions.value.length) {
    selectedRows.value = [];
    if (props.updateSelectedRows) {
      props.updateSelectedRows(selectedRows.value);
    }
    return;
  }
  selectedRows.value = localOptions.value.map((option) => option.id);
  if (props.updateSelectedRows) {
    props.updateSelectedRows(selectedRows.value);
  }
};

const updateTableConfigSort = (field: string, order: string) => {
  console.log(`DEBUG: ${field} - ${order}`);
  tableConfig.value.sort.field = field;
  tableConfig.value.sort.order = order;

  // FIXME: Sort users
  // Sort users
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  localOptions.value = _.orderBy(localOptions.value, [field], [order]);
};

const checkUser = (id: number) => {
  if (selectedRows.value.includes(id)) {
    selectedRows.value = selectedRows.value.filter((option) => option !== id);
    if (props.updateSelectedRows) {
      props.updateSelectedRows(selectedRows.value);
    }
    return;
  }
  selectedRows.value.push(id);
  if (props.updateSelectedRows) {
    props.updateSelectedRows(selectedRows.value);
  }
};

watch(
  () => props.options,
  (value) => {
    localOptions.value = value;
  }
);
</script>
