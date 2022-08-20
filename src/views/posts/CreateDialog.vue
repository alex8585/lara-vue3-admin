<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import type { PostForm, TagType } from "@/types/data-table";
import { useTagsStore } from "@/stores/tags";
import { useCategoriesStore } from "@/stores/categories";
import ErrorMsg from "@/components/ErrorMsg.vue";
import { localeField, getLocales, getLocalesFields } from "@/support/helpers";
const tags = useTagsStore();
const cats = useCategoriesStore();

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

const dialogRef = ref();
const isShow = ref(false);
const selectedLang = ref("en");
const errors = ref<any>({});

const initFormTransFilds = getLocalesFields(["title", "description"]);
const initForm = {
  ...initFormTransFilds,
  tags: [],
  category: { label: "Default", value: null },
};

const form = ref<PostForm>(initForm);

function onSend() {
  emit("send", form);
}

let tagOptions = computed(() => {
  let options = [];
  for (const tag of [...tags.allTags] as Array<TagType>) {
    let option = {
      label: tag.name,
      value: tag.id,
    };
    options.push(option);
  }
  return options;
});

let catsOptions = computed(() => {
  let options = [];
  options.push({ label: "Default", value: null });
  for (const cat of [...cats.allCats] as Array<TagType>) {
    let option = {
      label: cat.name,
      value: cat.id,
    };
    options.push(option);
  }
  return options;
});

onMounted(async () => {
  //  await tags.getAllTags();
  //  await cats.getAllCategories();

  isShow.value = props.show;
  emit("mount");
});

function hide() {
  dialogRef.value.hide();
}

function reset() {
  //form.value.clearErrors();

  //set(initForm);
  form.value = { ...initForm };
  errors.value = {};
  emit("change", form);
}

function show() {
  selectedLang.value = "en";
  isShow.value = true;
}

function setErrors(err: {}) {
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
      <q-card-section class="flex justify-between">
        <div class="text-h6">Create Post</div>
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
                  <q-item-label class="q-pb-xs"> Title </q-item-label>
                  <q-input
                    :name="localeField(locale, 'title')"
                    v-model="form[localeField(locale, 'title')]"
                    :error-message="
                      errors[localeField(locale, 'title')]
                        ? errors[localeField(locale, 'title')][0]
                        : ''
                    "
                    :error="!!errors[localeField(locale, 'title')]"
                    filled
                  />
                </q-item-section>
              </q-item>

              <q-item v-if="locale == selectedLang">
                <q-item-section>
                  <q-item-label class="q-pb-xs"> Description </q-item-label>
                  <q-input
                    :name="localeField(locale, 'description')"
                    v-model="form[localeField(locale, 'description')]"
                    :error-message="
                      errors[localeField(locale, 'description')]
                        ? errors[localeField(locale, 'description')][0]
                        : ''
                    "
                    :error="!!errors[localeField(locale, 'description')]"
                    filled
                  />
                </q-item-section>
              </q-item>
            </div>
            <q-item>
              <q-item-section>
                <q-select
                  v-model="form.tags"
                  name="tags"
                  filled
                  multiple
                  :options="tagOptions"
                  label="Tags"
                  style="width: 250px"
                />
              </q-item-section>
              <q-item-section>
                <q-select
                  name="category"
                  v-model="form.category"
                  filled
                  :options="catsOptions"
                  label="Category"
                  style="width: 250px"
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
