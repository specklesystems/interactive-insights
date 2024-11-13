<template>
    <div class="absolute z-10 top-4 left-4 flex gap-x-2">
    <div
      class="bg-white rounded-xl overflow-hidden border border-outline-2 flex flex-col shadow-md min-w-72"
    >
      <div class="flex items-center py-3 px-4 border-b border-outline-2">
        <h2 class="text-sm font-medium text-gray-800">Control Panel</h2>
      </div>
      <div class="py-3 px-4">
        <button @click="doStuff">Get materials</button>
        <button @click="doStuff2">Get materials 2</button>
      </div>
    </div>
  </div>

  <div class="h-screen w-screen">
    <div class="h-screen w-screen" ref="canvas" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, useTemplateRef, ref } from 'vue'
import useViewer from '@/composables/viewer'
import {
  CameraController,
  DefaultViewerParams,
  SelectionExtension,
  FilteringExtension,
  SpeckleLoader,
  UrlHelper,
  Viewer,
  ViewerEvent,
  type SelectionEvent
} from '@speckle/viewer'
import { Catalogue } from './../extensions/Catalogue'

const canvas = useTemplateRef('canvas')
// const { init: initViewer, loadModelFromUrl, viewer,getObjectProperties } = useViewer()

const material = ref(null)
let viewer = null

onMounted(async () => {
  // if (!canvas.value) return
  // await initViewer(canvas.value)
  // await loadModelFromUrl(
  //   'https://app.speckle.systems/projects/24c98619ac/models/38639656b8',
  // )

  // console.log(viewer.getObjectProperties())

  // // await getObjectProperties()

  const params = DefaultViewerParams
  params.showStats = false
  params.verbose = true

  viewer = new Viewer(canvas.value, params)

  await viewer.init()

  viewer.createExtension(CameraController)
  viewer.createExtension(SelectionExtension)
  viewer.createExtension(Catalogue)
  viewer.createExtension(FilteringExtension)

  const urls = await UrlHelper.getResourceUrls('https://app.speckle.systems/projects/24c98619ac/models/38639656b8')
  urls.forEach(async (url) => {
    if (!viewer) return
    const loader = new SpeckleLoader(viewer.getWorldTree(), url, '')
    await viewer.loadObject(loader, true)
  })

  viewer.on(ViewerEvent.LoadComplete, async() => {
  const properties = await viewer.getObjectProperties()
  console.log('properties', properties)

    material.value = properties.find(property => property.key === 'renderMaterial.name')
    console.log('material', material.value)
  })


  viewer.on(ViewerEvent.ObjectClicked, (event: SelectionEvent | null) => {
    if (event) {
      console.log(event.hits[0].node.model.id)

      const nodes = viewer.getWorldTree().findId(event.hits[0].node.model.id)
      console.log('nodes', nodes[0])
    }
  })
})

const doStuff = () => {
  console.log('material', material.value)
  const catalogue = viewer.getExtension(Catalogue)
  catalogue.categorize(material.value.valueGroups)
  catalogue.animate()
}

const doStuff2 = () => {
  console.log('material', material.value)

  const filter = viewer.getExtension(FilteringExtension)
  filter.isolateObjects(material.value.valueGroups[0].ids)


  // catalogue.categorize(material.value.valueGroups)
  // catalogue.animate()
}
</script>
