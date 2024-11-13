import {
  CameraController,
  DefaultViewerParams,
  SelectionExtension,
  FilteringExtension,
  SpeckleLoader,
  UrlHelper,
  Viewer,
  ViewerEvent
} from '@speckle/viewer'
import { Catalogue } from '@/extensions/Catalogue'

export let viewer: Viewer | undefined = undefined

export default function useViewer() {
  /**
   * Initialize the viewer
   * @param element - DOM element to initialize the viewer on
   */
  async function init(element: HTMLDivElement) {
    const params = {
      ...DefaultViewerParams,
      showStats: false,
      verbose: true
    }

    viewer = new Viewer(element, params)
    await viewer.init()

    viewer.on(ViewerEvent.LoadComplete, async() => {
      const properties = await viewer.getObjectProperties()
      console.log('properties', properties)

        // material.value = properties.find(property => property.key === 'renderMaterial.name')
        // console.log('material', material.value)
      })
  }

  /**
   * The viewer can be extended with additional functionality by adding extensions
   * You can use extensions provided by the viewer, or create your own
   */
  function addExtensions() {
    if (!viewer) return
    viewer.createExtension(CameraController)
    viewer.createExtension(SelectionExtension)
    viewer.createExtension(FilteringExtension)
    // Example of a custom extension
    viewer.createExtension(Catalogue)
  }

  /**
   * Load a model from a Speckle URL
   * @param url - The URL of the Speckle model
   * @param authToken - This is required if the model is private
   */
  const loadModelFromUrl = async (url: string, authToken?: string) => {
    const urls = await UrlHelper.getResourceUrls(url, authToken)
    urls.forEach(async (url) => {
      if (!viewer) return
      const loader = new SpeckleLoader(viewer.getWorldTree(), url, '')
      await viewer.loadObject(loader, true)
    })
  }

  return {
    init,
    loadModelFromUrl,
    addExtensions
  }
}
