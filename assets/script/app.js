'use strict';

import * as utils from './utils.js';

const { log } = console;
const dialog01 = document.querySelector('.dialog');
const dialogOption = document.querySelector('.dialog-option');
const backgroundMask = document.querySelector('.background-mask');
const acceptButton = document.querySelector('.accept');
const settingsButton = document.querySelector('.settings');
const savePreferButton = document.querySelector('.save-prefer');
let dialogIsVisible = false;

utils.listen('DOMContentLoaded', document, checkCookies());

utils.listen('click', acceptButton, () => {
    // Accept all cookies
    createAllCookies();
    hideDialog();
});

utils.listen('click', settingsButton, () => {
    // Show settings dialog
    hideDialog();
    displayDialogOption();
});

utils.listen('click', savePreferButton, () => {
    // Accept selected cookies
    userSelectCookies()
    hideDialog();
});

function checkCookies() {
    // Check if cookies are enabled and if there are any stored
    const cookiesEnabled = navigator.cookieEnabled;
    const storedCookies = document.cookie;
    if (!cookiesEnabled || !storedCookies) {
        setTimeout(() => {
            displayDialog();
        }, 1000); // Add a delay of 1 second
    }
    // Check if cookies are live for 15-20 seconds
    setTimeout(() => {
        document.cookie = 'testCookie=test; max-age=0'; // Expire the test cookie
    }, 15000); // 15 seconds
};

function hideDialog() {
    dialog01.classList.remove('isVisible');
    dialogOption.classList.remove('isVisible2');
    backgroundMask.classList.remove('isVisible');
}

function displayDialog() {
    dialog01.classList.add('isVisible');
    backgroundMask.classList.add('isVisible');
    dialogIsVisible = true;
}

function displayDialogOption() {
    dialogOption.classList.add('isVisible2');
    backgroundMask.classList.add('isVisible');
}

function createAllCookies() {
    // Create cookies for all options
    const options = document.querySelectorAll('.slider-container input[type=checkbox]');
    options.forEach(option => {
        option.setAttribute('checked', 'checked'); // Add the 'checked' attribute to each checkbox
        const optionName = option.parentNode.previousElementSibling.textContent.trim();
        const isChecked = option.checked;
        if (optionName === 'Browser' && isChecked) {
            document.cookie = `${optionName}=true; max-age=10`; // Live for 10 seconds
        } else if (optionName === 'Operating system' && isChecked) {
            document.cookie = `${optionName}=true; max-age=10`; // Live for 10 seconds
        } else if (optionName === 'Screen width' && isChecked) {
            document.cookie = `${optionName}=true; max-age=10`; // Live for 10 seconds
        } else if (optionName === 'Screen height' && isChecked) {
            document.cookie = `${optionName}=true; max-age=10`; // Live for 10 seconds
        }
    });

    console.log(document.cookie);
}

function userSelectCookies() {
    // Create cookies for all options
    const options = document.querySelectorAll('.slider-container input[type=checkbox]');
    options.forEach(option => {
        const optionName = option.parentNode.previousElementSibling.textContent.trim();
        const isChecked = option.checked;
        if (optionName === 'Browser' && isChecked) {
            document.cookie = `${optionName}=true; max-age=10`; // Live for 60 seconds
        } else if (optionName === 'Operating system' && isChecked) {
            document.cookie = `${optionName}=true; max-age=10`; // Live for 60 seconds
        } else if (optionName === 'Screen width' && isChecked) {
            document.cookie = `${optionName}=true; max-age=10`; // Live for 60 seconds
        }else if (optionName === 'Screen height' && isChecked) {
            document.cookie = `${optionName}=true; max-age=10`; // Live for 60 seconds
        }
    });

    log(document.cookie);
}
