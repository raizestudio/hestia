<template>
  <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
    <li>
      <div class="timeline-middle">
        <CircleCheckIcon class="h-5 w-5 stroke-success" />
      </div>
      <div class="timeline-start mb-10 md:text-end">
        <time class="font-mono italic">27/07/2024</time>
        <div class="text-lg font-black text-success">A accepté `user`</div>
        Possible note, description ou information supplémentaire
      </div>
      <hr />
    </li>
    <li>
      <hr />
      <div class="timeline-middle">
        <XCircleIcon class="h-5 w-5 stroke-error" />
      </div>
      <div class="timeline-end mb-10">
        <time class="font-mono italic">16/07/2024</time>
        <div class="text-lg font-black text-error">A annulé `mission`</div>
        Possible note, description ou information supplémentaire
      </div>
      <hr />
    </li>
    <li>
      <hr />
      <div class="timeline-middle">
        <ErrorIcon class="h-5 w-5 stroke-warning" />
      </div>
      <div class="timeline-start mb-10 md:text-end">
        <time class="font-mono italic">14/07/2024</time>
        <div class="text-lg font-black text-warning">A archivé `service`</div>
        Possible note, description ou information supplémentaire
      </div>
      <hr />
    </li>
    <!-- 
    <li>
      <hr />
      <div class="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-end mb-10">
        <time class="font-mono italic">2007</time>
        <div class="text-lg font-black">iPhone</div>
        iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile
        operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on
        January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates. As
        of November 1, 2018, more than 2.2 billion iPhones had been sold. As of 2022, the iPhone
        accounts for 15.6% of global smartphone market share
      </div>
      <hr />
    </li>
    <li>
      <hr />
      <div class="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="timeline-start mb-10 md:text-end">
        <time class="font-mono italic">2015</time>
        <div class="text-lg font-black">Apple Watch</div>
        The Apple Watch is a line of smartwatches produced by Apple Inc. It incorporates fitness
        tracking, health-oriented capabilities, and wireless telecommunication, and integrates with
        iOS and other Apple products and services
      </div>
    </li> -->
  </ul>
</template>

<script setup lang="ts">

// Icons
import CircleCheckIcon from '../assets/icons/CircleCheckIcon.vue';
import ErrorIcon from '../assets/icons/ErrorIcon.vue';
import XCircleIcon from '../assets/icons/XCircleIcon.vue';
</script>