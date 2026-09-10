 const API_URL = "http://localhost:5000/api";


// ==========================================
// REGISTER
// ==========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");

        try {

            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                message.textContent =
                    data.message || "Registration failed";
                return;
            }

            message.textContent = "Registration successful!";

            registerForm.reset();

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);

        } catch (error) {

            console.error(error);

            message.textContent =
                "Unable to connect to server. Please try again.";
        }
    });
}


// ==========================================
// LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");

        try {

            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {

                message.textContent =
                    data.message || "Login failed";

                return;
            }

            // Save authentication data
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            message.textContent = "Login successful!";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } catch (error) {

            console.error(error);

            message.textContent =
                "Unable to connect to server. Please try again.";
        }
    });
}