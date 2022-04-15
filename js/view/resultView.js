import View from "./View.js";
import previewView from "./previewView.js";
class resultView extends View {
  _parentElement = document.querySelector(".all-recipes");
  _errMessage = "No recipes found for your query! Please try again.";

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new resultView();
