<template>
  <div class="h-screen w-screen">
    <div class="h-screen w-screen" ref="canvas" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import useViewer from '@/composables/viewer'

const canvas = useTemplateRef('canvas')
const { init, addExtensions,loadModelFromUrl } = useViewer()

// For demo purposes we will load two models
// You can replace these with your own as well
const MODELS = {
  ONE: 'https://app.speckle.systems/projects/7744b171ca/models/e32f5e5416',
  TWO: 'https://app.speckle.systems/projects/7744b171ca/models/7fee46df4b'
}

onMounted(async () => {
  if (!canvas.value) return

  await init(canvas.value)
  addExtensions()
  await loadModelFromUrl(MODELS.ONE)
})
</script>
