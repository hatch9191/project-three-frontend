import React from 'react'
import axios from 'axios'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

function MultipleImageUploadField({ onChange, labelText, name }) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [hasUploaded, setHasUploaded] = React.useState(false)

  const handleUpload = async event => {
    setHasUploaded(true)
    setIsUploading(true)
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    onChange(res.data.url, name)
    setIsUploading(false)
  }

  return (
    <>
      <label>{labelText || 'Upload Image'}</label>
      {isUploading &&
        <p>Uploading image....</p>
      }
      {hasUploaded && !isUploading &&
        <p style={{ marginTop: 5 }}>Image Uploaded. You can upload as many as you like.</p>
      }
      {!isUploading && (
        <>
          <div style={{ marginTop: 10 }}>
            <label className="">
              <input
                type="file"
                name={name}
                onChange={handleUpload}
              />
            </label>
          </div>
        </>
      )}
    </>
  )
}

export default MultipleImageUploadField
