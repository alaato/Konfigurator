<template>
  <div class="w-full bg-inherit p-4 rounded-lg ">
    <div class="flex flex-wrap gap-4 items-center">
      <h2 class="text-lg font-semibold mr-4">Filters:</h2>
      <div v-for="(options, category) in filters" :key="category" class="relative">
        <Button
          @click="toggleDropdown(category)"
          class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-md transition-colors duration-200"
        >
          {{ category }}
          <ChevronDown :class="{ 'transform rotate-180': openDropdown === category }" class="h-4 w-4 transition-transform duration-200" />
        </Button>
        <div
          v-if="openDropdown === category"
          class="absolute z-10 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-md shadow-lg p-2"
        >
          <div class="grid grid-cols-2 gap-2">
            <div v-for="option in options" :key="option" class="flex items-center space-x-2">
              <input
                type="checkbox"
                :id="`${category}-${option.toLowerCase()}`"
                v-model="selectedFilters[category][option]"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label :for="`${category}-${option.toLowerCase()}`" class="text-sm">{{ option }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDown } from 'lucide-vue-next'

const filters = {
  Color: ["white", "Black", "Silver"],
  Material: ["Kunststoff", "Aluminium"],
}

const openDropdown = ref(null)
const selectedFilters = reactive(Object.fromEntries(
  Object.keys(filters).map(category => [category, {}])
))

const toggleDropdown = (category) => {
  openDropdown.value = openDropdown.value === category ? null : category
}
</script>

<style scoped>
/* Add any additional component-specific styles here */
</style>