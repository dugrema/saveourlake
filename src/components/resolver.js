import path from 'path'

import mimetypeExtension from './mimetype_ext.json'

export function trouverPathImage(fichier, labelImage) {
    const nom = fichier.nom
    const nomExt = path.extname(nom)
    const nomBase = path.basename(nom, nomExt)
    const tuuid = fichier.tuuid
  
    const infoImage = fichier.images[labelImage]
    const mimetypeExt = mimetypeExtension[infoImage.mimetype]
  
    const labelFile = labelImage.split(';').pop()

    const extension = mimetypeExt?('.'+mimetypeExt):nomExt
  
    const pathFichier = path.join('/images', tuuid + '_' + nomBase + '.' + labelFile + extension)
    console.debug("Path fichier image: %s", pathFichier)
  
    return pathFichier
}

export function trouverPathVideo(fichier, labelVideo) {
    const nom = fichier.nom
    const nomExt = path.extname(nom)
    const nomBase = path.basename(nom, nomExt)
    const tuuid = fichier.tuuid
  
    const infoImage = fichier.videos[labelVideo]
    const mimetypeExt = mimetypeExtension[infoImage.mimetype]
    const resolution = labelVideo.split(';')[1]
    const extension = mimetypeExt?('.'+mimetypeExt):nomExt
  
    const pathFichier = path.join('/images', tuuid + '_' + nomBase + '.' + resolution + extension)
    console.debug("Path fichier video: %s", pathFichier)
  
    return pathFichier
}

/* Trouve la meilleure image pour les conditions dans opts */
export function trouverLabelImage(fichier, opts) {
    opts = opts || {}
    let imagesLabels = Object.keys(fichier.images)

    const supporteWebp = opts.supporteWebp || false
    if(!supporteWebp) {
        imagesLabels = imagesLabels.filter(item=>(item.indexOf('webp') === -1))
    }

    imagesLabels.sort(trierLabelsImages)
    // console.debug("Image labels tries : %O", imagesLabels)
    return imagesLabels[0]
}

function trierLabelsImages(a, b) {
    if(a === b) return 0

    if(a === 'thumbnail') return 1
    if(b === 'thumbnail') return -1
    if(a === 'poster') return 1
    if(b === 'poster') return -1

    const [mimetypeA, resolutionA] = a.split(';')
    const typeImageA = mimetypeA.split('/').pop()
    const [mimetypeB, resolutionB] = b.split(';')
    const typeImageB = mimetypeB.split('/').pop()

    if(resolutionA !== resolutionB) {
        return resolutionB - resolutionA
    }

    if(typeImageA !== typeImageB) {
        // JPG va toujours a la fin (fallback)
        if(typeImageA === 'jpg') return 1
        if(typeImageB === 'jpg') return -1

        return typeImageA.localeCompare(typeImageB)  // Comparer texte des type d'image
    }

    return a.localeCompare(b)
}

/* Trouve le meilleur video pour les conditions dans opts */
export function trouverLabelVideo(fichier, opts) {
    opts = opts || {}
    let videosLabels = Object.keys(fichier.videos)

    const supporteWebm = opts.supporteWebm || false
    if(!supporteWebm) {
        videosLabels = videosLabels.filter(item=>(item.indexOf('webm') === -1))
    }

    videosLabels.sort(trierLabelsVideos)
    console.debug("Videos labels tries : %O", videosLabels)
    return videosLabels[0]
}

function trierLabelsVideos(a, b) {
    if(a === b) return 0

    const [mimetypeA, resolutionA, bitrateA] = a.split(';')
    const typeImageA = mimetypeA.split('/').pop()
    const [mimetypeB, resolutionB, bitrateB] = b.split(';')
    const typeImageB = mimetypeB.split('/').pop()

    if(resolutionA !== resolutionB) {
        return resolutionB - resolutionA
    }

    if(typeImageA !== typeImageB) {
        // MP4 va toujours a la fin (fallback)
        if(typeImageA === 'mp4') return 1
        if(typeImageB === 'mp4') return -1

        return typeImageA.localeCompare(typeImageB)  // Comparer texte des type d'image
    }

    if(bitrateA !== bitrateB) return bitrateB - bitrateA

    return a.localeCompare(b)
}
