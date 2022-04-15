import View from "./View.js";
class recipeView extends View {
  _parentElement = document.querySelector(".recipe-page");
  _data;
  _errMessage = "We could not find that recipe. Please try another one.";
  _message = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((el) =>
      window.addEventListener(el, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".serving-icon");

      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;

      if (updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".details-bookmark-icon");

      if (!btn) return;
      handler();
    });
  }
  _generateMarkup() {
    return `
    <div class="recipe-page">
          <figure class="recipe-main-image">
            <img src="${this._data.image}" alt="${
      this._data.title
    } "class="recipe-image-img" />
          </figure>
          <div class="recipe-main-details">
            <h1 class="dish-name">
              <span class="dish-name-text">${this._data.title}</span>
            </h1>
            <div class="recipe-details-time">
              <i class="ph-timer-bold time-icon"></i>
              <p class="recipe-details-time-text">
                <b class="details-time">${this._data.cookingTime}</b> MINUTES
              </p>
            </div>
            <div class="recipe-details-servings">
              <i class="ph-users-bold time-icon"></i>
              <p class="recipe-details-servings-text">
                <b class="details-servings">${this._data.servings}</b> SERVINGS
              </p>
              <div class="recipe-details-servings-icons">
                <i class="ph-minus-circle-bold serving-icon" data-update-to="${
                  this._data.servings - 1
                }"></i>
                <i class="ph-plus-circle-bold serving-icon" data-update-to="${
                  this._data.servings + 1
                }"></i>
              </div>
            </div>
            <div class="details-bookmark-icon">
              <i class="ph-bookmark-simple-${
                this._data.bookmarked == true ? "fill" : "bold"
              } bookmark-icon"></i>
            </div>
          </div>
          <div class="recipe-main-ingredients">
            <p class="ing-header">RECIPE INGREDIENTS</p>
            ${this._data.ingredients
              .map(this._generateMarkupIngredients)
              .join("")}
            
            
          </div>
          <div class="recipe-main-source">
            <p class="source-header">HOW TO COOK IT</p>
            <p class="source-desc">
              This recipe was carefully designed and tested by <b>${
                this._data.publisher
              }</b>.
              Please check out directions at their website.
            </p>
            <button class="directions-btn">
              <a class="directions-btn-txt" href="${
                this._data.sourceUrl
              }">DIRECTIONS</a>
              <i class="ph-arrow-right-bold directions-icon"></i>
            </button>
          </div>
        </div>
    `;
  }
  _generateMarkupIngredients(ing) {
    return `
  <div class="ingredient">
    <i class="ph-check-bold ingredient-icon"></i>
    <p class="ingredient-text"> <b>${ing.quantity ? ing.quantity : ""}</b> ${
      ing.unit
    } ${ing.description}</p>
  </div>
  `;
  }
}
export default new recipeView();
