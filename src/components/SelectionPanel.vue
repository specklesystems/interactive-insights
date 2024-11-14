<template>
  <div class="absolute z-10 top-4 right-4 flex gap-x-2">
    <div
      class="bg-white rounded-xl overflow-hidden border border-outline-2 flex flex-col shadow-md min-w-72"
    >
      <div class="flex items-center py-3 px-4 border-b border-outline-2">
        <h2 class="text-sm font-medium text-gray-800">Selection info</h2>
      </div>
      <div class="py-3 px-4 text-sm flex flex-col gap-y-1">
        <!-- <template v-if="selectionInfo">
          <div>
            <span class="font-medium">ID:</span> {{ selectionInfo.id }}
          </div>
          <div>
            <span class="font-medium">Category:</span> {{ selectionInfo.category }}
          </div>
          <div>
            <span class="font-medium">Level:</span> {{ selectionInfo.level.name }}
          </div>
        </template>
        <p v-else class="text-sm text-gray-500">No selection</p> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useViewer from '@/composables/viewer'

const { selectionInfo } = useViewer()
</script>
