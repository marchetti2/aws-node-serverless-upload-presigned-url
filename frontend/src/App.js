import "./App.css"

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
      <label htmlFor="avatar">S3 Uploader Test - Select an image</label>

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
                <p as="span" pt={2} textAlign="center">
                  Enviando...
                </p>
            ) : (
              <div
                w="218px"
                h="218px"
                borderRadius="109px"
                pos="relative"
                alignItems="center"
                justifyContent="center"
              >

                <div
                  w="218px"
                  h="218px"
                  borderRadius="109px"
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                >
                  {/* <Icon as={FiPlus} w={14} h={14} color={colorMode === "dark" ? "dark.600" : "gray.700"} /> */}
                  <p as="span" pt={2} textAlign="center">
                    Adicione sua imagem
                  </p>
                </div>
              </div>
            )}



        </div>
      }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
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
