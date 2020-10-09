import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { UserContext } from "../contexts/userContext";
import { firestore } from "../firebase-utils/utils";

const EditRecipe = ({ match, history }) => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getRecipe = async () => {
      const recipeDoc = await firestore
        .collection("users")
        .doc(user.uid)
        .collection("recipes")
        .doc(match.params.id)
        .get();

      const recipeData = recipeDoc.data();
      setName(recipeData.name);
      setIngredients(recipeData.ingredients.toString());
      setDescription(recipeData.description);
    };
    getRecipe();
  }, []);

  const saveRecipe = async (e) => {
    e.preventDefault();
    const ingredientsArray = ingredients.split(",");
    await firestore
      .collection("users")
      .doc(user.uid)
      .collection("recipes")
      .doc(match.params.id)
      .set({
        name,
        ingredients: ingredientsArray,
        description,
      });
    setName("");
    setIngredients("");
    setDescription("");

    history.push(`/recipe/${match.params.id}`);
  };

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Ingredients, separated by comma(,)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <Form.Text className="text-muted">
            Use comma(,) for separating ingredients
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={saveRecipe}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default EditRecipe;
