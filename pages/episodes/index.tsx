import {API} from "../../assets/api/api"
import {EpisodeType, ResponseType} from "../../assets/api/rick-and-morty-api"
import {Header} from "../../components/Header/Header"
import {PageWrapper} from "../../components/PageWrapper/PageWrapper"

export const getServerSideProps = async () => {
  const episodes = await API.rickAndMorty.getEpisodes()

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
    <div key={episode.id}>{episode.name}</div>
  ))

  return (
    <PageWrapper>
      <Header/>
      {episodeList}
    </PageWrapper>
  )
}

export default Episodes