import extract from 'extract-zip';

async function main () {
  try {
    await extract('dlfiles/Educative - Grokking the Low Level Design Interview Using OOD Principles.zip.001', { dir: '/workspaces/dl-server/extracted' })
    console.log('Extraction complete')
  } catch (err) {
    // handle any errors
    console.error(err)
  }
}

main()
