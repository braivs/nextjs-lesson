import {FC, PropsWithChildren} from 'react'

import {useRouter} from "next/router"

export const LoginNavigate: FC<PropsWithChildren<{}>> = ({children}) => {
  const router = useRouter()

  const isAuth = false // запрос за данными пользователя useSelector(state => state.auth.isAuth)

  if (!isAuth)  router.push('/test')

  return <>{children}</>

}