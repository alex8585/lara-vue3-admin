<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { OptionType, PostForm, TagType } from "@/types/data-table";

import ErrorMsg from "@/components/ErrorMsg.vue";

const props = defineProps({
  initValues: {
    default: () => [],
    type: Array,
  },
  show: {
    default: false,
    type: Boolean,
  },
});

const emit = defineEmits(["change", "mount", "send"]);

const isShow = ref(false);

const initForm = {
  method: "PUT",
  name: null,
  email: null,
  password: null,
};

const dialogRef = ref();
const form = ref<any>(initForm);

const errors = ref<any>({});
function onSend() {
  emit("send", form);
}

onMounted(async () => {
  isShow.value = props.show;
  emit("mount");
});

function set(row: any) {
  form.value = { ...row, _method: "PUT" };
}

function hide() {
  dialogRef.value.hide();
}
function clearErrors() {
  errors.value = {};
}
function reset() {
  form.value = { ...initForm };
  errors.value = {};
  emit("change", form);
}

function show() {
  isShow.value = true;
}

function setErrors(err: {}) {
  errors.value = { ...err };
}
defineExpose({
  setErrors,
  clearErrors,
  reset,
  hide,
  show,
  set,
});
</script>

<template>
  <q-dialog ref="dialogRef" v-model="isShow">
    <q-card style="width: 600px; max-width: 60vw">
      <q-card-section class="flex justify-between">
        <div class="text-h6">Update User</div>
        <q-btn
          v-close-popup
          round
          flat
          dense
          icon="close"
          class="float-right"
          color="grey-8"
        />
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-pt-none">
        <ErrorMsg :error="errors.global" />
        <q-form class="q-gutter-md">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs"> Name </q-item-label>
                <q-input
                  v-model="form.name"
                  :error-message="errors.name ? errors.name[0] : ''"
                  :error="!!errors.name"
                  filled
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs"> Email </q-item-label>
                <q-input
                  v-model="form.email"
                  :error-message="errors.email ? errors.email[0] : ''"
                  :error="!!errors.email"
                  filled
                />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs"> Password </q-item-label>
                <q-input
                  type="password"
                  v-model="form.password"
                  :error-message="errors.password ? errors.password[0] : ''"
                  :error="!!errors.password"
                  filled
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-form>
      </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="Cancel" color="primary" />
          <q-btn label="Save" color="primary" @click="onSend" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
