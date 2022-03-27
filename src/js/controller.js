import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) module.hot.accept();

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

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
    resultView.render(model.state.search.results);
    console.log(model.state.search.results);
  } catch (err) {
    resultView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  // model.loadSearchResult('pizza');
  // console.log(model.state.search.results);
};
init();
