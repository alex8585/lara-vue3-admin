<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
//import { mainNav, isTitle, isLink } from "@/_nav";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const route = useRoute();
const router = useRouter();
const routes = router.options.routes;

const icons = {
  Tags: "dashboard",
  Categories: "dashboard",
  Posts: "dashboard",
  Dashboard: "dashboard",
};

function isCurrentUrl(url) {
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
            <q-list>
              <template #content>
                <!-- Account Management -->
                <div class="block px-4 py-2 text-xs text-gray-400"></div>

                <div class="border-t border-gray-100" />

                <!-- Authentication -->
                <dropdown-link
                  v-if="$page.props.auth.is_impersonating"
                  icon="lock-open"
                  class="bg-yellow-300 hover:bg-yellow-500"
                  @click="stopImpersonate"
                >
                </dropdown-link>

                <!-- Authentication -->
                <dropdown-link icon="logout" @click="logout"> </dropdown-link>
              </template>
              <dropdown-link icon="logout" @click="logout">
                <q-item>
                  <q-item-section>
                    <q-item-label> </q-item-label>
                  </q-item-section>
                </q-item>
              </dropdown-link>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <!-- <div class="wrapper"> -->
        <!--   <q-btn color="primary" label="Primary" /> -->
        <!--   <q-btn color="white" text-color="black" label="Standard" /> -->
        <!--   <nav> -->
        <!--     <RouterLink to="/">Home</RouterLink> -->
        <!--     <RouterLink to="/about">About</RouterLink> -->
        <!--   </nav> -->
        <!-- </div> -->

        <div v-for="(r, i) in routes" :key="i" class="mb-4 group">
          <RouterLink
            class="flex items-center"
            :class="{ active: isCurrentUrl(r.path) }"
            :to="r.path"
          >
            <q-item>
              <q-item-section avatar>
                <q-icon :name="icons[r.name]" />

                <!-- <component :is="`${link.icon}-icon-solid`" class="w-5 h-5 mr-2" /> -->
              </q-item-section>
              <q-item-section>
                {{ r.name }}
              </q-item-section>
            </q-item>
          </RouterLink>
          <!-- <a -->
          <!--   v-if="isLink(link)" -->
          <!--   class="flex items-center" -->
          <!--   :href="link.href" -->
          <!--   :class="{ active: link.active() }" -->
          <!-- > -->
          <!--   <q-item> -->
          <!--     <q-item-section avatar> -->
          <!--       <q-icon :name="`${link.newicon}`" /> -->

          <!--       <!-1- <component :is="`${link.icon}-icon-solid`" class="w-5 h-5 mr-2" /> -1-> -->
          <!--     </q-item-section> -->
          <!--     <q-item-section> -->
          <!--       {{ link.text }} -->
          <!--     </q-item-section> -->
          <!--   </q-item> -->
          <!-- </a> -->
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <main class="px-4 py-8 md:p-8">
        <RouterView />

        <!-- <slot /> -->
      </main>
    </q-page-container>
  </q-layout>

  <!-- <app-layout>1111 </app-layout> -->
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
