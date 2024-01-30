<script setup lang="ts">
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import type { Product } from '@/types/product'
import { computed } from 'vue'
import { formattedCurrency } from '@/composables/useUtils'

const props = defineProps<{
  product: Product
}>()

const formattedPrice = computed(() => formattedCurrency(props.product.price))
const mainImg = computed(() => props.product.images[0])
</script>

<template>
  <Card class="w-[280px] h-fit rounded-none">
    <img alt="product image" width="280" height="280" :src="mainImg" />
    <CardHeader>
      <CardTitle class="mb-2 font-thin">
        {{ product.title }}
      </CardTitle>
      <span class="text-secondary">{{ formattedPrice }}</span>
    </CardHeader>
  </Card>
</template>
@/composables/useUtils
