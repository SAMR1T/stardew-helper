import './App.css';
import {useState} from 'react';
import recipesData from './recipes.json';

function App() {  
  return (
    <div>
      <h1>Stardew Helper!</h1>
      <ul class="flex-container wrap">
      {
        recipesData.map((item, index) => {
          return(
            <>
              <li class="flex-item">
                <RecipeImage image={item.image[0]}/>
                <RecipeName recipe={item.recipe}/>
                <RecipeCounter item={item} />
              </li>
            </>
          )
        })
      }
      </ul>
      <SubmitButton recipesData={recipesData} />
      <ul class="flex-container wrap">
        <li class="flex-item">1</li>
        <li class="flex-item">2</li>
        <li class="flex-item">3</li>
        <li class="flex-item">4</li>
        <li class="flex-item">5</li>
        <li class="flex-item">6</li>
        <li class="flex-item">7</li>
        <li class="flex-item">8</li>
      </ul>
    </div>
  );
}

function RecipeImage(props) {
  return (
    <div className="recipe">
      <img src={"https://stardewvalleywiki.com" + props.image} alt={props.recipe} height="60" />
    </div>
  );
}

recipesData.map((item, index) => {
  return(
    <RecipeImage image={item.image[0]} recipe={item.recipe} />
  )
})

function RecipeName(props) {
  return (
    <div className="recipeName">
      <body>{props.recipe}</body>
    </div>
  );
}

const useCounter = (item) => {
  const [count, setCount] = useState(item.total);

  const increment = () => {
    setCount(count + 1);
    const sum = parseFloat(item.total) + 1;
    item.total = sum;
  };

  const decrement = () => {
    setCount(count - 1);
    const sum = parseFloat(item.total) - 1;
    item.total = sum;
  };

  return { count, increment, decrement, item };
};

const RecipeCounter = ({ item }) => {
  const { count, increment, decrement } = useCounter(item);

  return (
    <div>
      <button onClick={decrement}>-</button>
      {item.total}
      <button onClick={increment}>+</button>
    </div>
  );
};

const SubmitButton = (recipesData) => {

  const handleSubmit = () => {
    console.log('Dataset:', recipesData);
  };

  const printIngredientsWithCountGreaterThanZero = () => {
    recipesData.forEach(recipe => {
      console.log(`Recipe: ${recipe.recipe}`);
      recipe.ingredients.forEach(ingredient => {
        console.log(`- ${ingredient.name}: ${ingredient.count * recipe.total}`);
      });
      console.log("------------");
    });
  };


  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
