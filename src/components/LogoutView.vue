<template>logout</template>
<script lang="ts" setup>
import { onMounted } from "vue";

import useAuth from "@/composables/auth";
import { useRouter } from "vue-router";
const { logout } = useAuth();
const router = useRouter();

onMounted(async () => {
  await logout();
  router.push("/login");
});
</script>
