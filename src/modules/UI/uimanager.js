// @ts-check



class UIManager {
  #container;
  #icons;
  /**
   * @param {Node} appContainer - Node element for the application container
   * @param {Object<string, string>} icons - object containing icon names as keys and values as the path 
   * */
  constructor(appContainer, icons) {
    this.#container = appContainer;
    this.#icons = icons;
  }

  /**
   * @param {Node} parent - Parent element to add div to
   * @param {string} cls - css class to add to div element
   * */
  addDiv(parent, cls) {
    const div = document.createElement("div");
    div.classList.add(cls);
    parent.appendChild(div);
  }

  /**
   * @param {string} type - type of node element
   * @param {Node} parent - parent node of the element
   * @param {string} cls - css class of the element
   * @returns {Node} - created element
   * */
  addElement(type, parent, cls) {
    const elem = document.createElement(type);
    elem.classList.add(cls);
    parent.appendChild(elem);

    return elem;
  }

  /**
   * @typedef {[Node, number]} NodeWithCount
   */

  /**
   * @param {Node} parent - parent element of the removed child
   * @param {Node} element - the Element to be removed
   * @returns {NodeWithCount|number} - returns an array containing the removed element and parent childs count
   * */
  removeElement(parent, element) {
    if (parent.childNodes.length === 0) {
      return 0;
    }
    const removed = parent.removeChild(element);
    const parentLength = parent.childNodes.length;

    return [removed, parentLength];
  }

  /**
   * @method to clear all child elements of a parent element
   * @param {Node} parent
   * @description clear all the elements inside of parent
   **/
  clearElement(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  get container() {
    return this.#container;
  }
  /**
     * @returns {Object<string, string>} The collection of loaded icons.
     */
  get icons() {
    return this.#icons;
  }
}

export default UIManager;
