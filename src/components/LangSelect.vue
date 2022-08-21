<script setup lang="ts">
import { ref } from "vue";
import { getCurrLang, getLocales } from "@/support/helpers";

import Cookies from "js-cookie";
const locales = getLocales();
const currLang = getCurrLang();
const selected = ref(currLang);

function changeLangHandler(locale: string) {
  if (locale) {
    Cookies.set("locale", locale);
    window.location.href = location.href;
  }
}
</script>
<template>
  <q-select
    @update:model-value="changeLangHandler"
    class="select-lang q-mr-sm"
    standout
    v-model="selected"
    :options="locales"
  >
  </q-select>
</template>
<style lang="scss">
.select-lang {
  .q-field__native {
    text-transform: uppercase;
    color: white;
  }
}
.q-menu {
  text-transform: uppercase;
}
</style>
