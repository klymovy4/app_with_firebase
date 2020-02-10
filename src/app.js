import { isValid, createModal } from "./utils.js"
import { getAuthForn, authWithEmailAndPassword } from "./auth.js"
import "./styles.css"
import { Question } from "./question"


console.log("app is working!!!!");

const form = document.getElementById("form")
const modalBtn = document.getElementById("modal-btn")
const input = form.querySelector("#question-input")
const submitBtn = form.querySelector("#submit")

window.addEventListener("load", Question.renderList)
modalBtn.addEventListener("click", openModal)
form.addEventListener("submit", submitFormHandler)
input, addEventListener("input", () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
    event.preventDefault()
    console.log(input.value);
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        submitBtn.disabled = true
        // Async  request to server to save question 
        Question.create(question).then(() => {
            input.value = ""
            input.className = ""
            submitBtn.disabled = true
        })
        // console.log("question ", question);
        // debugger;

    }
}

function openModal() {
    createModal("Авторизация", getAuthForn())
    document.getElementById("auth-form")
        .addEventListener("submit", authFormHandler, { once: true })
}

function authFormHandler(event) {
    event.preventDefault()

    const btn = event.target.querySelector("button")
    const email = event.target.querySelector("#email").value
    const password = event.target.querySelector("#password").value

    btn.disabled = true
    authWithEmailAndPassword(email, password)
        .then(token => {
            return Question.fetch(token)
        })
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
    if (typeof content === "string") {
        createModal("Ошибка!", content)
    } else {
        createModal("Список Вопросов", Question.listToHTML(content))
    }

}