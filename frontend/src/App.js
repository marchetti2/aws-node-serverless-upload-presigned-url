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
    <div style={{display:"flex", flexDirection:"row", height:"100vh", width:"100vw"}}>
      <div style={{margin:"auto", height:"300px", width:"300px", border:"1px solid #333"}}>
      <label htmlFor="avatar">Choose a profile picture:</label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      <input
      id="avatar"
      onChange={e=>handleImagUploade(e)}
      type="file"
      />
  
      <button onClick={e=>uploadImage(e)}>Upload image</button>
      </div>
      </div>
    </>
    )
}

export default App