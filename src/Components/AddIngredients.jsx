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



class AddIngredient extends Component {
  state = {
      open: false,
      RecipeName: '',
      RecipeDescription: '',
      RecipeDietary: ''   
  }

  toggleDialog = () => this.setState({ open: !this.state.open })

  handleTextChange = (e) => {
      const newState = { ...this.state }
      newState[e.target.id] = e.target.value
      this.setState(newState)
  }

  handleIngredients = (e) => {

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
          RecipeName: '',
          RecipeDescription: '',
          RecipeDietary: ''   
      })
  }

  componentDidUpdate = (prevProps, prevState) => {
      if (prevState.open !== this.state.open) {
          this.setState({
            RecipeName: '',
            RecipeDescription: '',
            RecipeDietary: ''          })
      }
  }

  render() {
      console.log(this.props)
      return (
          <Fragment>
              <div style={{ textAlign: 'center' }}>
                  <Link
                      variant="contained"
                      className="add-ingredient"
                      onClick={this.toggleDialog}
                  >
                      Add
                  </Link>
              </div>
              <div>
                  <Dialog  open={this.state.open} onClose={this.toggleDialog} >
                      <DialogTitle>Add Recipe Information</DialogTitle>
                      <DialogContent>
                          <form 
                              onSubmit={this.handleSubmit}
                              style={{ display: 'flex', flexDirection: 'column', width: '350px' }}>
                              <TextField 
                                  id="RecipeName" 
                                  placeholder="Thing 1" 
                                  value={this.state.RecipeName} 
                                  onChange={this.handleTextChange} 
                                  required />
                              <TextField 
                                  id="RecipeDescription" 
                                  placeholder="Thing 2" 
                                  value={this.state.RecipeDescription} 
                                  onChange={this.handleTextChange} 
                                  required />
                              <TextField 
                                  id="RecipeDietary" 
                                  placeholder="Thing 3" 
                                  value={this.state.RecipeDietary} 
                                  onChange={this.handleTextChange} 
                                  required />
                              <br />
                          </form>
                      </DialogContent>
                      
                      
                  </Dialog>
              </div>
          </Fragment>
      )
  }
}

export default AddIngredient