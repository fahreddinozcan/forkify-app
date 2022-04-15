import View from "./View.js";
import previewView from "./previewView.js";
class addRecipeView extends View {
  _parentElement = document.querySelector(".all-recipes");
  _errMessage = "No recipes found for your query! Please try again.";
}

export default new addRecipeView();
