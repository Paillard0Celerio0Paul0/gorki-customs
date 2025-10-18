import { put, del, list } from '@vercel/blob'

export async function uploadClip(file: File, filename: string) {
  try {
    const blob = await put(filename, file, {
      access: 'public',
    })
    return blob
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    throw new Error('Échec de l\'upload du clip')
  }
}

export async function deleteClip(url: string) {
  try {
    await del(url)
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    throw new Error('Échec de la suppression du clip')
  }
}

export async function listClips() {
  try {
    const { blobs } = await list()
    return blobs
  } catch (error) {
    console.error('Erreur lors de la récupération des clips:', error)
    throw new Error('Échec de la récupération des clips')
  }
}
