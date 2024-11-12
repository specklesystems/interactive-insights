<template>
  <div class="h-screen w-screen">
    <div class="h-screen w-screen" ref="canvas" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import useViewer from '@/composables/viewer/viewer'

const canvas = useTemplateRef('canvas')
const { init: initViewer, addExtensions,loadModelFromUrl } = useViewer()

onMounted(async () => {
    await initViewer(canvas.value)
    addExtensions()
    await loadModelFromUrl(
      'https://app.speckle.systems/projects/24c98619ac/models/38639656b8'
    )
})
</script>
