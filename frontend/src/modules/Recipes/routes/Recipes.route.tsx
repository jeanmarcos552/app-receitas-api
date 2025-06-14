import { Route } from "react-router";
import { ScreenListRecipes } from "../screens/ScreenListRecipes";
import { RecipesLayout } from "../layout/RecipesLayout";
import { ScreenCreateRecipes } from "../screens/ScreenCreateRecipes";

export const RecipesRoutes = (
  <Route path="/" element={<RecipesLayout />}>
    <Route index element={<ScreenListRecipes />} />
    <Route path="create" element={<ScreenCreateRecipes />} />
    <Route path="edit/:id" element={<h1>Edit Recipe</h1>} />
  </Route>
);
