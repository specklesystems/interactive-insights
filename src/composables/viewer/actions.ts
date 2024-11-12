import useViewer from '@/composables/viewer/viewer'

export default function useViewerActions() {
  const { viewer } = useViewer()

  const getObjectProperties = async () => {
    if (!viewer) return
    return await viewer.getObjectProperties()
  }

  return {
    getObjectProperties
  }
}
