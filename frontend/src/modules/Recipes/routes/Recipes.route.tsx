import { Route } from "react-router";
import { ScreenListRecipes } from "../screens/ScreenListRecipes";
import { RecipesLayout } from "../layout/RecipesLayout";
import { ScreenCreateRecipes } from "../screens/ScreenCreateRecipes";
import { ScreenListRecipesDetails } from "../screens/ScreenListRecipesDetail";


export const RecipesRoutes = (
  <Route path="/" element={<RecipesLayout />}>
    <Route index element={<ScreenListRecipes />} />
    <Route path="create" element={<ScreenCreateRecipes />} />
    <Route path="details/:id" element={<ScreenListRecipesDetails />} />
    <Route path="edit/:id" element={<ScreenCreateRecipes />} />
  </Route>
);
