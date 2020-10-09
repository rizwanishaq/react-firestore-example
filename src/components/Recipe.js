import React, { useState, useEffect, useContext } from "react";
import { firestore } from "../firebase-utils/utils";
import { UserContext } from "../contexts/userContext";
import { ListGroup } from "react-bootstrap";

const Recipe = ({ match, history }) => {
  const { user } = useContext(UserContext);
  const [recipe, setRecipe] = useState(undefined);

  const deleteRecipe = async () => {
    await firestore
      .collection("users")
      .doc(user.uid)
      .collection("recipes")
      .doc(match.params.id)
      .delete();

    history.push("/");
  };

  useEffect(() => {
    const getRecipe = async () => {
      const recipeDoc = await firestore
        .collection("users")
        .doc(user.uid)
        .collection("recipes")
        .doc(match.params.id)
        .get();
      setRecipe(recipeDoc.data());
    };
    if (user) {
      getRecipe();
    }
  }, [user, match.params.id]);

  return (
    <>
      <h2>{recipe && recipe.name}</h2>
      <ListGroup>
        {recipe &&
          recipe.ingredients.map((ingredient, i) => (
            <ListGroup.Item key={i}>{ingredient}</ListGroup.Item>
          ))}
      </ListGroup>
      <p>{recipe && recipe.description}</p>
      <i className="fas fa-trash" onClick={deleteRecipe}></i>
      <i
        class="fas fa-edit"
        onClick={() => history.push(`/edit/${match.params.id}`)}
      ></i>
      Edit
    </>
  );
};

export default Recipe;
