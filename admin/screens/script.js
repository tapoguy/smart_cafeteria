
  function toggleDropdown() {
    const dropdownContent = document.getElementById('customer-dropdown');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  }
  
  // Function to toggle the customer dropdown menu
  function toggleCustomersDropdown() {
    const dropdownContent = document.getElementById('customer-dropdown');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  }
  
  // Function to toggle the orders dropdown menu
  function toggleOrdersDropdown() {
    const dropdownContent = document.getElementById('orders-dropdown');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  }
  
  // Function to toggle the menus dropdown menu
  function toggleMenusDropdown() {
    const dropdownContent = document.getElementById('menus-dropdown');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  }
  
  new Chart(document.getElementById("revenueChart"), {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [{
            label: 'Income',
            data: [100, 200, 150, 300, 250, 400, 300, 350, 450, 500, 600],
            borderColor: '#e91e63',
            fill: true,
            backgroundColor: 'rgba(233, 30, 99, 0.2)'
        }]
    }
});

new Chart(document.getElementById("foodChart"), {
    type: 'line',
    data: {
        labels: ['nsima_beef', 'nsima_chicken', 'nsima_fish', 'rice_beef', 'rice_chicken', 'chips_eggs', 'chips_chicken', 'rice_eggs', 'nsima_eggs', 'tea', 'polige'],
        datasets: [{
            label: 'food',
            data: [100, 200, 150, 300, 250, 400, 300, 350, 450, 500, 600],
            borderColor: '#e91e63',
            fill: true,
            backgroundColor: 'rgba(233, 30, 99, 0.2)'
        }]
    }
});

