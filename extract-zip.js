import extract from 'extract-zip';

async function main () {
  try {
    await extract('dlfiles/Emil Kowalski - Animations on the web Updated 5-2024.zip.001', { dir: '/workspaces/dl-server/extracted' })
    console.log('Extraction complete')
  } catch (err) {
    // handle any errors
    console.error(err)
  }
}

main()
