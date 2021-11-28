import React from 'react'
import { useRouteData } from 'react-static'
//
import { Link } from 'components/Router'

export default function Collection() {
  const { nom, fichiers, collections } = useRouteData()
  return (
    <div>
      <h3>{nom}</h3>
    </div>
  )
}
