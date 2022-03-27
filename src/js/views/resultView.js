import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';

  _generateMarkup() {
    return this._data.map(data => this._generateMarkupPreview(data)).join('');
  }

  _generateMarkupPreview(data) {
    return `
    <li class="preview">
        <a class="preview__link" href="#${data.id}">
        <figure class="preview__fig">
            <img src="${data.image}" alt="${data.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${data.title}</h4>
            <p class="preview__publisher">${data.publisher}</p>
        </div>
        </a>
    </li>`;
  }
}
export default new ResultView();
