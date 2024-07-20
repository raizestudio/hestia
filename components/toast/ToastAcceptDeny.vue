<template>
  <div class="toast mb-6 w-80">
    <div role="alert" class="bg-base-200 shadow px-4 py-2">
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>

          <span class="text-md">Notification qui demande notification.</span>
        </div>
        <div>
          <div>
            <span class="text-sm">notification conf</span>
          </div>
        </div>
        <div class="flex justify-end items-center gap-1">
          <button class="btn btn-xs">Deny</button>
          <button class="btn btn-xs btn-primary">Accept</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
