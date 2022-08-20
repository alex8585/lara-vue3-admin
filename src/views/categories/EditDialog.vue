<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { CategoryForm } from "@/types/data-table";
import { localeField, getLocales, getLocalesFields } from "@/support/helpers";

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
const locales = getLocales();
const localesOptions = locales.map((e) => ({ label: e, value: e }));
const emit = defineEmits(["change", "mount", "send"]);

const selectedLang = ref("en");
const isShow = ref(false);

const initForm = getLocalesFields(["name"]);

const dialogRef = ref();
const form = ref<CategoryForm>(initForm);

const errors = ref<any>({});
function onSend() {
  emit("send", form);
}

onMounted(() => {
  isShow.value = props.show;
  emit("mount");
});

function set(row: CategoryForm) {
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
  selectedLang.value = "en";
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
        <div class="text-h6">Update Category</div>
        <q-btn v-close-popup round flat dense icon="close" color="grey-8" />
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-pt-none">
        <ErrorMsg :error="errors" />
        <div class="togle-wrapp">
          <q-btn-toggle
            v-model="selectedLang"
            push
            glossy
            toggle-color="primary"
            :options="localesOptions"
          />
        </div>
        <q-form class="q-gutter-md">
          <q-list>
            <div v-for="locale in locales" :key="locale">
              <q-item v-if="locale == selectedLang">
                <q-item-section>
                  <q-item-label class="q-pb-xs"> Name </q-item-label>
                  <q-input
                    :name="localeField(locale, 'name')"
                    v-model="form[localeField(locale, 'name')]"
                    :error-message="
                      errors[localeField(locale, 'name')]
                        ? errors[localeField(locale, 'name')][0]
                        : ''
                    "
                    :error="!!errors[localeField(locale, 'name')]"
                    filled
                  />
                </q-item-section>
              </q-item>
            </div>
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
<style lang="css" scoped>
.togle-wrapp {
  margin-top: 10px;
  text-align: center;
}
</style>
