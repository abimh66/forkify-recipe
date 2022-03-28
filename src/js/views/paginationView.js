import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkupButtonPrevious(currentPage) {
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        currentPage - 1
      }">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
      </button>
    `;
  }
  _generateMarkupButtonNext(currentPage) {
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        currentPage + 1
      }">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    //Page 1 and there are other page
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButtonNext(curPage);
    }

    //Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButtonPrevious(curPage);
    }
    //Other page
    if (curPage > 1 && curPage < numPages) {
      return (
        this._generateMarkupButtonPrevious(curPage) +
        this._generateMarkupButtonNext(curPage)
      );
    }

    //Page 1 and there are no other page
    if (curPage === 1 && numPages === 1) {
      return '';
    }
  }
}

export default new PaginationView();
