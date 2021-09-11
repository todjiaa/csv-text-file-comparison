import { notificationWrapper } from "../main.js";

// Show notification
export const showNotification = (text) => {
    notificationWrapper.lastChild.textContent = text;

    notificationWrapper.classList.add("show-flex");
}

// Hide notification 
export const hideNotification = () => {
    notificationWrapper.classList.remove("show-flex");
}