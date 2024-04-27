import React, { Component, Fragment } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle
} from '@mui/material'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'; 



class AddListing extends Component {
  state = {
      open: false,
      name: '',
      address: '',
      hours: '',
      description: '',
  }

  toggleDialog = () => this.setState({ open: !this.state.open })

  handleTextChange = (e) => {
      const newState = { ...this.state }
      newState[e.target.id] = e.target.value
      this.setState(newState)
  }

  handleSubmit = (e) => {
      e.preventDefault()
      const payload = { ...this.state }
      payload.id = uuidv4(); // Generate a unique ID
      delete payload.open
      console.log("THE LISTING", payload)
      this.props.addListing(payload)
      this.setState({
          open: false,
          name: '',
          address: '',
          hours: '',
          description: '',
      })
  }

  componentDidUpdate = (prevProps, prevState) => {
      if (prevState.open !== this.state.open) {
          this.setState({
              name: '',
              address: '',
              hours: '',
              description: ''
          })
      }
  }

  render() {
      console.log(this.props)
      return (
          <Fragment>
              <div style={{ textAlign: 'center' }}>
                  <Link
                      variant="contained"
                      className="add-listing"
                      onClick={this.toggleDialog}
                  >
                      Add
                  </Link>
              </div>
              <div>
                  <Dialog  open={this.state.open} onClose={this.toggleDialog} >
                      <DialogTitle>Add New Listing</DialogTitle>
                      <DialogContent>
                          <form 
                              onSubmit={this.handleSubmit}
                              style={{ display: 'flex', flexDirection: 'column', width: '350px' }}>
                              <TextField 
                                  id="name" 
                                  placeholder="Name" 
                                  value={this.state.name} 
                                  onChange={this.handleTextChange} 
                                  required />
                              <TextField 
                                  id="address" 
                                  placeholder="Address" 
                                  value={this.state.address} 
                                  onChange={this.handleTextChange} 
                                  required />
                              <TextField 
                                  id="hours" 
                                  placeholder="Hours (ex. 8AM - 9PM" 
                                  value={this.state.hours} 
                                  onChange={this.handleTextChange} 
                                  required />
                              <TextField 
                                  id="description" 
                                  placeholder="Description" 
                                  value={this.state.description} 
                                  onChange={this.handleTextChange} 
                                  required />
                              <br />
                              <Button variant="contained" color="primary" type="submit" >Save</Button>
                          </form>
                      </DialogContent>
                      
                  </Dialog>
              </div>
          </Fragment>
      )
  }
}

export default AddListing