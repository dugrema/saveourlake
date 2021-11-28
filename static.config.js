import path from 'path'

export default {
  getRoutes: async () => {
    const dataBaseFichiers = require(require.resolve('./src/components/fichiers.json'))
    console.debug("DATABASE FICHIERS : %O", dataBaseFichiers)
    const sousCollections = dataBaseFichiers.collections || []

    const dataBaseAlbums = require(require.resolve('./src/components/albums.json'))
    const sousAlbums = dataBaseAlbums.collections || []

    return [
      {
        path: '/files',
        getData: () => ({
          ...dataBaseFichiers,
        }),
        children: sousCollections.map(item=>({
          path: `/${item.cuuid}`,
          template: 'src/pages/files',
          getData: () => item
        }))
      },
      {
        path: '/album',
        getData: () => ({
          ...dataBaseAlbums,
        }),
        children: sousAlbums.map(item=>({
          path: `/${item.cuuid}`,
          template: 'src/pages/album',
          getData: () => item
        }))
      },
    ]
  },
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}
