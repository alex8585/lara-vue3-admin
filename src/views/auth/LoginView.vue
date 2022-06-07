<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "@/composables/auth";

const errors = ref<any>({});
const initForm = {
  email: "",
  password: "",
};

//const url = "/api/v1/auth/login";
const form = ref(initForm);
const router = useRouter();
function setErrors(err: {}) {
  errors.value = { ...err };
}

const { login, getUser } = useAuth();

onMounted(async () => {
  let user = await getUser();
  if (user) {
    router.push("/");
  }
});

async function loginSendHandler() {
  const res = await login(form.value.email, form.value.password);
  if (res.error) {
    if (res.msg) {
      setErrors(res.msg);
    }
  } else {
    router.push("/");
  }
}
</script>
<template>
  <auth-layout>
    <h1 class="text-xl text-center">Login</h1>
    <q-form class="q-gutter-md">
      <q-list>
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
            <q-btn label="Login" color="primary" @click="loginSendHandler" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-form>
  </auth-layout>
</template>
