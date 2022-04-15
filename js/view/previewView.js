import View from "./View.js";
class previewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
    <a class="result-recipe ${
      this._data.id === id ? "result-recipe-active" : ""
    }" href="#${this._data.id}">
        <figure class="result-recipe-img-div">
          <img src="${this._data.image}" class="result-recipe-img" />
        </figure>
        <div class="result-recipe-text">
          <div class="result-recipe-name">${this._data.title}</div>
          <div class="result-recipe-source">${this._data.publisher}</div>
        </div>
    </a>
      `;
  }
}

export default new previewView();
