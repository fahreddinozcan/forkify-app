"use strict";
import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import resultView from "./view/resultView.js";
import paginationView from "./view/paginationView.js";
import bookmarksView from "./view/bookmarksView.js";
// import "core-js/stable";
// import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe-page");

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    resultView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

    // Rendering recipee
  } catch (err) {
    recipeView.renderError();
  }
};
controlRecipes();
const controlSearchResults = async function () {
  try {
    // resultView.renderSpinner();
    const query = searchView.getQuery();

    if (!query) return;
    await model.loadSearchResults(query);
    resultView.render(model.getSearchResultPage(1));

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagionation = function (goToPage) {
  resultView.render(model.getSearchResultPage(goToPage));

  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView._addHandlerClick(controlPagionation);
};

init();

controlSearchResults();
