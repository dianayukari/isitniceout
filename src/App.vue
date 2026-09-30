<script setup lang="ts">
// Hardcoded for now; the city picker arrives in step 3.
const city = 'Utrecht'
</script>

<template>
  <main class="flex min-h-dvh items-center justify-center bg-sky-100 px-6 text-slate-900">
    <h1 class="text-center font-display text-4xl leading-tight md:text-6xl">
      Is it a nice day in
      <span class="whitespace-nowrap italic">{{ city }}?</span>
    </h1>
  </main>
</template>
