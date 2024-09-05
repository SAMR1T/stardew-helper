import './App.css';
import React, { useState } from 'react';
import recipesData from './recipes.json';

const sortedRecipesData = recipesData.slice().sort((a, b) => a.recipe.localeCompare(b.recipe));

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

  const [displayData, setDisplayData] = useState([]);
  const [totalIngredients, setTotalIngredients] = useState({});

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

  const multiplyValue = (value, count) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return `${value} x ${count}`;
    }
    return numericValue * count;
  };

  const handleConfirm = () => {
    const nonZeroCounts = recipeCounts
      .map((count, index) => ({ 
        name: sortedRecipesData[index].recipe, 
        count, 
        ingredients: sortedRecipesData[index].ingredients,
        numof: (sortedRecipesData[index].numof || []).map(value => multiplyValue(value, count))
      }))
      .filter(item => item.count > 0);

    setDisplayData(nonZeroCounts);
    
    // Calculate total ingredients
    const totalIngredients = {};
    nonZeroCounts.forEach(recipe => {
      recipe.ingredients.forEach((ingredient, index) => {
        if (totalIngredients[ingredient]) {
          totalIngredients[ingredient] += parseFloat(recipe.numof[index]);
        } else {
          totalIngredients[ingredient] = parseFloat(recipe.numof[index]);
        }
      });
    });

    setTotalIngredients(totalIngredients);
  };

  // const getIngredients = () => {
  //   const recipesSelected = handleConfirm();
  //   console.log('Non-zero Food Counts:', recipesSelected());

  //   // recipesSelected.forEach(recipe => {
  //   //   console.log(`\n${recipe.name}:`);
  //   //   recipe.ingredients.forEach((ingredient, i) => {
  //   //     console.log(`  ${ingredient}: ${recipe.values[i]}`);
  //   //   });
  //   // });
  // }

  return (
    <div>
      <h1 class="h1">Stardew Helper!</h1>
      <ul class="flex-container wrap">
      {sortedRecipesData.map((recipe, index) => (
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
        <button onClick={handleConfirm}>Confirm</button>  
      </div>
      <div style={{ marginTop: '20px' }}>
        {displayData.length > 0 && (
          <div>
            <h2>Selected Recipes:</h2>
            {displayData.map((recipe, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h3>{recipe.name} - {recipe.count}</h3>
                <ul>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>
                      {ingredient}: {recipe.numof[i]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2>Total Ingredients Needed:</h2>
              <ul>
                {Object.entries(totalIngredients).map(([ingredient, total], index) => (
                  <li key={index}>
                    {ingredient}: {total}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
