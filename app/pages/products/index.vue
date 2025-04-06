<script setup lang="ts">
import type { Product } from '~/types/Product';
import type { PromotionalSpot } from '~/types/PromotionalSpot';

const { data, error, status } = await fetchData();

const { products, promotionalSpots } = data.value || {};

const gridItems = computed(() => {
  if (!products || !promotionalSpots) return [];

  const items: {
    type: 'product' | 'promo';
    data: Product | PromotionalSpot;
    id: number | string;
  }[] = [
    ...products.map((product) => ({
      type: 'product' as const,
      data: product,
      id: product.id,
    })),
  ];

  // Add promotional spots at their positions
  promotionalSpots.forEach((spot, index) => {
    if (spot.position >= 0 && spot.position <= items.length) {
      items.splice(spot.position, 0, {
        type: 'promo',
        data: spot,
        id: `promo-${index}`,
      });
    }
  });

  return items;
});
</script>

<template>
  <div v-if="data?.products as Product[]" class="container mx-auto px-4 py-8">
    <div class="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- Product Card -->
      <div
        v-for="item in gridItems"
        :key="item.id"
        :class="[
          item.type === 'product' ? 'product-item' : 'promo-item',
          item.type === 'promo' && (item.data as PromotionalSpot).type === '1x1' ? 'col-span-1' : '',
          item.type === 'promo' && (item.data as PromotionalSpot).type === '2x1' ? 'col-span-2' : '',
          item.type === 'promo' && (item.data as PromotionalSpot).type === '1x2' ? 'row-span-2' : '',
          item.type === 'promo' && (item.data as PromotionalSpot).type === '2x2'
            ? 'col-span-2 row-span-2'
            : '',
        ]"
      >
        <ProductCard v-if="item.type === 'product'" :product="item.data" />
        <div v-else class="w-full h-full">
          <NuxtImg
            :src="(item.data as PromotionalSpot).image.imageUrl"
            :alt="(item.data as PromotionalSpot).imageAltText"
            class="w-full h-full object-cover"
            sizes="100vw sm:500px md:33vw lg:25vw"
            :class="[
              (item.data as PromotionalSpot).type === '1x1' ? 'aspect-square' : '',
              (item.data as PromotionalSpot).type === '2x1' ? 'aspect-[2/1]' : '',
              (item.data as PromotionalSpot).type === '1x2' ? 'aspect-[1/2]' : '',
              (item.data as PromotionalSpot).type === '2x2' ? 'aspect-square' : '',
            ]"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="error">Error loading products: {{ error }}</div>
  <div v-else-if="status === 'pending'">Loading products...</div>
  <div v-else>No products available</div>
</template>
