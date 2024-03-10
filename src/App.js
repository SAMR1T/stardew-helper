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
                <RecipeCounter item={item.recipe} />
              </li>
            </>
          )
        })
      }
      </ul>
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

const useCounter = (initialCount = 0) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return { count, increment, decrement };
};

const RecipeCounter = ({ item }) => {
  const { count, increment, decrement } = useCounter();

  return (
    <div>
      <button onClick={decrement}>-</button>
      {count}
      <button onClick={increment}>+</button>
    </div>
  );
};

export default App;
