import "./App.css"
import PlusIcon from './Plus.png'

let img
let uploadURL


function App () {

  function handleImagUploade(e) {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    createImage(files[0])
  }

  function createImage (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      img = e.target.result
    }
    reader.readAsDataURL(file)
 }
 
  async function uploadImage (e) {

    const response = await (await fetch(process.env.REACT_APP_AWS_API_ENDPOINT)).json()
    let binary = atob(img.split(',')[1])
    let array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
 
    const result = await fetch(response.uploadURL, {
      method: 'PUT',
      body: blobData
    })

    uploadURL = response.uploadURL.split('?')[0]
  }
 

  return (
    <>
    <div className="Container">
      <div className="Form">

      <p>Uploader Test</p>

      <label 
      className="Label"
      htmlFor="Upload-input" 
      //onClick={e=>handleImagUploade(e)}
      >

      { img ? 
        <div className="File-container">
          <div
            pos="relative"
            h="full"
            alignItems="center"
            justifyContent="center"
          >
            <img
                w="218px"
                h="218px"
                borderRadius="109px"
                src={localAvatarUrl}
                alt="Uploaded photo"
                objectFit="cover"
              />
          </div>
        </div>
        : 
        <div className="File-container">
         {uploadURL ? (
            <p> Enviando... </p>
              ) : (
                <>
                  <img src={PlusIcon} alt="add file" id="Plus-icon" />
                  <p> Select an image </p>
                </>
            )}
        </div>
      }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      <input
      id="Upload-input"
      //onChange={e=>uploadImage(e)}
      type="file"
      />
      </label>

      <footer className="Footer">
        <button>
          send
        </button>
      </footer>
      
      </div>
      </div>
    </>
    )
}

export default App
