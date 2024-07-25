<template>
  <div class="dropdown dropdown-top z-10">
    <slot name="trigger"></slot>
    <ul
      tabindex="0"
      class="dropdown-content menu bg-base-300 rounded-box z-[1] w-44 p-2 shadow mb-1"
    >
      <slot name="content"></slot>
    </ul>
  </div>
</template>
