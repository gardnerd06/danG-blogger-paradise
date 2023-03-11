// document.getElementById("#signup-form").reset();
// document.getElementById("#login-form").reset();
const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collected values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // Send a POST request to the API endpoint
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        // checks response and if good redirecting to home page logged in
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
