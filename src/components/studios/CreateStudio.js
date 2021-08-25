import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import React from 'react'
import Select from 'react-select'
import ImageUploadField from './ImageUpload'
import MultipleImageUploadField from './MultiImageUpload'
import { createStudio } from '../../lib/api'

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
  rate: '1',
  accomodation: false,
  noOfStudios: '1',
  genres: [
  
  ],
  previousClients: [],
  mainImage: '',
  extraImages: [],
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
    rate: '1',
    accomodation: false,
    noOfStudios: '1',
    genres: [
    
    ],
    previousClients: [],
    mainImage: '',
    extraImages: [],
  })

  // * Change Handlers

  const handleChange = (event) => {
    const value = event.target.value
    setFormData({ ...formData, [event.target.name]: value })
    setFormErrors({ ...formErrors, [event.target.name]: '' })
  }

  const handlePreviousArtist = (event) => {
    const value = event.target.value
    setFormData({ ...formData, previousClients: { ...formData.previousClients, [event.target.name]: value } })
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
    setFormData({ ...formData, [name]: [...formData.extraImages, imageUrl] })
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
    <div className="form-wrap">
      <div className="form-adjust">
        <Form onSubmit={handleSubmit}>
          <h1 className="centered">Add a Studio</h1>
          <Form.Group className="mb-3">
            <Form.Label>Studio Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Studio Name" 
              name='name' 
              onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              placeholder='Write a brief description' 
              name='description' 
              onChange={handleChange}/>
          </Form.Group>
          
          <h3 className="centered">Address</h3>
          <Form.Group className="mb-3">
            <Form.Label>First line of address</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="First line" 
              name='addressLineOne' 
              onChange={handleAddressChange}/>
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
              placeholder="Post Code/Zip" 
              name='postCode' 
              onChange={handleAddressChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Town</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Town" 
              name='town' 
              onChange={handleAddressChange}/>
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
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="asia">Asia</option>
              <option value="oceania">Oceania</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Latitude</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Latitude" 
              name='latitude' 
              onChange={handleAddressChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Longitude</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Longitude" 
              name='longitude' 
              onChange={handleAddressChange}/>
          </Form.Group>

          <h3 className="centered">Equipment</h3>
          <div className="field">
            <label className="checkbox label">
              Guitars?
              <input
                type="checkbox"
                name="guitars"
                onChange={handleRadioButtons}
                checked={formData.equipment.guitars}
              />
            </label>
          </div>

          <div className="field">
            <label className="checkbox label">
              Drums?
              <input
                type="checkbox"
                name="drums"
                onChange={handleRadioButtons}
                checked={formData.equipment.drums}
              />
            </label>
          </div>

          <div className="field">
            <label className="checkbox label">
            Synthesizers?
              <input
                type="checkbox"
                name="synthesizers"
                onChange={handleRadioButtons}
                checked={formData.equipment.synthesizers}
              />
            </label>
          </div>

          <div className="field">
            <label className="checkbox label">
              Microphones?
              <input
                type="checkbox"
                name="microphones"
                onChange={handleRadioButtons}
                checked={formData.equipment.microphones}
              />
            </label>
          </div>

          <div className="field">
            <label className="checkbox label">
              Mixing Desk?
              <input
                type="checkbox"
                name="mixingDesk"
                onChange={handleRadioButtons}
                checked={formData.equipment.mixingDesk}
              />
            </label>
          </div>

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
              name="accomodation" 
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
              name="noOfStudios"
              onChange={handleChange}/>
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
          <Form.Group className="mb-3">
            <Form.Label>Artist Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Artist Name" 
              name="name" 
              onChange={handlePreviousArtist}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Artist Image Link</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Artist Image Link" 
              name="image" 
              onChange={handlePreviousArtist}/>
          </Form.Group>
          
          <h3 className="centered">Image Upload</h3>
          <div>
            <ImageUploadField
              onChange={handleImageUpload}
              labelText="Main Image"
              name="mainImage"
              value={formData.mainImage}
            />
          </div>

          <div>
            <MultipleImageUploadField
              onChange={handleExtraImageUpload}
              labelText="Profile Image"
              name="extraImages"
              value={formData.extraImages}
            />
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
  
}

// TO DO -
// Add multiple fields to Previous Artists so multiple objects can be created?
// Error handling
// Styling based on Harrys forms

export default CreateStudio