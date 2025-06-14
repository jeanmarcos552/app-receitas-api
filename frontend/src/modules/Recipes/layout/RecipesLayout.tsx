import { Outlet } from "react-router";
import { RecipesMenu } from "../components/RecipesMenu";
import Banner from "@/assets/banner.png";

export const RecipesLayout = () => {
  return (
    <div className="flex flex-col gap-4 justify-content-between bg-secondary">
      <RecipesMenu />
      
      <div className=" min-h-screen flex flex-col gap-8">
        <div
          className=" bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url(${Banner})`,
            height: "600px",
          }}
        />
        <Outlet />
      </div>

      <footer className="mt-14 p-2 bg-primary py-4">
        <div className="container mx-auto text-center text-white">
          <p>
            &copy; {new Date().getFullYear()} Nonna Recipes. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
