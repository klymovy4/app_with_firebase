export function getAuthForn() {
    return `
        <form class="mui-form" id="auth-form">

            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email" required>
                <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="password" required>
                <label for="password">password</label>
            </div>
            <button
                type="submit" 
                class="mui-btn mui-btn--primary"
            >
                Зарегистрироваться
            </button>
        </form>
    `
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = "AIzaSyBty4O_c5v1g3YdNE7umB2yfEhmH3zz-p4"
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: "POST",
        body: JSON.stringify({
            email: email, password: password, returnSecureToken: true
        }),
        headers: {
            "Content-Type": "aplication/json"
        }
    })
        .then(response => response.json())
        .then(data => data.idToken)
}