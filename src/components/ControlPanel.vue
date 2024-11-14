<template>
  <div class="absolute z-10 top-4 left-4 flex gap-x-2">
    <div
      class="bg-white rounded-xl overflow-hidden border border-outline-2 flex flex-col shadow-md min-w-72"
    >
      <div class="flex items-center py-3 px-4 border-b border-outline-2">
        <h2 class="text-sm font-medium text-gray-800">Levels</h2>
      </div>
      <div class="py-3 px-4">
        <div class="flex gap-x-2">
          <BaseButton @click="getLevels">Get levels</BaseButton>
          <BaseButton @click="categorizeLevels">Categorize levels</BaseButton>
          <BaseButton @click="uncategorizeLevels">Uncategorize levels</BaseButton>
        </div>
        <div v-if="levels" class="flex flex-col gap-y-2 items-start text-sm mt-4 mb-2">
          <button
            v-for="(property, index) in levels?.valueGroups"
            :key="`level-${index}`"
            class="hover:text-blue-600"
            @click="isolate(property.ids)"
          >
            {{ property.value }}
          </button>
          <button class="font-medium hover:text-blue-600 mt-2" @click="resetFilters">Show all</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import useViewer from '@/composables/viewer'
import { properties } from '@/composables/viewer'
import type { StringPropertyInfo, PropertyInfo } from '@speckle/viewer'

const { categorize, isolate, animate, resetFilters } = useViewer()

const levels = ref()

// Get all the properties with the key 'properties.Instance Parameters.Constraints.Level.value'
const getLevels = async () => {
  if (!properties) return
  levels.value = properties.find((property: PropertyInfo) => property.key === 'properties.Instance Parameters.Constraints.Level.value')
}

// Categorize the levels and isolate the objects
const categorizeLevels = async () => {
  await getLevels()
  categorize(levels.value.valueGroups)
  isolate(levels.value.valueGroups.flatMap((group: StringPropertyInfo['valueGroups']) => group.ids))
  animate()
}

// Reset filters and reverse the animation
const uncategorizeLevels = async () => {
  resetFilters()
  animate({ reverse: true })
}
</script>
