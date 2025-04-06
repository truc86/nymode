<script setup lang="ts">
import { useLang } from '~/composable/useLang';
import type { Category } from '~/types/Category';

const { getLang } = useLang();
const lang = ref(getLang());

defineProps<{
  categories: Category[];
}>();
</script>

<template>
  <ul>
    <li v-for="category in categories" :key="category.id">
      {{ category.name[lang] }}
      <CategoryNav
        v-if="category.categories"
        :categories="
          Array.isArray(category.categories)
            ? category.categories
            : [category.categories]
        "
      />
    </li>
  </ul>
</template>
