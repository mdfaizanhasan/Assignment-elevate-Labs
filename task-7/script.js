// DOM Elements
const userContainer = document.getElementById('user-container');
const errorMessage = document.getElementById('error-message');
const loadingIndicator = document.getElementById('loading');
const reloadButton = document.getElementById('reload-btn');

// Function to fetch users data from API
async function fetchUsers() {
  // Show loading indicator and hide any previous error
  loadingIndicator.style.display = 'block';
  errorMessage.style.display = 'none';
  userContainer.innerHTML = '';

  try {
    // Fetch data from the API
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const users = await response.json();

    // Display the users
    displayUsers(users);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching users:', error);
    errorMessage.textContent = `Failed to load users: ${error.message}`;
    errorMessage.style.display = 'block';
  } finally {
    // Hide loading indicator
    loadingIndicator.style.display = 'none';
  }
}

// Function to display users on the page
function displayUsers(users) {
  // Clear previous content
  userContainer.innerHTML = '';

  // Loop through users and create HTML for each
  users.forEach((user) => {
    const userCard = document.createElement('div');
    userCard.className = 'user-card';

    // Format the address
    const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

    // Set the HTML content
    userCard.innerHTML = `
            <div class="user-name">${user.name}</div>
            <div class="user-email">${user.email}</div>
            <div class="user-address">${address}</div>
        `;

    // Add the user card to the container
    userContainer.appendChild(userCard);
  });
}

// Event listener for reload button
reloadButton.addEventListener('click', fetchUsers);

// Initial data load
document.addEventListener('DOMContentLoaded', fetchUsers);
