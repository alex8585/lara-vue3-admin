<script setup lang="ts">
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { ref } from "vue";
const message = ref();
window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "app",
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
});

echo
  .channel("message.dashboard")
  .listen("FrontendMessage", function (data: any) {
    message.value = data.msg.text;
    console.log(data);
  });
console.log(window.location.hostname);
</script>

<template>
  <app-layout>
    <h1 class="text-xl">Dashboars</h1>
    <div>{{ message }}</div>
  </app-layout>
</template>

<style></style>
