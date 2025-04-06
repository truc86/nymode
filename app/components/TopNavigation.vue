<script setup lang="ts">
import { useLang } from '~/composable/useLang';
import type { langType } from '~/types/Language';

const { data } = await fetchData();
const categories = data.value?.categories || [];

const { getLang, setLang } = useLang();
const lang = ref<langType>(getLang());
const changeLang = () => {
  lang.value = lang.value === 'en' ? 'dk' : 'en';
  setLang(lang.value);
};
</script>

<template>
  <nav class="shadow-md py-4 dark:bg-gray-900">
    <div class="container mx-auto px-4 flex items-center justify-between">
      <NuxtLink to="/" class="font-bold text-xl text-indigo-600"
        >NyMode</NuxtLink
      >

      <!-- <CategoryNav :categories="categories" /> -->
      <ul class="flex space-x-4">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/Products">Products</NuxtLink></li>
      </ul>

      <div class="flex items-center space-x-4">
        <button
          @click="changeLang"
          class="text-white px-4 py-2 rounded transition duration-300 hover:cursor-pointer"
        >
          <svg v-if="lang === 'en'" class="h-6 w-6" viewBox="0 0 37 28">
            <!-- English/UK Flag -->
            <clipPath id="s">
              <path d="M0,0 v28 h37 v-28 z" />
            </clipPath>
            <path d="M0,0 v28 h37 v-28 z" fill="#012169" />
            <path d="M0,0 L37,28 M37,0 L0,28" stroke="#fff" stroke-width="4" />
            <path
              d="M0,0 L37,28 M37,0 L0,28"
              clip-path="url(#s)"
              stroke="#C8102E"
              stroke-width="2.5"
            />
            <path d="M18.5,0 v28 M0,14 h37" stroke="#fff" stroke-width="7" />
            <path d="M18.5,0 v28 M0,14 h37" stroke="#C8102E" stroke-width="4" />
          </svg>
          <svg v-else class="h-6 w-6" viewBox="0 0 37 28">
            <!-- Danish Flag -->
            <rect width="37" height="28" fill="#C8102E" />
            <rect width="4" height="28" x="12" fill="#fff" />
            <rect width="37" height="4" y="12" fill="#fff" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>
