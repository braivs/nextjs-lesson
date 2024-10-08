import {API} from "../../assets/api/api"
import {EpisodeType, ResponseType} from "../../assets/api/rick-and-morty-api"
import {PageWrapper} from "../../components/PageWrapper/PageWrapper"
import {Card} from "../../components/Card/Card"
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout"
import {GetServerSideProps} from "next"

const authMe = async () => {
  const user = {} //axios.get('auth/me')

  if (!user) {
    return {
      redirect: {
        destination: '/test',
        permanent: false
      }
    }
  }
}

export const getServerSideProps: GetServerSideProps = async ({res}) => {
   // res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=100')

  await authMe() 

  const episodes = await API.rickAndMorty.getEpisodes()

  const isAuth = false

  if (!episodes) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      episodes
    }
  }
}

type PropsType = {
  episodes: ResponseType<EpisodeType>
}

const Episodes = (props: PropsType) => {
  const {episodes} = props

  const episodeList = episodes.results.map(episode => (
    <Card key={episode.id} name={episode.name}/>
  ))

  return (
    <PageWrapper>
      {episodeList}
    </PageWrapper>
  )
}

Episodes.getLayout = getLayout;
export default Episodes