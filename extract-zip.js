import extract from 'extract-zip';

async function main () {
  try {
    await extract('dlfiles/TaskIn (just analyze).zip', { dir: '/workspaces/dl-server/extracted' })
    console.log('Extraction complete')
  } catch (err) {
    // handle any errors
    console.error(err)
  }
}

main()
