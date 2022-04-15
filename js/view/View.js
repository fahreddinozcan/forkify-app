export default class View {
  _data;
  _clear() {
    this._parentElement.innerHTML = "";
  }
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    let markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    let newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      console.log(curEl, newEl.isEqualNode(curEl));

      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  renderSpinner = function () {
    const Markup = `<div class="spinner"><i class="ph-spinner-bold spinner-icon"></i></div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", Markup);
  };
  renderError = function (message = this._errMessage) {
    const markup = `<div class="error-div">
          <i class="ph-warning-bold error-icon"></i>
          <p class="error-text">${message}</p>
        </div>;`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };
  renderMessage = function (message = this._errMessage) {
    const markup = `<div class="error-div">
          <i class="ph-smiley-bold error-icon"></i>
          <p class="error-text">${message}</p>
        </div>;`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };
}
