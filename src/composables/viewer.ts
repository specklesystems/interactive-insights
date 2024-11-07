import { ref } from 'vue'
import {
  CameraController,
  DefaultViewerParams,
  SelectionExtension,
  SpeckleLoader,
  UrlHelper,
  Viewer,
} from '@speckle/viewer'

export default function useViewer() {
  const viewer = ref<Viewer | null>(null)

  /**
   * Initialize the viewer
   * @param element - HTMLElement to initialize the viewer on
   */
  async function init(element: HTMLElement) {
    // Set the default viewer parameters
    const params = DefaultViewerParams
    params.showStats = false
    params.verbose = true

    // Create the viewer instance on the element
    viewer.value = new Viewer(element, params)

    // Add the stock camera controller and selection extensions
    viewer.value.createExtension(CameraController)
    viewer.value.createExtension(SelectionExtension)
  }

  /**
   * Load a model from a Speckle URL
   * @param url - The URL of the Speckle model
   */
  const loadModelFromUrl = async (url: string) => {
    if (!viewer.value) return

    const urls = await UrlHelper.getResourceUrls(url)
    urls.forEach(async (url) => {
      const loader = new SpeckleLoader(viewer.value.getWorldTree(), url, '')
      await viewer.value.loadObject(loader, true)
    })
  }

  return {
    init,
    viewer,
    loadModelFromUrl,
  }
}
