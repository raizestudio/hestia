<template>
  <div
    class="overflow-x-scroll grow"
    :style="`width: ${coreStore.mainContainerWidth - 50}px; height: ${
      coreStore.mainContainerHeight - 200
    }px;`"
  >
    <table :class="`table ${tableClass}`">
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
            />
            <TableTdText
              v-if="column.type === 'text'"
            >
              <span v-if="option[column.labelKey]" :class="column.textClass">{{ option[column.labelKey] }}</span>
              <ExclamationCircle
                  v-else
                  class="stroke-warning"
                />
            </TableTdText>
            <TableTdTags
              v-if="column.type === 'tags'"
              :tags="option[column.labelKey]"
            />
            <TableTdDescription
              v-if="column.type === 'description'"
              :description="option[column.labelKey]"
            />
            <TableTdDuration v-if="column.type === 'duration'"
              :duration="option[column.labelKey]"
            />
            <TableTd
              v-if="column.type === 'email'"
              :label="option[column.labelKey]"
            />
            <TableTd v-if="column.type === 'boolean'">
              <CircleCheckIcon
                v-if="option[column.labelKey]"
                class="stroke-success"
              />
              <XCircle v-else class="stroke-error" />
            </TableTd>
            <TableTd
              v-if="column.type === 'date'"
            >
              <span v-if="option[column.labelKey] && column.dateType === 'full'">{{`${new Date(option[column.labelKey]).toLocaleDateString('fr-FR')} à ${new Date(option[column.labelKey]).toLocaleTimeString('fr-FR')}`}}</span>
              <span v-else-if="option[column.labelKey]">{{new Date(option[column.labelKey]).toLocaleDateString()}}</span>
              <div class="flex justify-center">
                <ExclamationCircle
                  v-if="!option[column.labelKey]"
                  class="stroke-warning"
                />
              </div>
            </TableTd>
            <TableTdAvatar
              v-if="column.type === 'user'"
              :avatar="option[column.avatarKey]"
              :user-first-name="option[column.labelKey].first_name"
              :user-last-name="option[column.labelKey].last_name"
              :label="option[column.labelKey].username"
              mask-class="h-8 w-8"
            >
              <div class="flex justify-center">
                <XCircle
                  v-if="!option[column.labelKey]"
                  class="stroke-error"
                />
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
                  <span v-if="option[column.labelKey].city.length > 0">- Ville</span>
                </span
              >
              <span v-else :class="`px-1 py-0.5 rounded-lg text-sm text-nowrap text-accent-content bg-primary`">Universel</span>
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
            <TableTd v-if="column.type === 'actions'">
              <div class="flex gap-1">
                <button
                  class="btn btn-accent btn-xs"
                  @click="() => toggleModal(option[optionKey])"
                >
                  <EyeIcon class="w-4 h-4 fill-base-100" />
                </button>
                <button
                  class="btn btn-accent btn-xs"
                  @click="() => router.push(`${url}${option[optionKey]}`)"
                >
                  <EditIcon class="w-4 h-4 fill-base-100" />
                </button>
                <button
                  class="btn btn-warning btn-xs"
                  @click="
                    () => isActiveAction(option[optionKey], !option.is_active)
                  "
                >
                  <CloseIcon class="w-4 h-4 fill-base-100" />
                </button>
                <button class="btn btn-error btn-xs">
                  <ArchiveIcon class="w-4 h-4 stroke-base-100" />
                </button>
                <button class="btn btn-error btn-xs">
                  <DeleteIcon class="w-4 h-4 stroke-base-100" />
                </button>
                <button class="btn btn-info btn-xs">
                  <InfoIcon class="w-4 h-4 fill-base-100" />
                </button>
              </div>
            </TableTd>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex px-1 py-0.5 items-center mt-2">
    <div class="flex grow gap-2">
      <button
        :class="`btn btn-sm ${hasPrev ? 'btn-ghost' : 'btn-disabled'}`"
        @click="goPrev"
      >
        <ChevronIcon />
      </button>
      <button
        :class="`btn btn-sm ${hasNext ? 'btn-ghost' : 'btn-disabled'}`"
        @click="goNext"
      >
        <ChevronIcon class="rotate-180" />
      </button>
    </div>
    <div class="flex gap-2">
      <span class="bg-base-200 px-2 py-1 shadow rounded-sm"
        >Items total: <span class="">{{ count }}</span></span
      >
      <span class="bg-base-200 px-2 py-1 shadow rounded-sm"
        >Items par page: <span class="">{{ localOptions.length }}</span></span
      >
      <span class="bg-base-200 px-2 py-1 shadow rounded-sm"
        >Page: <span class="">{{ currentPage }}</span></span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import pkg from "~/package.json";
import _, { update } from "lodash";

const router = useRouter();

// Stores
const coreStore = useCoreStore();

// Components
import TableTh from "~/components/table/TableTh.vue";
import TableTd from "~/components/table/TableTd.vue";
import ViewUser from "~/components/user/ViewUser.vue";
import TableTdAvatar from "~/components/table/TableTdAvatar.vue";
import TableTdText from "~/components/table/TableTdText.vue";
import TableTdTags from "~/components/table/TableTdTags.vue";
import TableTdDescription from "~/components/table/TableTdDescription.vue";

// Icons
import DeleteIcon from "~/components/assets/icons/DeleteIcon.vue";
import CloseIcon from "~/components/assets/icons/CloseIcon.vue";
import EditIcon from "~/components/assets/icons/EditIcon.vue";
import EyeIcon from "~/components/assets/icons/EyeIcon.vue";
import InfoIcon from "~/components/assets/icons/InfoIcon.vue";
import DocumentCheckIcon from "~/components/assets/icons/DocumentCheckIcon.vue";
import CircleCheckIcon from "../assets/icons/CircleCheckIcon.vue";
import XCircle from "../assets/icons/XCircleIcon.vue";
import ExclamationCircle from "../assets/icons/ExclamationCircle.vue";
import ChevronIcon from "../assets/icons/ChevronIcon.vue";
import ArchiveIcon from "../assets/icons/ArchiveIcon.vue";

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
  toggleModal: (username: string) => void;
  isActiveAction: (option: any, is_active: boolean) => void;
  goNext?: () => void;
  goPrev?: () => void;
  updateSelectedRows?: (selectedRows: any[]) => void;
  url: string;
  optionKey: string;
  tableClass?: string;
}>();
const localOptions = ref([...props.options]);

onMounted(() => {
  localOptions.value = props.options;
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
