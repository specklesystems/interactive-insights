<template>
  <div class="h-screen w-screen">
    <div class="h-screen w-screen" ref="canvas" width="100%" height="100%" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import {
  CameraController,
  DefaultViewerParams,
  SelectionExtension,
  SpeckleLoader,
  UrlHelper,
  Viewer,
} from '@speckle/viewer'

const canvas = useTemplateRef('canvas')

onMounted(async () => {
  const params = DefaultViewerParams
  params.showStats = false
  params.verbose = true

  const viewer = new Viewer(canvas.value, params)
  await viewer.init()

  /** Add the stock camera controller extension */
  viewer.createExtension(CameraController)
  /** Add the selection extension for extra interactivity */
  viewer.createExtension(SelectionExtension)

  /** Create a loader for the speckle stream */
  const urls = await UrlHelper.getResourceUrls(
    'https://app.speckle.systems/projects/24c98619ac/models/38639656b8',
  )
  for (const url of urls) {
    const loader = new SpeckleLoader(viewer.getWorldTree(), url, '')
    /** Load the speckle data */
    await viewer.loadObject(loader, true)
  }
})
</script>
