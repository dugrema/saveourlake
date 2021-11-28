import React, {useState, useEffect} from 'react'
import { Player, BigPlayButton, ControlBar } from 'video-react'
import { trouverPathImage, trouverPathVideo, trouverLabelImage, trouverLabelVideo } from '../components/resolver'

export default props => {
    const fichier = props.value
    const [pathVideo, setPathVideo] = useState('')
    const [pathPoster, setPathPoster] = useState('')

    useEffect(()=>{
        const labelVideo = trouverLabelVideo(fichier)
        const pathVideo = trouverPathVideo(fichier, labelVideo)
        setPathVideo(pathVideo)

        const labelPoster = trouverLabelImage(fichier)
        const pathPoster = trouverPathImage(fichier, labelPoster)
        setPathPoster(pathPoster)

        // console.debug("label poster (%s) video (%s) trouves", labelPoster, labelVideo)

    }, [fichier])

    return (
        <>
            <Player
                playsInline
                poster={pathPoster}
                src={pathVideo}
                preload="none"
                >
                <BigPlayButton position="center" />
                <ControlBar autoHide={true} disableDefaultControls={false} disableCompletely={false} />
            </Player>
        </>
    )
}
