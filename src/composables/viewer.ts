import { ref } from 'vue'
import {
  CameraController,
  DefaultViewerParams,
  SelectionExtension,
  SpeckleLoader,
  UrlHelper,
  Viewer,
} from '@speckle/viewer'

let viewer: Viewer | null = null

export default function useViewer() {
  /**
   * Initialize the viewer
   * @param element - HTMLDivElement to initialize the viewer on
   */
  async function init(element: HTMLDivElement) {
    // Set the default viewer parameters
    const params = DefaultViewerParams
    params.showStats = false
    params.verbose = true

    // Create the viewer instance on the element
    viewer = new Viewer(element, params)

    await viewer.init()

    // Add the stock camera controller and selection extensions
    viewer.createExtension(CameraController)
    viewer.createExtension(SelectionExtension)
  }

  /**
   * Load a model from a Speckle URL
   * @param url - The URL of the Speckle model
   */
  const loadModelFromUrl = async (url: string) => {
    if (!viewer) return

    const urls = await UrlHelper.getResourceUrls(url)
    urls.forEach(async (url) => {
      const loader = new SpeckleLoader(viewer.getWorldTree(), url, '')
      await viewer.loadObject(loader, true)
    })
  }

  return {
    init,
    viewer,
    loadModelFromUrl,
  }
}
