import Form from 'react-bootstrap/Form'
import { Button, Container } from 'react-bootstrap'
import React from 'react'
import Select from 'react-select'
import ImageUploadField from './ImageUpload'
import { createStudio } from '../../lib/api'
import { useHistory } from 'react-router-dom'

const genreSelectOptions = [
  { value: 'classical', label: 'Classical' },
  { value: 'techno', label: 'Techno' },
  { value: 'house', label: 'House' },
  { value: 'rock', label: 'Rock' },
  { value: 'metal', label: 'Metal' },
  { value: 'country', label: 'Country' },
  { value: 'folk', label: 'Folk' },
  { value: 'pop', label: 'Pop' },
  { value: 'soundtrack', label: 'Soundtrack' }
]

const initialState = {
  name: '',
  description: '',
  location: {
    addressLineOne: '',
    addressLineTwo: '',
    postCode: '',
    town: '',
    country: '',
    continent: '',
    longitude: '',
    latitude: '',
  },
  size: '',
  equipment: {
    guitars: false,
    drums: false,
    synthesizers: false,
    microphones: false,
    mixingDesk: false,
  },
  rate: '',
  accommodation: false,
  noOfStudios: '',
  genres: [
  
  ],
  previousClientsOne: {},
  previousClientsTwo: {},
  mainImage: '',
  altImageOne: '',
  altImageTwo: '',
}

function CreateStudio() {
  const [formErrors, setFormErrors] = React.useState(initialState)
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    location: {
      addressLineOne: '',
      addressLineTwo: '',
      postCode: '',
      town: '',
      country: 'united states',
      continent: 'north america',
      longitude: '',
      latitude: '',
    },
    size: '1',
    equipment: {
      guitars: false,
      drums: false,
      synthesizers: false,
      microphones: false,
      mixingDesk: false,
    },
    rate: '1',
    accommodation: false,
    noOfStudios: '1',
    genres: [
    
    ],
    previousClients: [],
    mainImage: '',
    extraImages: [],
  })

  const history = useHistory()

  // * Change Handlers

  const handleChange = (event) => {
    const value = event.target.value
    setFormData({ ...formData, [event.target.name]: value })
    setFormErrors({ ...formErrors, [event.target.name]: '' })
  }

  const handlePreviousClientsOne = (event) => {
    const value = event.target.value
    setFormData({ ...formData, previousClientsOne: { ...formData.previousClientsOne, [event.target.name]: value } })
  }

  const handlePreviousClientsTwo = (event) => {
    const value = event.target.value
    setFormData({ ...formData, previousClientsTwo: { ...formData.previousClientsTwo, [event.target.name]: value } })
  }


  const handleRadioButtons = (event) => {
    const value = event.target.checked
    setFormData({ ...formData, equipment: { ...formData.equipment, [event.target.name]: value } })
  }

  const handleAddressChange = (event) => {
    const value = event.target.value
    setFormData({ ...formData, location: { ...formData.location, [event.target.name]: value } })
    setFormErrors({ ...formErrors, location: { ...formErrors.location, [event.target.name]: '' } })
  }

  const handleMultiSelectChange = (selected, name) => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: selectedItems })
  }

  const handleImageUpload = (imageUrl, name) => {
    setFormData({ ...formData, [name]: imageUrl })
  }

  const handleExtraImageUpload = (imageUrl, name) => {
    setFormData({ ...formData, [name]: imageUrl })
  }

  // * Post Request

  const handleSubmit = async e => {
    e.preventDefault()
    window.alert(`Submitting ${JSON.stringify(formData, null, 2)}
    ${JSON.stringify(formErrors, null, 2)}`)
    try {
      const { data } = await createStudio(formData)
      history.push(`/studios/${data._id}`)
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  return (
    <Container className="create-form">
      <div className="form-wrap">
        <div className="form-adjust">
          <Form onSubmit={handleSubmit}>
            <h1 className="title-spacing">List a Studio</h1>
            <Form.Group className="mb-3">
              <Form.Label>Studio Name</Form.Label>
              <Form.Control
                className={`${formErrors.name ? 'is-invalid' : ''}`}
                type="text" 
                placeholder="Enter Studio Name" 
                name='name' 
                onChange={handleChange}/>
              {formErrors.name && (
                <Form.Text className="text-muted">A unique studio name is required</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea"
                className={`${formErrors.description ? 'is-invalid' : ''}`} 
                rows={3} 
                placeholder='Write a brief description' 
                name='description' 
                onChange={handleChange}/>
              {formErrors.description && (
                <Form.Text className="text-muted">A studio description is required</Form.Text>
              )}
            </Form.Group>
            
            <h3 className="centered">Address</h3>
            <Form.Group className="mb-3">
              <Form.Label>First line of address</Form.Label>
              <Form.Control
                className={`${formErrors['location.addressLineOne'] ? 'is-invalid' : ''}`}
                type="text" 
                placeholder="First line" 
                name='addressLineOne' 
                onChange={handleAddressChange}/>
              {formErrors['location.addressLineOne'] && (
                <Form.Text className="text-muted">An address is required</Form.Text>
              )}
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Second line of address</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Second line" 
                name='addressLineTwo' 
                onChange={handleAddressChange}/>
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Post Code/Zip</Form.Label>
              <Form.Control 
                type="text"
                className={`${formErrors['location.postCode'] ? 'is-invalid' : ''}`} 
                placeholder="Post Code/Zip" 
                name='postCode'
                onChange={handleAddressChange}/>
              {formErrors['location.postCode'] && (
                <Form.Text className="text-muted">A post code is required</Form.Text>
              )}
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Town</Form.Label>
              <Form.Control 
                type="text"
                className={`${formErrors['location.town'] ? 'is-invalid' : ''}`}
                placeholder="Town" 
                name='town' 
                onChange={handleAddressChange}/>
              {formErrors['location.town'] && (
                <Form.Text className="text-muted">A town is required</Form.Text>
              )}
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control 
                as="select" 
                name="country" 
                onChange={handleAddressChange}>
                <option value="united states">United States</option>
                <option value="united kingdom">United Kingdom</option>
                <option value="france">France</option>
                <option value="spain">Spain</option>
                <option value="japan">Japan</option>
                <option value="australia">Australia</option>
              </Form.Control>
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Continent</Form.Label>
              <Form.Control 
                as="select" 
                name="continent" 
                onChange={handleAddressChange}>
                <option value="north america">North America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="oceania">Oceania</option>
              </Form.Control>
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Latitude</Form.Label>
              <Form.Control 
                type="number"
                step="0.00001"
                className={`input ${formErrors['location.latitude'] ? 'is-invalid' : ''}`}
                placeholder="Latitude" 
                name='latitude' 
                onChange={handleAddressChange}/>
              {formErrors['location.latitude'] && (
                <Form.Text className="text-muted">Latitude is required</Form.Text>
              )}
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="number"
                step="0.00001"
                className={`input ${formErrors['location.longitude'] ? 'is-invalid' : ''}`} 
                placeholder="Longitude" 
                name='longitude' 
                onChange={handleAddressChange}/>
              {formErrors['location.longitude'] && (
                <Form.Text className="text-muted">Longitude is required</Form.Text>
              )}
            </Form.Group>
  
            <h3 className="centered">Equipment</h3>
            <section className="form-equipment-wrap">
              <div className="field">
                <label>Guitars</label>                
                <input
                  className="checkbox-spacing"
                  type="checkbox"
                  name="guitars"
                  onChange={handleRadioButtons}
                  checked={formData.equipment.guitars}
                />
                
              </div>
  
              <div className="field">
                <label>Drums</label>
                <input
                  type="checkbox"
                  className="checkbox-spacing"
                  name="drums"
                  onChange={handleRadioButtons}
                  checked={formData.equipment.drums}
                />
              </div>
  
              <div className="field">
                <label>Synthesizers</label>
                <input
                  type="checkbox"
                  className="checkbox-spacing"
                  name="synthesizers"
                  onChange={handleRadioButtons}
                  checked={formData.equipment.synthesizers}
                />
              </div>
  
              <div className="field">
                <label>Microphones</label>
                <input
                  type="checkbox"
                  className="checkbox-spacing"
                  name="microphones"
                  onChange={handleRadioButtons}
                  checked={formData.equipment.microphones}
                />
              </div>
  
              <div className="field">
                <label >Mixing Desk</label>
                <input
                  type="checkbox"
                  className="checkbox-spacing"
                  name="mixingDesk"
                  onChange={handleRadioButtons}
                  checked={formData.equipment.mixingDesk}
                />
              </div>
            </section>
  
            <h3 className="centered">Details</h3>
            <Form.Group className="mb-3">
              <Form.Label>Studio Size</Form.Label>
              <Form.Control 
                as="select" 
                name="size" 
                onChange={handleChange}>
                <option value="1">Small</option>
                <option value="2">Medium</option>
                <option value="3">Large</option>
              </Form.Control>
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Accommmodation on site</Form.Label>
              <Form.Control 
                as="select" 
                name="accommodation" 
                onChange={handleChange}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </Form.Control>
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Number of Studios</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Number of Studios"
                className={`input ${formErrors.noOfStudios ? 'is-invalid' : ''}`}
                name="noOfStudios"
                onChange={handleChange}/>
              {formErrors.noOfStudios && (
                <Form.Text className="text-muted">Number of Studios is required</Form.Text>
              )}
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Studio Rate</Form.Label>
              <Form.Control 
                as="select" 
                name="rate" 
                onChange={handleChange}>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
              </Form.Control>
            </Form.Group>
  
            {formData &&
              <Form.Group className="mb-3">
                <Form.Label>Genre Speciality</Form.Label>
                <Select
                  options={genreSelectOptions}
                  isMulti
                  onChange={selected =>
                    handleMultiSelectChange(selected, 'genres')}
                  value={formData.genres.map(item => 
                    ({ label: item[0].toUpperCase() + item.substring(1), value: item }))}
                />
              </Form.Group> 
            }
            <h3 className="centered">Previous Artists</h3>
            <div className="prev-artist-wrap">
              <div className="artist-half-column">
                <Form.Group className="mb-3">
                  <Form.Label>Artist Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Artist Name" 
                    name="name" 
                    onChange={handlePreviousClientsOne}/>
                </Form.Group>
  
                <Form.Group className="mb-3">
                  <Form.Label>Artist Image Link</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Artist Image Link" 
                    name="image" 
                    onChange={handlePreviousClientsOne}/>
                </Form.Group>
              </div>
              <div className="artist-half-column">
                <Form.Group className="mb-3">
                  <Form.Label>Artist Name</Form.Label>
                  <Form.Control
                    type="text" 
                    placeholder="Artist Name" 
                    name="name"
                    onChange={handlePreviousClientsTwo}/>
                </Form.Group>
      
                <Form.Group className="mb-3">
                  <Form.Label>Artist Image Link</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Artist Image Link" 
                    name="image"
                    onChange={handlePreviousClientsTwo}/>
                </Form.Group>
              </div>
            </div>
            <h3 className="centered">Image Upload</h3>
            <section className="image-upload-wrap">
              <div className={`${formErrors.mainImage ? 'invalid-image img-upload-spacing' : 'img-upload-spacing'}`}>
                <ImageUploadField
                  onChange={handleImageUpload}
                  labelText="Main Image"
                  name="mainImage"
                  value={formData.mainImage}
                />
                {formErrors.mainImage && (
                  <Form.Text className="text-muted">An image is required</Form.Text>
                )}
              </div>

              <div className="img-upload-spacing">
                <ImageUploadField
                  onChange={handleExtraImageUpload}
                  labelText="Additional Image"
                  name="altImageOne"
                  value={formData.altImageOne}
                />
              </div>
            </section>

            <div className="additional-image-spacing">
              <ImageUploadField
                onChange={handleExtraImageUpload}
                labelText="Additional Image"
                name="altImageTwo"
                value={formData.altImageTwo}
              />
            </div>

            <div className="form-button-wrap">
              <Button 
                className="form-button-spacing"
                variant="primary" 
                type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  )
  
}

export default CreateStudio