<template>
  <NuxtLayout>
    <SectionFullScreen>
      <CardSection>
        <div
          v-if="loading"
          class="flex flex-col justify-center items-center h-full gap-4"
        >
          <span class="loading loading-ring loading-lg"></span>
          <span class="text-2xl font-bold"
            >Préparation du formulaire d'inscription</span
          >
        </div>
        <div v-else class="flex flex-col h-full">
          <div v-if="hasError" class="flex flex-col md:flex-row">
            <TiredPerson404Illustration class="w-full" style="height: 800px" />
            <div class="basis-2/3 mt-10 md:mt-44">
              <h2 class="text-2xl font-bold">
                Il semblerait que le code ne soit plus valide.
              </h2>
              <p class="py-4">
                Le code envoyé par mail à une validité de 30 minutes, passée ce
                délai vous devez recommencer l'inscription.
              </p>
              <p class="py-4">Veuillez réessayer ou contacter le support.</p>
            </div>
          </div>
          <div v-else class="flex flex-col h-full gap-8">
            <div class="flex flex-col gap-1">
              <DefaultH1
                title="Vous pouvez terminer votre inscription à présent!"
              />
              <span class="text-accent">{{ timeLeft }}</span>
            </div>
            <div class="flex flex-col grow p-4">
              <!-- <div>
              </div> -->
              <div
                :class="`flex flex-col gap-1 ${userType !== '' ? '' : 'grow'}`"
              >
                <span class="text-sm"
                  >Veuillez séléctioner une option pour commencer</span
                >
                <SelectInput
                  :options="userTypeOptions"
                  :update-user-type="(value: string) => updateUserType(value)"
                />
              </div>
              <div
                v-if="userType !== '' && currentStep === 0"
                class="flex grow"
              >
                <PersonalInformation :user="user" />
                <TypesOfUsers :user-type="userType" />
              </div>

              <div
                v-if="userType !== '' && currentStep === 1"
                class="flex grow"
              >
                pro
              </div>

              <div
                v-if="userType !== '' && currentStep === 2"
                class="flex grow"
              >
                troise
              </div>

              <div
                v-if="userType !== '' && currentStep === 3"
                class="flex grow"
              >
                valid
              </div>
              <div class="flex flex-col w-fit bg-yellow-800 rounded p-2">
                <span class="sm">DEBUG</span>
                <button class="btn btn-xs" @click="validateStep">
                  Validate step
                </button>
                <span class="text-xs">Max step: {{ maxStep }}</span>
                <span class="text-xs">Current step: {{ currentStep }}</span>
                <span class="text-xs">User type: {{ userType }}</span>
                <span v-for="(step, index) in steps" class="text-xs">{{
                  `Step ${index} is ${step.valid ? "valid" : "not valid"} ${
                    step.disabled ? "but is disabled" : ""
                  }`
                }}</span>
              </div>
              <div class="flex justify-end gap-4">
                <button
                  class="btn btn-sm btn-primary"
                  :disabled="steps[currentStep].id === 0"
                  @click="goBack"
                >
                  Revenir
                </button>
                <button
                  class="btn btn-sm btn-primary"
                  :disabled="
                    steps[currentStep].id >= steps.length - 1 || userType === ''
                  "
                  @click="goNext"
                >
                  Avancer
                </button>
              </div>
            </div>
            <DefaultStepper
              :steps="steps"
              :user-type="userType"
              :current-step="currentStep"
              :max-step="maxStep"
              :update-current-step="(stepIndex: number) => updateCurrentStep(stepIndex)"
            />
          </div>
        </div>
      </CardSection>
    </SectionFullScreen>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

// Composables
import { confirmEmail } from "~/composables/api/useUsers";

// Components
import SectionFullScreen from "~/components/section/SectionFullScreen.vue";
import CardSection from "~/components/card/CardSection.vue";
import DefaultH1 from "~/components/title/DefaultH1.vue";
import TiredPerson404Illustration from "~/components/assets/illustrations/TiredPerson404Illustration.vue";
import DefaultStepper from "~/components/step/DefaultStepper.vue";
import SelectInput from "~/components/input/SelectInput.vue";

// Interfaces
import type { UserInterface } from "~/interfaces/UserInterface";
import PersonalInformation from "~/components/user/register/PersonalInformation.vue";
import TypesOfUsers from "~/components/user/register/TypesOfUsers.vue";

const router = useRouter();
const route = useRoute();

const confirmationCode = route.params.confirmationCode.toString();
const user = ref({} as UserInterface);
const loading = ref(false);
const hasError = ref(false);

interface StepInterface {
  id: number;
  title: string;
  active: boolean;
  valid: boolean;
  disabled?: boolean;
}

const steps = ref([
  { id: 0, title: "Informations personnelles", active: true, valid: false },
  {
    id: 1,
    title: "Informations professionnelles",
    active: false,
    valid: false,
    disabled: true,
  },
  { id: 2, title: "Réglages", active: false, valid: false },
  { id: 3, title: "Validation", active: false, valid: false },
] as StepInterface[]);

const userTypeOptions = ref([
  { value: "user", label: "Utilisateur" },
  { value: "agency", label: "Agence" },
  { value: "independent", label: "Auto entrepreneur" },
]);

const userType = ref("");
const timeLeft = ref("_");
const currentStep = ref(0);
const isSectionValid = ref(false);

onMounted(async () => {
  loading.value = true;
  console.log(confirmationCode);

  try {
    const response: any = await confirmEmail(confirmationCode);

    // console.log(response);
    // console.log(response.statusCode);
    if (response.statusCode !== undefined) {
      throw new Error("Erreur lors de la confirmation");
    }
    user.value = response.user;
  } catch (error) {
    hasError.value = true;
    // throw createError({
    //   status: 404,
    //   message: "Le code de confirmation ",
    //   statusText: "Code de confirmation invalide",
    //   // fatal: true,
    // });
  } finally {
    loading.value = false;
    setInterval(calculateTimeLeft, 1000);
  }
});

/*
 * Validate the current step
 *
 * @return {void}
 */
const validateStep = () => {
  steps.value = steps.value.map((step) => {
    if (step.id === currentStep.value) {
      return { ...step, valid: true };
    }
    return step;
  });
};

const updateUserType = (value: string) => {
  userType.value = value;
};

/*
 * Go to the next step
 *
 * @return {void}
 */
const goNext = () => {
  validateStep();
  let nextStep = currentStep.value + 1;

  while (nextStep <= maxStep.value && steps.value[nextStep].disabled) {
    nextStep++;
  }

  if (nextStep <= maxStep.value) {
    updateCurrentStep(nextStep);
  }
};

/*
 * Go to the previous step
 *
 * @return {void}
 */
const goBack = () => {
  let previousStep = currentStep.value - 1;

  while (previousStep >= 0 && steps.value[previousStep].disabled) {
    previousStep--;
  }

  if (previousStep >= 0) {
    updateCurrentStep(previousStep);
  }
};

/*
 * Get the maximum step
 *
 * @return {number}
 */
const maxStep = computed(() => {
  let max = 0;
  let endOfStreak = false;

  while (!endOfStreak) {
    const step = steps.value[max];
    if (step.valid || step.disabled) {
      max++;
    } else {
      endOfStreak = true;
    }
  }
  return max;
});

/*
 * Update the current step and set the active step
 *
 * @param {number} stepIndex
 *
 * @return {void}
 */
const updateCurrentStep = (stepIndex: number) => {
  currentStep.value = stepIndex;
  steps.value = steps.value.map((step, index) => {
    if (index === stepIndex) {
      return { ...step, active: true };
    }
    return { ...step, active: false };
  });
};

const calculateTimeLeft = () => {
  const expiresAtString =
    user.value.user_security?.email_validation_code_expires_at;

  if (!expiresAtString) {
    return "_";
  }

  const expiresAt: any = new Date(expiresAtString);

  const now: any = new Date();
  const timeDifference = expiresAt - now;

  const totalSecondsLeft = Math.floor(timeDifference / 1000);
  const hoursLeft = Math.floor(totalSecondsLeft / 3600);
  const minutesLeft = Math.floor((totalSecondsLeft % 3600) / 60);
  const secondsLeft = totalSecondsLeft % 60;

  timeLeft.value = `Le lien est valide pendant ${hoursLeft} heures et ${minutesLeft} minutes et ${secondsLeft} secondes`;
};

definePageMeta({
  layout: "anonymous",
});

useSeoMeta({
  title: "Confirmation création de compte",
  description: "Création de compte",
});
</script>
