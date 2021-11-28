import React from 'react'
import { useRouteData } from 'react-static'
import { Link } from 'components/Router'
import { Row, Col } from 'react-bootstrap'
import path from 'path'

export default () => {
 
  const data = useRouteData()
  const fichiers = data.fichiers || []
  const collections = data.collections
  const nom = data.nom

  return (
    <div>
      {nom?
        <h2>{nom}</h2>
        :
        <h2>Files</h2>
      }

      {fichiers.map(item=>(
        <Fichier key={item.fuuid} fichier={item} />
      ))}


      {collections?
        <SousCollections collections={collections} />
        :''
      }

    </div>
  )
}

function SousCollections(props) {

  return (
    <>
      <h3>Collections</h3>

      {props.collections.map(item=>(
        <Collection key={item.cuuid} collection={item} />
      ))}

    </>
  )

}

function Collection(props) {
  const collection = props.collection || {}
  const {nom, cuuid} = collection

  return (
    <Row>
      <Col>
        <Link to={`/files/${cuuid}`}>
          {nom}
        </Link>
      </Col>
    </Row>
  )
}

function Fichier(props) {

  const fichier = props.fichier || {}

  let titreFichier = fichier.nom
  if(fichier.titre) {
    titreFichier = fichier.titre.en || titreFichier
  }

  let description = ''
  if(fichier.description) {
    description = fichier.description.en || description
  }

  let url = path.join('/fichiers', fichier.fuuid + "_" + fichier.nom)

  return (
    <Row className="fichier-row">
      <Col md={6} lg={5}>
        <a href={url}>{titreFichier}</a>
      </Col>
      <Col md={1} lg={1}>
        {fichier.taille}
      </Col>
      <Col md={5} lg={6}>
        {description}
      </Col>
    </Row>
  )

}