import {useRouter} from "next/router"
import NProgress from "nprogress"
import {useEffect} from "react"

export const useLoader = () => {
  const router = useRouter()

  useEffect(() => {
    const startLoader = () => NProgress.start()
    const endLoading = () => NProgress.done()

    router.events.on('routeChangeStart', startLoader)
    router.events.on('routeChangeComplete', endLoading)
    router.events.on('routeChangeError', endLoading)
    return () => {
      router.events.off('routeChangeStart', startLoader)
      router.events.off('routeChangeComplete', endLoading)
      router.events.off('routeChangeError', endLoading)
    }
  }, [router])
}