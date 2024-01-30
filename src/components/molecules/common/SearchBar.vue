<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder: string
  }>(),
  {
    placeholder: ''
  }
)
const searchValue = defineModel({
  required: false,
  default: ''
})
</script>

<template>
  <label
    class="relative flex flex-col items-center justify-center max-w-2xl gap-2 px-2 py-2 mx-auto my-10 text-sm bg-white border shadow-2xl min-w-sm md:flex-row rounded-2xl focus-within:border-gray-300"
    for="search-bar"
  >
    <input
      type="text"
      v-model="searchValue"
      id="search-bar"
      :placeholder="placeholder"
      class="flex-1 w-full px-6 py-2 bg-white rounded-md outline-none"
    />
  </label>
</template>
