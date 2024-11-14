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

    // Get the object properties after the model has loaded
    // This will cache them and allow faster access later
    viewer.on(ViewerEvent.LoadComplete, async() => {
      properties = await viewer.getObjectProperties()
    })

    // Handle object clicks in the viewer
    viewer.on(ViewerEvent.ObjectClicked, (event: SelectionEvent | null) => {
      // If there are no nodes, the click was not on an object
      if (event) {
        const nodes = viewer.getWorldTree().findId(event.hits[0].node.model.id)
        if (nodes && nodes.length > 0) {
          selectionInfo.value = nodes[0].model.raw
        }
      } else {
        selectionInfo.value = null
      }
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

  /**
   * Isolate objects in the viewer
   * @param ids - List of IDs to isolate
   */
  const isolate = async (ids: Array<string>) => {
    if (!viewer) return
    const filter = viewer.getExtension(FilteringExtension)
    filter.resetFilters()
    filter.isolateObjects(ids)
  }

   /**
   * Categorize a certain property in the viewer
   * @param input - ids to categorize
   * @param options - options for the catalogue
   */
   const categorize = async (
    input: Array<{ ids: Array<string>; value: string }>,
    options?: CatalogueOptions
  ) => {
    if (!viewer) return
    const catalogue = viewer.getExtension(Catalogue)
    catalogue.categorize(input, options)
  }

  /**
   * Use the catalogue extension to animate the objects
   * @param options - option to reverse the animation
   */
  const animate = async (options?:{ reverse?: boolean }) => {
    const { reverse } = options || {}
    if (!viewer) return
    const catalogue = viewer.getExtension(Catalogue)
    catalogue.animate(reverse)
  }

  // Reset the filtering extension
  const resetFilters = async () => {
    if (!viewer) return
    const filter = viewer.getExtension(FilteringExtension)
    filter.resetFilters()
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
