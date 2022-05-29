<script lang="ts" setup>
defineProps<{
  error?: string | null;
}>();
</script>
<template>
  <q-banner
    v-if="error"
    class="text-center text-lg mt-5 rounded text-white bg-red"
  >
    <div class="text-lg">
      {{ error }}
    </div>
  </q-banner>
</template>
