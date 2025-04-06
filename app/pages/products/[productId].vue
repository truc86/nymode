<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLang } from '~/composable/useLang';
import type { Product, SizeEnum } from '~/types/Product';

const { data, error } = await fetchData();

const { getLang } = useLang();

const route = useRoute();
const productId = route.params.productId as string;
const product = ref<Product | null>(null);
const loading = ref(true);
const selectedImage = ref('');
const selectedSize = ref<SizeEnum | number | null>(null);

onMounted(() => {
  loading.value = true;
  if (data.value?.products) {
    const foundProduct = data.value.products.find(
      (product) => String(product.id) === productId,
    );
    if (foundProduct) {
      product.value = foundProduct;
      // Set the first image as the selected image
      if (foundProduct.images && foundProduct.images.length > 0) {
        selectedImage.value = foundProduct.images[0] ?? '';
      }
    }
  }
  loading.value = false;
});

const selectImage = (image: string) => {
  selectedImage.value = image;
};

const selectSize = (size: SizeEnum | number) => {
  selectedSize.value = size;
};

const addToCart = () => {
  if (!selectedSize.value) {
    alert('Please select a size');
    return;
  }

  // Implement your add to cart logic here
  alert(
    `Added ${product.value?.name.en} to cart with size: ${selectedSize.value}`,
  );
};
</script>

<template>
  <div class="product-page container mx-auto py-8 px-4">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <p>Loading product...</p>
    </div>

    <div v-else-if="error" class="flex justify-center items-center h-64">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Image Gallery -->
      <div class="product-gallery">
        <div class="main-image mb-4">
          <NuxtImg
            :src="selectedImage"
            :alt="product.name.en"
            class="w-full h-auto object-cover rounded-lg shadow-md"
            sizes="100vw sm:50vw md: 33vw lg:25vw"
          />
        </div>

        <div
          v-if="product.images && product.images.length > 1"
          class="thumbnails flex gap-2 overflow-x-auto"
        >
          <div
            v-for="(image, index) in product.images"
            :key="index"
            @click="selectImage(image)"
            class="thumbnail cursor-pointer"
            :class="{ 'border-2 border-blue-500': selectedImage === image }"
          >
            <NuxtImg
              :src="image"
              :alt="`${product.name.en} - thumbnail ${index + 1}`"
              class="w-16 h-16 object-cover rounded-md"
              width="64px"
              height="64px"
            />
          </div>
        </div>
      </div>

      <!-- Product Details -->
      <div class="product-info">
        <div class="brand text-sm text-gray-500">{{ product.brand }}</div>
        <h1 class="text-2xl font-bold mb-2">{{ product.name.en }}</h1>
        <div class="price text-xl font-bold mb-4">
          {{ getLang() == 'en' ? '$' : '' }}{{ product.price.toFixed(2)
          }}{{ getLang() == 'dk' ? ' DKK' : '' }}
        </div>

        <div class="color mb-4">
          <h2 class="text-sm font-semibold mb-1">Color</h2>
          <div class="color-display flex items-center">
            <span>{{ product.color }}</span>
          </div>
        </div>

        <div class="sizes mb-6">
          <h2 class="text-sm font-semibold mb-1">Size</h2>
          <div class="size-options flex flex-wrap gap-2">
            <button
              v-for="size in product.size"
              :key="size"
              @click="selectSize(size)"
              class="size-option px-4 py-2 border rounded-md"
              :class="{ 'bg-blue-500 text-white': selectedSize === size }"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <div class="stock mb-4">
          <span
            class="text-sm"
            :class="{
              'text-green-500':
                product.stock === 'unlimited' ||
                (typeof product.stock === 'number' && product.stock > 0),
              'text-red-500': product.stock === 0,
            }"
          >
            {{
              typeof product.stock === 'number' && product.stock > 0
                ? 'In Stock'
                : 'Out of Stock'
            }}
          </span>
        </div>

        <button
          @click="addToCart"
          class="add-to-cart w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          :disabled="typeof product.stock === 'number' && product.stock === 0"
        >
          Add to Cart
        </button>

        <div
          v-if="product.variant && product.variant.length"
          class="variants mt-6"
        >
          <h2 class="text-sm font-semibold mb-1">Available Variants</h2>
          <div
            v-for="(variant, index) in product.variant"
            :key="index"
            class="variant p-2 border-b"
          >
            <div class="font-medium">{{ variant.name }}</div>
            <div class="mt-1">
              <div>
                <div class="variant-images flex gap-2 overflow-x-auto mb-2">
                  <NuxtImg
                    v-for="(image, idx) in variant.images || []"
                    :key="idx"
                    :src="image"
                    :alt="`${variant.name} - image ${idx + 1}`"
                    class="w-16 h-16 object-cover rounded-md"
                    width="64px"
                    height="64px"
                  />
                </div>
              </div>
              <div class="text-sm text-gray-300">
                Color: {{ variant.color }}
              </div>
              <div class="text-sm text-gray-300">
                Available sizes: {{ variant.size.join(', ') }}
              </div>
              <div class="text-sm text-gray-300">
                Stock:
                <span
                  :class="{
                    'text-green-500':
                      variant.stock === 'unlimited' ||
                      (typeof variant.stock === 'number' && variant.stock > 0),
                    'text-red-500': variant.stock === 0,
                  }"
                >
                  {{
                    typeof variant.stock === 'number' && variant.stock > 0
                      ? 'In Stock'
                      : 'Out of Stock'
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex justify-center items-center h-64">
      <p>Product not found</p>
    </div>
  </div>
</template>
