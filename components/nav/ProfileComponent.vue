<template>
  <div class="dropdown dropdown-end">
    <div class="flex items-center btn btn-sm btn-ghost">
      <div tabindex="0" role="button" class="avatar">
        <div class="w-7 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <span class="text-sm whitespace-nowrap">Jhon Doe</span>
    </div>

    <ul
      tabindex="0"
      class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    >
      <li>
        <a class="justify-between">
          Profil
          <span class="badge">New</span>
        </a>
      </li>
      <li><a>Préfèrences</a></li>
      <li><a>Déconnexion</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">

</script>