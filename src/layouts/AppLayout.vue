<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useAuth from "@/composables/auth";

const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

interface Route {
  name: "string";
  path: "string";
}

const route = useRoute();
const router = useRouter();
const routes: Route[] = router.options.routes as Route[];

const icons = {
  Dashboard: "dashboard",
  Categories: "collections",
  Posts: "library_books",
  Tags: "local_offer",
};

const { isLoged } = useAuth();

onMounted(() => {
  if (!isLoged.value) {
    router.push("/login");
  }
});

function isCurrentUrl(url: "string") {
  return url == route.path;
}
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Admin panel </q-toolbar-title>
        <div class="q-pa-md">
          <q-btn-dropdown color="primary" label="Account">
            <q-list> </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <div v-for="(r, i) in routes" :key="i" class="mb-4 group">
          <RouterLink
            v-if="icons[r.name]"
            class="flex items-center"
            :class="{ active: isCurrentUrl(r.path) }"
            :to="r.path"
          >
            <q-item>
              <q-item-section avatar>
                <q-icon :name="icons[r.name]" />
              </q-item-section>
              <q-item-section>
                {{ r.name }}
              </q-item-section>
            </q-item>
          </RouterLink>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <main class="px-4 py-8 md:p-8"><slot /></main>
    </q-page-container>
  </q-layout>
</template>
<style lang="scss">
@import "@/assets/base.css";

a {
  &:hover {
    background-color: #dfdfdf !important;
  }

  &.active {
    background-color: #dfdfdf !important;
  }
}
</style>
