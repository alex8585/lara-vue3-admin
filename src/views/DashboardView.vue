<script setup lang="ts">
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { ref } from "vue";
const message = ref();
window.Pusher = Pusher;

const token = localStorage.getItem("token");
const authHost = import.meta.env.VITE_PUSHER_HOST;

const echo = new Echo({
  authEndpoint: `${authHost}broadcasting/auth`,
  auth: {
    headers: {
      Authorization: "Bearer " + token,
    },
  },
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_KEY,
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
});

echo
  .channel("private-message.dashboard")
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
