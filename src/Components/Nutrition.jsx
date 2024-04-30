import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'; 




const Nutrition = (props) => {
  const { id } = useParams(); 
  const [ingredients,setIngredients] = useState([]);
  const [nutritionInfo,setnutritionInfo] = useState([]);


  useEffect(()=> {
    fetch(`https://recipe-app-eta-seven.vercel.app/recipes/ingredients/${id}`)
    
    .then((response) =>response.json())

    .then(data=>{
        console.log(data)
        setIngredients(data)
    })
},
[])

useEffect(()=> {

  if(ingredients.length != 0) {
    const ingredientArr = ingredients.map(ingredient => {
      return `${ingredient.IngredientAmount} ${ingredient.MeasurementName} ${ingredient.IngredientName}`
    })
  fetch(`https://api.edamam.com/api/nutrition-details?app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_API_KEY}`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: props.title,
      ingr: ingredientArr
    })

  })
    
    .then((response) =>response.json())

    .then(data=>{
        setnutritionInfo(data)
    })
  }
}, [ingredients])

  return (
    <div>
      <p>Calories: {nutritionInfo.calories} | Servings: {nutritionInfo.yield}  </p>
    </div>
  )
}

export default Nutrition;


