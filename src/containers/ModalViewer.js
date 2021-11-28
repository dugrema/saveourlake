import React, {useState, useCallback, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Carousel from 'react-bootstrap/Carousel'

import {trouverPathImage, trouverLabelImage} from '../components/resolver'

const VideoViewer = React.lazy(()=>import('./VideoViewer'))

export default props => {

    const {tuuidSelectionne, fichiers} = props

    const handle = useFullScreenHandle()
    const [afficherHeaderFooter, setAfficherHeaderFooter] = useState(true)
    const [nomFichier, setNomFichier] = useState('')
    const [idxFichier, setIdxFichier] = useState(0)
    const onClick = useCallback(event=>{
        event.stopPropagation()
        setAfficherHeaderFooter(handle.active)
        if(!handle.active) {
            handle.enter(event)
        } else {
            handle.exit(event)
        }
    }, [handle])

    const handleCloseModal = useCallback(event=>{
        setAfficherHeaderFooter(true)
        if(handle.active) {
            handle.exit()  // Fermer full screen
            handle.active = false
        }
        props.handleClose(event)
    }, [handle])

    const onSelect = useCallback(idx=>{
        const fichier = fichiers[idx]
        setNomFichier(fichier.nom)
        setIdxFichier(idx)
    })

    const items = preparerItems({fichiers, onClick, fullscreenHandle: handle, idxCourant: idxFichier})
    
    const defaultActiveIndex = fichiers.reduce((idxDefault, item, idx)=>{
        if(item.tuuid === tuuidSelectionne) return idx
        return idxDefault
    }, 0)

    useEffect(()=>{
        const fichier = fichiers[defaultActiveIndex]
        setIdxFichier(defaultActiveIndex)
        setNomFichier(fichier.nom)
    }, [defaultActiveIndex, fichiers, tuuidSelectionne])

    return (
        <Modal 
            variant="dark" 
            show={props.show} 
            onHide={handleCloseModal} 
            fullscreen={true} 
            animation={false} 
            >

            {afficherHeaderFooter?
                <Modal.Header closeButton>
                    <Modal.Title>{nomFichier}</Modal.Title>
                </Modal.Header>
                :''
            }

            <Modal.Body>
                <FullScreen handle={handle}>
                    <Carousel 
                        className="carousel-viewer"
                        onSelect={onSelect}
                        defaultActiveIndex={defaultActiveIndex}
                        interval={null}
                        wrap={false}
                        indicators={false}
                        touch={false}
                        >
                        {items}
                    </Carousel>
                </FullScreen>
            </Modal.Body>

            {afficherHeaderFooter?
                <Modal.Footer>
                    Footer
                </Modal.Footer>
                :''
            }

        </Modal>
    )
}

function preparerItems(props) {
    const {fichiers, onClick, idxCourant} = props
    return fichiers.map((item, idx)=>{
        console.debug("Mapping image : %O", item)
        let image = ''

        const mimetype = item.mimetype?item.mimetype.split(';').shift():''
        const mimetypeBase = mimetype.split('/').shift()
        if(mimetypeBase === 'image') {
            if(idx >= idxCourant -1 && idx <= idxCourant + 1) {
                // Charger 1 index precedent et 2 suivants (4 images chargees a la fois)
                image = <Image value={item} onClick={onClick} />
            }
        } else if(mimetypeBase === 'video') {
            if(idx === idxCourant) {
                image = <VideoViewer value={item} onClick={onClick} />
            }
        }

        return (
            <Carousel.Item key={item.tuuid}>
                {image}
            </Carousel.Item>
        )
    })
}

function Image(props) {
    const {value, onClick} = props
    const labelImage = trouverLabelImage(value)
    const pathImage = trouverPathImage(value, labelImage)
    // Charger 1 index precedent et 2 suivants (4 images chargees a la fois)
    return (
        <img src={pathImage} onClick={onClick} />
    )
}
