// Standard function for creating a DOM Element
export const createElement = (tagName, parent, className, innerText) => {
    const element = document.createElement(tagName);

    if (className) element.classList.add(className);
    if (innerText) element.innerText = innerText;

    if (parent) parent.append(element);

    return [element];
}