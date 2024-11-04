<template>
  <div>
    <div class="canvas" ref="myCanvas" width="100%" height="100%"></div>
  </div>
</template>

<script lang="ts">
import {
  CameraController,
  DefaultViewerParams,
  SelectionExtension,
  SpeckleLoader,
  UrlHelper,
  Viewer,
} from '@speckle/viewer'
export default {
  name: 'CanvasComponent',
  async mounted() {
    const params = DefaultViewerParams
    params.showStats = false
    params.verbose = true

    const viewer = new Viewer(this.$refs.myCanvas, params)
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
  },
}
</script>

<style scoped>
.canvas {
  border: 1px solid black;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
