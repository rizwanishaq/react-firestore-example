import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NewRecipe from "./components/NewRecipe";
import RecipeList from "./components/RecipeList";
import Recipe from "./components/Recipe";
import Header from "./components/Header";
import EditRecipe from "./components/EditRecipe";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/new" component={NewRecipe} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/edit/:id" component={EditRecipe} />
        <Route exact path="/" component={RecipeList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
