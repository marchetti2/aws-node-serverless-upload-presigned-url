import { useState } from "react"
import "./App.css"
import PlusIcon from './Plus.png'
import Check from './Check.png'

function App () {

  const [ image, setImage ] = useState('')
  const [ uploading, setUploading] = useState(false)
  const [ loading, setLoading] = useState(false)
  const [ uploadURL, setUploadURL ] = useState('')

  function handleImagUploade(e) {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    createImage(files[0])
  }

  function createImage (file) {
    const reader = new FileReader()

    reader.onprogress = (e) => {
      setUploading(true)
    }

    reader.onload = (e) => {
      if (!e.target.result.includes('data:image/jpeg')) {
        return alert('Wrong file type - JPG only.')
      }
      setImage(e.target.result)
      setUploading(false)
    } 
    reader.readAsDataURL(file)
  }
 
  async function uploadImage (e) {
    setLoading(true)
    const response = await (await fetch(process.env.REACT_APP_AWS_API_ENDPOINT)).json()
    let binary = atob(image.split(',')[1])
    let array = []

    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }

    let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})

    try {
      await fetch(response.uploadURL, {
        method: 'PUT',
        body: blobData
      }) 
    } catch (error) {
      console.log(error)
      alert(error.message)
    } finally {
      setLoading(false)
      setUploadURL(response.uploadURL.split('?')[0])
    }
  }
 
  return (
    <div className="Container">
      <div className="Form">

      <p>Uploader Test</p>

      <label 
        className="Label"
        htmlFor="Upload-input"
      >

      { image ? 
        <div className="File-container">
          {uploading ? (
            <p> Enviando... </p>
              ) : (
          <div>
            <img src={image} alt="Uploaded photo"/>
          </div>
           )}
        </div>
        : 
        <div className="File-container">
          <img src={PlusIcon} alt="add file" id="Plus-icon" />
          <p> Select an image </p>
        </div>
      }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      <input
      id="Upload-input"
      onChange={e=>handleImagUploade(e)}
      type="file"
      />
      </label>
      

      <footer className="Footer">
        <button
        disabled={loading || !image}
        type="button"
        onClick={e=>uploadImage(e)}
        >
          {loading ? 'sending...' : 'send'}
        </button>
        
        {uploadURL&& (
          <>
          <div>
            <p>Uploaded content added on s3 bucket.</p>
            <img src={Check} alt="success" />
          </div>
          <p><a href={uploadURL} target="_blank">{uploadURL}</a></p>
          </>
        )}
      </footer>
      
      </div>
    </div>
    )
}

export default App
