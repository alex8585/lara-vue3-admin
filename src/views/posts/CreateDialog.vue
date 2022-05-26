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

const dialogRef = ref();
const isShow = ref(false);
const errors = ref({});

const initForm: TagRowFormType = {
  title: null,
  description: null,
};

const form = ref(initForm);

function onSend() {
  emit("send", form);
}

onMounted(() => {
  isShow.value = props.show;
  emit("mount");
});

function hide() {
  dialogRef.value.hide();
}

function reset() {
  //form.value.clearErrors();
  //set(initForm);
  form.value = {};
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
  reset,
  hide,
  show,
});
</script>

<template>
  <q-dialog ref="dialogRef" v-model="isShow">
    <q-card style="width: 600px; max-width: 60vw">
      <q-card-section>
        <q-btn
          v-close-popup
          round
          flat
          dense
          icon="close"
          class="float-right"
          color="grey-8"
        />
        <div class="text-h6">Create Post</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs"> Title </q-item-label>
                <q-input
                  v-model="form.title"
                  :error-message="errors.title ? errors.title[0] : ''"
                  :error="!!errors.title"
                  filled
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs"> Description </q-item-label>
                <q-input
                  v-model="form.description"
                  :error-message="
                    errors.description ? errors.description[0] : ''
                  "
                  :error="!!errors.description"
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
