<template>
  <span v-if="duration" class="text-nowrap"
    >{{ formatDuration(duration) }}
  </span>
  <div v-else title="Durée non renseignée">
    <ExclamationCircle class="stroke-warning w-6 h-6" />
  </div>
</template>

<script setup lang="ts">
// Icons
import ExclamationCircle from "~/components/assets/icons/ExclamationCircle.vue";
const props = defineProps<{
  duration: string;
}>();

interface Duration {
  // days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const formatDuration = (duration: string): string => {
  const { hours, minutes, seconds } = duration.split(":").reduce(
    (acc: Duration, time: string, index: number) => {
      if (index === 0) {
        acc.hours = parseInt(time);
      } else if (index === 1) {
        acc.minutes = parseInt(time);
      } else {
        acc.seconds = parseInt(time);
      }
      return acc;
    },
    { hours: 0, minutes: 0, seconds: 0 }
  );
  if (hours > 0) {
    return (
      hours +
      " h " +
      minutes +
      " m " +
      (seconds > 0 ? "et " + seconds + " s" : "")
    );
  } else if (minutes > 0) {
    return minutes + " m " + (seconds > 0 ? "et " + seconds + " s" : "");
  } else {
    return `${seconds} s`;
  }
};
</script>
