<script setup lang="ts">
import type { Product } from '@/types/product'
import ProductItem from '@/components/molecules/product/ProductItem.vue'

withDefaults(
  defineProps<{
    products?: Product[]
  }>(),
  {
    products: () => [] as Product[]
  }
)
</script>

<template>
  <div class="container max-w-screen-xl">
    <masonry-wall :items="products" :ssr-columns="1" :column-width="300" :gap="4">
      <template #default="{ item }">
        <product-item :product="item" class="mb-10" />
      </template>
    </masonry-wall>
  </div>
</template>
