<template>
  <div class="h-screen w-screen">
    <div class="h-screen w-screen" ref="canvas" width="100%" height="100%" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import useViewer from '@/composables/viewer'

const canvas = useTemplateRef('canvas')
const { init: initViewer, viewer, loadModelFromUrl } = useViewer()

onMounted(async () => {
  await initViewer(canvas.value)
  await loadModelFromUrl('https://app.speckle.systems/projects/24c98619ac/models/38639656b8')
})
</script>
