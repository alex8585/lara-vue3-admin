<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import useAuth from "@/composables/auth";
const errors = ref<any>({});
const initForm = {
  email: null,
  password: null,
};

const { getUser, register } = useAuth();
const form = ref(initForm);
const router = useRouter();
function setErrors(err: {}) {
  errors.value = { ...err };
}

onMounted(async () => {
  let user = await getUser();
  if (user) {
    router.push("/");
  }
});

async function regSendHandler() {
  const res = await register(form.value.email, form.value.password);
  if (res.error) {
    setErrors(res.msg);
  } else {
    router.push("/");
  }
}
</script>
<template>
  <auth-layout>
    <h1 class="text-xl text-center">Registration</h1>
    <q-form class="q-gutter-md">
      <q-list>
        <!-- <q-item> -->
        <!--   <q-item-section> -->
        <!--     <q-item-label class="q-pb-xs"> Name </q-item-label> -->
        <!--     <q-input -->
        <!--       v-model="form.name" -->
        <!--       :error-message="errors.name ? errors.name[0] : ''" -->
        <!--       :error="!!errors.name" -->
        <!--       filled -->
        <!--     /> -->
        <!--   </q-item-section> -->
        <!-- </q-item> -->
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs"> Email </q-item-label>
            <q-input
              v-model="form.email"
              type="email"
              :error-message="errors.email ? errors.email[0] : ''"
              :error="!!errors.email"
              filled
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs">Password</q-item-label>
            <q-input
              v-model="form.password"
              :error-message="errors.password ? errors.password[0] : ''"
              :error="!!errors.password"
              type="password"
              filled
            />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-btn label="Send" color="primary" @click="regSendHandler" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-form>
  </auth-layout>
</template>
