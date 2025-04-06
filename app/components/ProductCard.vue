<script setup lang="ts">
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <NuxtLink :to="`/products/${product.id}`" class="product-card cursor-pointer">
    <figure
      class="product-image-container relative overflow-hidden"
      v-if="product.images && product.images.length"
    >
      <NuxtImg
        :src="product.images[0]"
        :alt="product.title"
        class="product-image w-full transition-opacity duration-300 ease-in-out hover:opacity-0"
        sizes="100vw sm:500px md:33vw lg:25vw"
      />
      <NuxtImg
        v-if="product.images && product.images.length > 1"
        :src="product.images[1]"
        :alt="product.title"
        sizes="100vw sm:50vw md:33vw lg:25vw"
        class="product-image absolute inset-0 w-full opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"
      />
    </figure>
    <div class="product-details">
      <p class="product-brand">{{ product.brand }}</p>
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-price">{{ product.price }}</p>

      <div
        class="product-colors"
        v-if="product.colors && product.colors.length"
      >
        <div
          v-for="color in product.colors"
          :key="color.id"
          class="color-swatch"
          :style="{ backgroundColor: color.hex }"
          :title="color.name"
        ></div>
      </div>
    </div>
  </NuxtLink>
</template>
