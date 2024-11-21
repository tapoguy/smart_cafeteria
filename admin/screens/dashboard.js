// Toggle Orders Dropdown
function toggleOrdersDropdown() {
    const ordersDropdown = document.getElementById('orders-dropdown');
    ordersDropdown.classList.toggle('show'); // Add/remove the 'show' class
}

// Toggle Menus Dropdown
function toggleMenusDropdown() {
    const menusDropdown = document.getElementById('menus-dropdown');
    menusDropdown.classList.toggle('show'); // Add/remove the 'show' class
}

// Toggle Customer Dropdown
function toggleDropdown() {
    const customerDropdown = document.getElementById('customer-dropdown');
    customerDropdown.classList.toggle('show'); // Add/remove the 'show' class
}

// Add event listeners to dropdown links
document.addEventListener('DOMContentLoaded', () => {
    const ordersLink = document.querySelector('[onclick="toggleOrdersDropdown()"]');
    const menusLink = document.querySelector('[onclick="toggleMenusDropdown()"]');
    const customerLink = document.querySelector('[onclick="toggleDropdown()"]');

    if (ordersLink) ordersLink.addEventListener('click', toggleOrdersDropdown);
    if (menusLink) menusLink.addEventListener('click', toggleMenusDropdown);
    if (customerLink) customerLink.addEventListener('click', toggleDropdown);
});
