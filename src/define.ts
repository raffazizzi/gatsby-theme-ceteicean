function define(elements: string[]): void {
  // define custom elements from list of elements names
  for (const name of elements) {
    const tagName = name.toLowerCase()
    if (!window.customElements.get(tagName)) {
      try {
        window.customElements.define(tagName, class extends HTMLElement {
          constructor() {
            super() 
            if (!this.matches(":defined")) { 
              // "Upgraded" undefined elements can have attributes & children; new elements can't
              // We don't want to double-process elements, so add a flag
              this.setAttribute("data-processed", "")
            }
          }
          // Process new elements when they are connected to the browser DOM
          connectedCallback() {
            if (!this.hasAttribute("data-processed")) {
              this.setAttribute("data-processed", "");
            }
          }
        })
      } catch (error) {
        console.log(name + " couldn't be registered.")
        console.log(error)
      }
    }
  }
}

export default define
