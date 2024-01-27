import './App.css';
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
                <Recipe image={item.image[0]}/>
                <RecipeName recipe={item.recipe}/>
                <input type="checkbox"></input>
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

function Recipe(props) {
  return (
    <div className="recipe">
      <img src={"https://stardewvalleywiki.com" + props.image} alt={props.recipe} height="60" />
    </div>
  );
}

function RecipeName(props) {
  return (
    <div className="recipeName">
      <body>{props.recipe}</body>
    </div>
  );
}

recipesData.map((item, index) => {
  return(
    <Recipe image={item.image[0]} recipe={item.recipe} />
  )
})

export default App;
