import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) module.hot.accept();

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 0) Update resultView to mark selected recipe
    resultView.update(model.searchResultPerPage());
    // 1) Load Data
    await model.loadRecipe(id);
    // 2) Rendering Data
    recipeView.render(model.state.recipe);
  } catch (err) {
    // console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();

    // 1) Get query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load Data
    await model.loadSearchResult(query);
    if (!model.state.search.results.length) throw new Error();

    // 3) Rendering Data
    resultView.render(model.searchResultPerPage());
    console.log(model.state.search.results);

    // 4) Render Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultView.renderError();
  }
};

const controlPagination = function (goToPage) {
  console.log('controlPagination');
  // 1) Render Data
  resultView.render(model.searchResultPerPage(goToPage));
  console.log(model.state.search.results);

  // 2) Render Pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update data in model
  model.updateServings(newServings);

  // Update the UI
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};
init();
