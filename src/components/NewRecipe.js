import React, { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { UserContext } from "../contexts/userContext";
import { firestore } from "../firebase-utils/utils";

const NewRecipe = ({ history }) => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");

  const saveRecipe = async (e) => {
    e.preventDefault();
    const ingredientsArray = ingredients.split(",");
    await firestore
      .collection("users")
      .doc(user.uid)
      .collection("recipes")
      .add({
        name,
        ingredients: ingredientsArray,
        description,
      });
    setName("");
    setIngredients("");
    setDescription("");
    history.push("/");
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

export default NewRecipe;
