import { useRef, useState } from 'react';
import useRequest from '../hooks/useRequest';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {

  const [ingredients, setIngredients] = useState([])
  const recipeNameRef = useRef()
  const ingredientRef = useRef()
  const recipeRef = useRef()
  const {sendRequest, loading} = useRequest({url: '/api/v1/recipes', method: "POST"})
  const navigate = useNavigate()
  
    const submitRecipe = (e) => {
        e.preventDefault()
        sendRequest([{
          name: recipeNameRef.current.value,
          ingredients: ingredients,
          recipe: recipeRef
        }])
        .then(() => navigate('/recipes'))
        .catch(err => console.log(err))
    }
    
    const addIngredient = () => {
      setIngredients(prevState => [ingredientRef.current.value, ...prevState])
    }

    const deleteIngredient = (index) => {
      const ingArr = [...ingredients]
      ingArr.splice(index,1)
        setIngredients(ingArr)
    }

    // if(loading) return <p>Loading...</p>
    // if(error) return <p>Error</p>

  return (
    <div className="App">
      <form onSubmit={submitRecipe}>
        <h2>Recipe Form</h2>
        <h4>Recipe Name</h4>  
        <input type="text" ref={recipeNameRef} />
        <h4>Add an Ingredient Name</h4> 
        <input ref={ingredientRef} type="text" />
        <button onClick={addIngredient}>Add More</button>
        <ul>
          {ingredients.map((ing, index) =>
            <div className="ingredient">
              <li>{ing} </li>
              <button onClick={() => deleteIngredient(index)} style={{color: "red"}}>X</button>
            </div>
          )}
        </ul>
        <h4>Directions:</h4>
        <input ref={recipeRef} type="text"/>
        <button type="submit">Add a Recipe</button>
      </form>
    </div>
  )
}

export default RecipeForm
