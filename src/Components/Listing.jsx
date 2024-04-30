import React, { useEffect, useState} from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom'; 
import Nutrition from './Nutrition';

const Listing = ({ recipeList }) => {
    const { id } = useParams(); 
    const [instructions,setInstructions] = useState([]);
    const [ingredients,setIngredients] = useState([]);
    const listing = recipeList.find(listing => listing.RecipeID== id);
  useEffect(()=> {
        fetch(`https://recipe-app-eta-seven.vercel.app/recipes/instructions/${id}`)
        
        .then((response) =>response.json())
    
        .then(data=>{
            console.log(data)
            setInstructions(data)
        })
    },
    [])
    
  useEffect(()=> {
        fetch(`https://recipe-app-eta-seven.vercel.app/recipes/ingredients/${id}`)
        
        .then((response) =>response.json())
    
        .then(data=>{
            console.log(data)
            setIngredients(data)
        })
    },
    [])
    
    if (!listing) {
        return <div>Listing not found</div>;
    }


 return (
        <Container maxWidth="sm" className="listing-container">
            <h2></h2>
            <h2>{listing.RecipeName}</h2>
            <b>{listing.RecipeDescription}</b>
            <Nutrition title={listing.RecipeName}></Nutrition>
            <ul>
                {ingredients.map(ingredient => (
                    <li>{ingredient.IngredientAmount} {ingredient.MeasurementName} {ingredient.IngredientName}</li>
                ))}
            </ul>          
            <ol>
                {instructions.map(instruction => (
                    <li>{instruction.Instructions}</li>
                ))}
            </ol>
            <br></br>
            <b>{listing.RecipeDietary}</b>

            <br></br>
       
        </Container>
        
    );
}

export default Listing;
