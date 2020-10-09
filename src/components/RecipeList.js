import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { firestore } from "../firebase-utils/utils";
import { ListGroup, Container } from "react-bootstrap";

const RecipeList = () => {
  const { user } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const recipesCol = await firestore
        .collection("users")
        .doc(user.uid)
        .collection("recipes")
        .orderBy("name")
        .get();

      setRecipes(recipesCol.docs);
    };
    if (user) {
      getRecipes();
    }
  }, [user]);

  return (
    <Container fluid>
      <h1>Recipes</h1>
      <ListGroup>
        {recipes.map((recipe, i) => (
          <ListGroup.Item key={i}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.data().name}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default RecipeList;
