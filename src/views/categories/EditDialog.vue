<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { TagRowFormType } from "@admin/types/data-table";

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

const initForm: TagRowFormType = {
  _method: "PUT",
  name: null,
  id: null,
};

const dialogRef = ref();
const form = ref(initForm);

const errors = ref({});
function onSend() {
  emit("send", form);
}

onMounted(() => {
  isShow.value = props.show;
  emit("mount");
});

function set(row) {
  form.value = { ...row };
  form.value._method = "PUT";
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

function setErrors(err) {
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
        <div class="text-h6">Update Category</div>
        <q-btn v-close-popup round flat dense icon="close" color="grey-8" />
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-pt-none">
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
