<script lang="ts" setup>
defineProps<{
  error?: Object | null;
}>();
</script>
<template>
  <div v-if="error">
    <q-banner
      :key="k"
      v-for="(e, k) in error"
      class="text-center text-lg mt-5 rounded text-white bg-red"
    >
      <div class="text-lg">
        {{ e[0] }}
      </div>
    </q-banner>
  </div>
</template>
