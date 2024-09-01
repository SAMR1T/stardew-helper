import './App.css';
import React, { useState } from 'react';
import recipesData from './recipes.json';

const RecipeItem = ({ recipe, count, onIncrease, onDecrease }) => {
  return (
    <div style={{ display: 'block', alignItems: 'center'}}>
      {/* <img src={"https://stardewvalleywiki.com" + recipe.image[0]} alt={recipe.name} height="60" /> */}
      <div>
      <img src={"https://stardewvalleywiki.com" + recipe.image[0]} alt={recipe.name} height="60" />
        <h4>{recipe.recipe}</h4>
        <button onClick={onDecrease}>-</button>
        <span style={{ margin: '0 10px' }}>{count}</span>
        <button onClick={onIncrease}>+</button>
      </div>
    </div>
  );
};

const App = () => {
  // Use the imported JSON data to initialize the state
  const [recipeCounts, setRecipeCounts] = useState(
    recipesData.map(() => 0)
  );

  const handleIncrease = (index) => {
    const newCounts = [...recipeCounts];
    newCounts[index]++;
    setRecipeCounts(newCounts);
  };

  const handleDecrease = (index) => {
    const newCounts = [...recipeCounts];
    if (newCounts[index] > 0) {
      newCounts[index]--;
    }
    setRecipeCounts(newCounts);
  };

  const handleConfirm = () => {
    const nonZeroCounts = recipeCounts
      .map((count, index) => ({ name: recipesData[index].recipe, count }))
      .filter(item => item.count > 0);

    return nonZeroCounts;
  }

  const getIngredients = () => {
    console.log('Non-zero Food Counts:', handleConfirm());
  }

  return (
    <div>
      <h1 class="h1">Stardew Helper!</h1>
      <ul class="flex-container wrap">
      {recipesData.map((recipe, index) => (
        <li class="flex-item">
        <RecipeItem
          key={index}
          recipe={recipe}
          count={recipeCounts[index]}
          onIncrease={() => handleIncrease(index)}
          onDecrease={() => handleDecrease(index)}
        /></li>
      ))}
      </ul>
      <div class="confirm"> 
        <button onClick={getIngredients}>Confirm</button>  
      </div>
    </div>
  );
};

export default App;
