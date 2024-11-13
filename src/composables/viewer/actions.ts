import useViewer from '@/composables/viewer/viewer'
import { Catalogue, type CatalogueOptions } from '@/extensions/Catalogue'
import { FilteringExtension } from '@speckle/viewer'
import { viewer } from '@/composables/viewer/viewer'

export default function useViewerActions() {
  /**
   * Get the properties of the objects in the viewer
   * The exact properties returned depends on the objects in the viewer
   * @returns - List of properties in the viewer
   */
  const getObjectProperties = async () => {
    console.log(viewer)
    if (!viewer) return
    return await viewer.getObjectProperties()
  }

  /**
   * Categorize and animate a certain property in the viewer
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
    catalogue.animate()
  }

  /**
   * Isolate objects in the viewer
   * @param ids - List of IDs to isolate
   */
  const isolate = async (ids: Array<string>) => {
    if (!viewer) return
    const filter = viewer.getExtension(FilteringExtension)
    filter.isolateObjects(ids)
  }

  return {
    getObjectProperties,
    categorize,
    isolate
  }
}
