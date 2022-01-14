let noteForm = document.querySelector("#note-form")
let noteInput = document.querySelector("#note-input")

let ul = document.querySelector("#list-group")

let notes = []
let noteID = 0

function NotePrototype(text, id) {
    this.id = id
    this.text = text
}


function deleteNote(noteID) {
    document.getElementById(`note-number-${noteID}`).remove()

    for (i = 0; i < notes.length; i++) {
        if (notes[i].id == noteID) {
            notes.splice(i, 1)
        }
    }

}

function noteCreateDOM(text, noteID) {
    let li = document.createElement("li")
    let btn = document.createElement("button")
    let paragraf = document.createElement("span")

    li.setAttribute("class", "list-group-item d-flex align-items-center justify-content-between")
    li.setAttribute("id", `note-number-${noteID}`)

    paragraf.setAttribute("class", "fs-5")
    btn.setAttribute("class", "btn btn-outline-danger")

    btn.addEventListener("click", function () {
        deleteNote(noteID)
    })

    paragraf.textContent = text
    btn.textContent = "O'chirish"


    li.append(paragraf, btn)

    ul.appendChild(li)
}

function noteCreate(text, noteID) {

    if (text.trim() == "") {

        if (document.getElementById("errorMessage")) return

        const p = document.createElement("p")
        const cardBody = document.getElementById("card-body")

        p.innerText = "Malumot kiritilmadi!"
        p.setAttribute("style", "color: red; text-align: center; font-size: 18px; padding-top: 15px;font-style: italic;")
        p.id = "errorMessage"
        cardBody.appendChild(p)

        setTimeout(function () {
            const errorMessage = document.getElementById("errorMessage")
            if (errorMessage) {
                cardBody.removeChild(errorMessage)
            }
        }, 1500)
    }

    else {
        noteCreateDOM(text, noteID)
        notes.push(new NotePrototype(text, noteID))
    }
}

noteForm.addEventListener("submit", function (e) {
    e.preventDefault()

    noteCreate(noteInput.value, noteID)

    noteForm.reset()

    noteID++
})