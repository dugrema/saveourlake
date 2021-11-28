import React, {useState, useCallback} from 'react'
import { useRouteData } from 'react-static'
import { Link } from 'components/Router'
import Card from 'react-bootstrap/Card'
import ModalViewer from '../containers/ModalViewer'

import {trouverPathImage} from '../components/resolver'
// const ModalViewer = React.lazy(()=>import('../containers/ModalViewer'))


export default () => {

  const data = useRouteData()
  const [showViewer, setShowViewer] = useState(false)
  const [tuuidSelectionne, setTuuidSelectionne] = useState('')

  const showImage = useCallback( tuuid => {
    setTuuidSelectionne(tuuid)
    setShowViewer(true)
  }, [])

  const fichiers = data.fichiers
  const collections = data.collections
  const nom = data.nom

  return (
    <>
      <ModalViewer 
        show={showViewer} 
        handleClose={()=>setShowViewer(false)} 
        fichiers={fichiers} 
        tuuidSelectionne={tuuidSelectionne}
        />
      <div>
        {nom?
          <h2>{nom}</h2>
        :
          <h2>Album</h2>
        }

        {fichiers?
          fichiers.map(item=>(<FichierPoster key={item.tuuid} fichier={item} showImage={showImage} />))
          :''
        }

        <div style={{clear: 'left'}}></div>

        {collections?
          <Collections collections={collections} />
          :''
        }

        <div style={{clear: 'left'}}></div>

      </div>
    </>
  )

}

function FichierPoster(props) {
  const fichier = props.fichier
  const {nom, tuuid} = fichier
  const pathFichier = trouverPathImage(fichier, 'poster')
  const showImage = props.showImage

  const showImageOnClick = useCallback(()=>{
    showImage(tuuid)
  }, [showImage, tuuid])

  return (
    <Thumbnail src={pathFichier} onClick={showImageOnClick}>
      <ThumbnailFooter>{nom}</ThumbnailFooter>
    </Thumbnail>
  )
}

function Collections(props) {

  const collections = props.collections

  return (
    <>
      <h2>Collections</h2>
      {collections.map(item=>(<CollectionPoster key={item.cuuid} collection={item} />))}
    </>
  )
}

function CollectionPoster(props) {
  
  const collection = props.collection

  // Trouver un fichier sample/poster pour la collection
  const fichiers = collection.fichiers
  const samplePoster = fichiers[0]
  const pathFichier = trouverPathImage(samplePoster, 'poster')

  return (
    <Link to={`/album/${collection.cuuid}`}>
      <Thumbnail src={pathFichier}>
        <ThumbnailFooter>{collection.nom}</ThumbnailFooter>
      </Thumbnail>
    </Link>
  )
}

function Thumbnail(props) {

  const imgSrc = props.src
  const {onClick, onDoubleClick} = props

  return (
    <Card onClick={onClick} onDoubleClick={onDoubleClick} className="thumbnail">
      <Card.Img src={imgSrc}/>
      <Card.ImgOverlay>{props.children}</Card.ImgOverlay>
    </Card>
  )
}

export function ThumbnailHeader(props) {
  return (
      <div className='thumbnailheader'>
          {props.children}
      </div>
  )
}

export function ThumbnailFooter(props) {
  return (
      <div className='thumbnailfooter'>
          {props.children}
      </div>
  )
}