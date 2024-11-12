<template>
  <div class="absolute z-10 top-4 left-4 flex gap-x-2">
    <button
      @click="isOpen = !isOpen"
      class="transition rounded-lg w-10 h-10 flex items-center justify-center shadow-md bg-white outline-none border"
      :class="{ 'bg-gray-100': isOpen }"
    >
      <IconCog />
    </button>
    <div
      v-if="isOpen"
      class="bg-white rounded-xl overflow-hidden border border-outline-2 flex flex-col shadow-md min-w-72"
    >
      <div class="flex items-center py-3 px-4 border-b border-outline-2">
        <h2 class="text-sm font-medium text-gray-800">Control Panel</h2>
      </div>
      <div class="py-3 px-4">
        <button @click="getProperties">Get materials</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconCog from './icon/IconCog.vue'
import { ref } from 'vue'
import useViewer from '@/composables/viewer/actions'

const { getObjectProperties } = useViewer()

const isOpen = ref(false)

const getProperties = async () => {
  const properties = await getObjectProperties()
  console.log('properties', properties)
}
</script>
