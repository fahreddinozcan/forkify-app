import View from "./View.js";
class paginationView extends View {
  _parentElement = document.querySelector(".page-btns");
  _addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".page-btn");
      if (!btn) return;
      console.log(btn);

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    //Page 1 with other pages
    if (curPage === 1 && numPages > 1) {
      return `
            <button data-goto="${
              curPage + 1
            }" class="page-forward-btn page-btn btn-forward">
                <p class="page-btn-text">Page ${curPage + 1}</p>
                <i class="ph-arrow-right-bold page-icon"></i>
            </button>
      `;
    }
    // Page 1 with no other pages
    if (curPage == numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="page-back-btn page-btn btn-prev">
            <i class="ph-arrow-left-bold page-icon"></i>
            <p class="page-btn-text">Page ${curPage - 1}</p>
        </button>
      `;
    }

    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="page-back-btn page-btn btn-prev">
            <i class="ph-arrow-left-bold page-icon"></i>
            <p class="page-btn-text">Page ${curPage - 1}</p>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="page-forward-btn page-btn btn-forward">
            <p class="page-btn-text">Page ${curPage + 1}</p>
            <i class="ph-arrow-right-bold page-icon"></i>
        </button>
      `;
    }
    return "";
  }
}

export default new paginationView();
