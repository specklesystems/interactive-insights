import {
  CameraController,
  DefaultViewerParams,
  SelectionExtension,
  FilteringExtension,
  SpeckleLoader,
  UrlHelper,
  Viewer,
  ViewerEvent,
  type SelectionEvent,
  type PropertyInfo
} from '@speckle/viewer'
import { Catalogue, type CatalogueOptions } from '@/extensions/Catalogue'
import { ref } from 'vue'

export let viewer: Viewer | undefined = undefined
export let properties: PropertyInfo[] | undefined = undefined

const selectionInfo = ref(null)

export default function useViewer() {
  const init = async (element: HTMLDivElement) => {
    // const params = {
    //   ...DefaultViewerParams,
    //   showStats: false,
    //   verbose: true
    // }

    // viewer = new Viewer(element, params)
    // await viewer.init()

    // viewer.on(ViewerEvent.LoadComplete, async() => {
    //   properties = await viewer.getObjectProperties()
    // })

    // viewer.on(ViewerEvent.ObjectClicked, (event: SelectionEvent | null) => {
    //   if (event) {
    //     const nodes = viewer.getWorldTree().findId(event.hits[0].node.model.id)
    //     if (nodes && nodes.length > 0) {
    //       selectionInfo.value = nodes[0].model.raw
    //     }
    //   } else {
    //     selectionInfo.value = null
    //   }
    // })
  }

  const addExtensions = () => {
    // if (!viewer) return
    // viewer.createExtension(CameraController)
    // viewer.createExtension(SelectionExtension)
    // viewer.createExtension(FilteringExtension)
    // viewer.createExtension(Catalogue)
  }

  const loadModelFromUrl = async (url: string, authToken?: string) => {
    // const urls = await UrlHelper.getResourceUrls(url, authToken)
    // urls.forEach(async (url) => {
    //   if (!viewer) return
    //   const loader = new SpeckleLoader(viewer.getWorldTree(), url, '')
    //   await viewer.loadObject(loader, true)
    // })
  }

  const isolate = async (ids: Array<string>) => {
    // if (!viewer) return
    // const filter = viewer.getExtension(FilteringExtension)
    // filter.resetFilters()
    // filter.isolateObjects(ids)
  }

   const categorize = async (
    input: Array<{ ids: Array<string>; value: string }>,
    options?: CatalogueOptions
  ) => {
    // if (!viewer) return
    // const catalogue = viewer.getExtension(Catalogue)
    // catalogue.categorize(input, options)
  }

  const animate = async (options?:{ reverse?: boolean }) => {
    // const { reverse } = options || {}
    // if (!viewer) return
    // const catalogue = viewer.getExtension(Catalogue)
    // catalogue.animate(reverse)
  }

  const resetFilters = async () => {
    // if (!viewer) return
    // const filter = viewer.getExtension(FilteringExtension)
    // filter.resetFilters()
  }

  return {
    init,
    loadModelFromUrl,
    addExtensions,
    selectionInfo,
    isolate,
    categorize,
    animate,
    resetFilters
  }
}
