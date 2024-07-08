<template>
  <NuxtLayout>
    <SectionFullScreen>
      <CardSection>
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl font-black">Services</h1>
          
        </div>
      </CardSection>
    </SectionFullScreen>
  </NuxtLayout>
</template>

<script lang="ts" setup>

definePageMeta({
  title: "Administration - Services",
  // description: 'Dashboard page',
  // image: '/images/dashboard.png',
  // url: 'https://example.com/dashboard',
  middleware: "auth",
});
</script>
