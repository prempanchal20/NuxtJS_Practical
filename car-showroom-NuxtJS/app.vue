<template>
  <section class="fonts">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </section>
</template>

<style>
.fonts {
  font-family: 'Poppins', sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease-in;
}

.page-enter-from,
.page-leave-to {
  opacity: 1;
  transform: translateY(100px);
}
</style>