// @ts-check

class Dropdowner {
  #parentElement;
  #childrenItems;
  #menuHeaders;
  #ulMenus;

  /**
   * @constructor
   * @param {HTMLElement} parentElement
   * */
  constructor(parentElement) {
    this.#parentElement = parentElement;
    this.#childrenItems = Array.from(this.#parentElement.children); // Get HTMLCollection as Array

    this.#menuHeaders = [];
    this.#ulMenus = [];

    // Iterate through each direct child (e.g., div#dropmenu-item1, div#dropmenu-item2)
    this.#childrenItems.forEach((itemDiv) => {
      // Find the span with class 'dropmenu-head' within this div
      const header = itemDiv.querySelector("span.dropmenu-head");
      if (header) {
        this.#menuHeaders.push(header);
      }

      // Find the ul with class 'dropmenu-menu' within this div
      const menu = itemDiv.querySelector("ul.dropmenu-menu");
      if (menu) {
        this.#ulMenus.push(menu);
      }
    });

    this.init();
    this.setupListeners();
  }

  init() {
    console.log("Menu Headers:", this.#menuHeaders);
    console.log("UL Menus:", this.#ulMenus);

    this.#menuHeaders.forEach((mh) => {
      if (mh instanceof HTMLElement) {
        mh.style.cursor = "pointer";
      }
    });

    this.#ulMenus.forEach((ul) => {
      if (ul instanceof HTMLElement) {
        ul.style.visibility = "hidden";
        ul.style.opacity = "0";
      }
    });
  }

  setupListeners() {
    this.#menuHeaders.forEach((header, index) => {
      header.addEventListener("click", () => {
        // Toggle visibility of the corresponding UL menu
        const targetUl = this.#ulMenus[index];
        if (targetUl instanceof HTMLElement) {
          if (targetUl.style.visibility === "hidden") {
            targetUl.style.visibility = "visible";
            targetUl.style.opacity = "1";
          } else {
            targetUl.style.visibility = "hidden";
            targetUl.style.opacity = "0";
          }
        }
      });
    });
  }
}

export default Dropdowner;
