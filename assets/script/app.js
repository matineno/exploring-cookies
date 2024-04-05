'use strict';

// Importing utilities from external module
import * as utils from './utils.js';

// Destructuring assignment for console.log
const { log } = console;

// DOM element variables
const dialog01 = document.querySelector('.dialog'); // First dialog box
const dialogOption = document.querySelector('.dialog-option'); // Second dialog box
const backgroundMask = document.querySelector('.background-mask'); // Background mask
const acceptButton = document.querySelector('.accept'); // Accept all cookies button
const settingsButton = document.querySelector('.settings'); // Settings button
const savePreferButton = document.querySelector('.save-prefer'); // Save preferences button

// State variable to track if a dialog box is visible
let dialogIsVisible = false;

// Variables to store window dimensions
let width = window.innerWidth;
let height = window.innerHeight;

// Event listener for when the DOM content is loaded
utils.listen('DOMContentLoaded', document, checkCookies);

// Function to set a cookie with a name, value, and maximum age
function setCookie(name, value, maxAge) {
    document.cookie = `${name}=${value}; max-age=${maxAge}`;
}

// Function to get the value of a cookie by its name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

// Function to determine the client's browser name
function getBrowser() {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    switch (true) {
        case userAgent.includes('Safari') && !(userAgent.includes('Chrome') || userAgent.includes('Edg')):
            browserName = 'Safari';
            break;
        case userAgent.includes('OPR'):
            browserName = 'Opera';
            break;
        case userAgent.includes('Firefox'):
            browserName = 'Firefox';
            break;
        case userAgent.includes('Edg'):
            browserName = 'Edge';
            break;
        case userAgent.includes('Chrome'):
            browserName = 'Chrome';
            break;
    }
    return browserName;
}

// Function to determine the client's operating system
function getOS() {
    const userAgent = navigator.userAgent;
    let osName = 'Unknown';
    switch (true) {
        case userAgent.includes('Windows'):
            osName = 'Windows';
            break;
        case userAgent.includes('Mac'):
            osName = 'Mac OS';
            break;
        case userAgent.includes('Linux'):
            osName = 'Linux';
            break;
        case userAgent.includes('iOS'):
            osName = 'iOS';
            break;
        case userAgent.includes('Android'):
            osName = 'Android';
            break;
    }
    return osName;
}

// Function to check if cookies are enabled and if there are any stored cookies
function checkCookies() {
    const cookiesEnabled = navigator.cookieEnabled;
    const storedCookies = document.cookie;
    if (!cookiesEnabled || !storedCookies) {
        setTimeout(() => {
            displayDialog();
        }, 1000); // Add a delay of 1 second
    }
    // Check if cookies are live for 15-20 seconds
    setTimeout(() => {
        setCookie('testCookie', 'test', 0); // Expire the test cookie
    }, 15000); // 15 seconds
}

// Function to hide the dialog boxes and background mask
function hideDialog() {
    dialog01.classList.remove('isVisible');
    dialogOption.classList.remove('isVisible2');
    backgroundMask.classList.remove('isVisible');
}

// Function to display the first dialog box and background mask
function displayDialog() {
    dialog01.classList.add('isVisible');
    backgroundMask.classList.add('isVisible');
    dialogIsVisible = true;
}

// Function to display the second dialog box and background mask
function displayDialogOption() {
    dialogOption.classList.add('isVisible2');
    backgroundMask.classList.add('isVisible');
}

// Function to create cookies for all options (accept all cookies)
function createAllCookies() {
    const options = document.querySelectorAll('.slider-container input[type=checkbox]');
    options.forEach(option => {
        option.setAttribute('checked', 'checked'); // Add the 'checked' attribute to each checkbox
        const optionName = option.parentNode.previousElementSibling.textContent.trim();
        const isChecked = option.checked;
        switch (optionName) {
            case 'Browser':
                if (isChecked) {
                    setCookie(optionName, getBrowser(), 10); // Live for 10 seconds
                }
                break;
            case 'Operating system':
                if (isChecked) {
                    setCookie(optionName, getOS(), 10); // Live for 10 seconds
                }
                break;
            case 'Screen width':
                if (isChecked) {
                    setCookie(optionName, `${width}px`, 10); // Live for 10 seconds
                }
                break;
            case 'Screen height':
                if (isChecked) {
                    setCookie(optionName, `${height}px`, 10); // Live for 10 seconds
                }
                break;
        }
    });

    log(document.cookie);
}

// Function to create cookies based on user-selected options
function userSelectCookies() {
    const options = document.querySelectorAll('.slider-container input[type=checkbox]');
    options.forEach(option => {
        const optionName = option.parentNode.previousElementSibling.textContent.trim();
        const isChecked = option.checked;
        switch (optionName) {
            case 'Browser':
                if (isChecked) {
                    setCookie(optionName, getBrowser(), 10); // Live for 10 seconds
                }
                break;
            case 'Operating system':
                if (isChecked) {
                    setCookie(optionName, getOS(), 10); // Live for 10 seconds
                }
                break;
            case 'Screen width':
                if (isChecked) {
                    setCookie(optionName, `${width}px`, 10); // Live for 10 seconds
                }
                break;
            case 'Screen height':
                if (isChecked) {
                    setCookie(optionName, `${height}px`, 10); // Live for 10 seconds
                }
                break;
        }
    });

    log(document.cookie);
}

// Event listeners for button clicks
utils.listen('click', acceptButton, () => {
    createAllCookies();
    hideDialog();
});

utils.listen('click', settingsButton, () => {
    hideDialog();
    displayDialogOption();
});

utils.listen('click', savePreferButton, () => {
    userSelectCookies();
    hideDialog();
});
