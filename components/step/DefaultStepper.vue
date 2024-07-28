<template>
  <div class="flex justify-around">
    <div
      v-for="(step, index) in props.steps"
      :key="index"
      :class="`flex items-center`"
    >
      <button
        :class="`${
          step.active || (step.id < currentStep) ? 'btn-primary' : 'btn-base-200'
        } btn btn-sm rounded px-4 py-1 cursor-pointer`"
        :disabled="step.disabled || (step.id > maxStep)"
        @click="() => props.updateCurrentStep(index)"
      >
        <span>{{ step.title }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  steps: any[];
  userType: string;
  currentStep: number;
  maxStep: number;
  updateCurrentStep: (stepIndex: number) => void;
}>();
</script>
