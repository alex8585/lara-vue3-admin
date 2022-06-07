<script lang="ts" setup>
import { useTagsStore } from "@/stores/tags";
import { useCategoriesStore } from "@/stores/categories";

import type { TagType } from "@/types/data-table";
import { ref, computed } from "vue";
const tags = useTagsStore();
const cats = useCategoriesStore();

const initVal = {
  id: "",
  title: "",
  description: "",
  tags: [],
  category: { label: "Default", value: "" },
  q: "",
};
const form = ref({ ...initVal });

const emit = defineEmits(["send"]);

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
  options.push({ label: "Default", value: "" });
  for (const cat of [...cats.allCats] as Array<TagType>) {
    let option = {
      label: cat.name,
      value: cat.id,
    };
    options.push(option);
  }
  return options;
});

function onReset() {
  form.value = { ...initVal };
  emit("send", form);
}
function onSend() {
  emit("send", form);
}
</script>

<template>
  <q-expansion-item
    class="shadow-1 overflow-hidden"
    style=""
    icon="filter_alt"
    label="Filter"
    header-class="bg-primary text-white"
    expand-icon-class="text-white"
  >
    <q-card>
      <q-form class="q-gutter-md">
        <q-list>
          <q-item>
            <q-item-section>
              <q-input v-model="form.q" label="Search">
                <template #append>
                  <q-icon name="search" class="cursor-pointer" />
                </template>
              </q-input>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs"> ID </q-item-label>
              <q-input v-model="form.id" filled />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs"> Title </q-item-label>
              <q-input v-model="form.title" filled />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label class="q-pb-xs"> Description </q-item-label>
              <q-input v-model="form.description" filled />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-select
                v-model="form.tags"
                filled
                multiple
                :options="tagOptions"
                label="Tags"
                style="width: 250px"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                v-model="form.category"
                filled
                :options="catsOptions"
                label="Category"
                style="width: 250px"
              />
            </q-item-section>
          </q-item>

          <q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Reset" color="primary" @click="onReset" />
              <q-btn label="Apply" color="primary" @click="onSend" />
            </q-card-actions>
          </q-card-section>
        </q-list>
      </q-form>
      <div></div>
    </q-card>
  </q-expansion-item>
</template>
