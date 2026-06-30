// VARIABEL
let myNotes = []

const menuBtn = document.getElementById("menu-toggle")
const menuEl = document.getElementById("hamburger-menu")
const aboutBtn = document.getElementById("about-btn")
const aboutEl = document.getElementById("about")
const aboutBackBtn = document.getElementById("about-back-btn")
const darkBtn = document.getElementById("dark-toggle")
const isDarkFromLocal = JSON.parse(localStorage.getItem("isDark"))
const addNewBtn = document.getElementById("add-new-btn")
const addNewPopup = document.getElementById("popup-container")
const popupCancelBtn = document.getElementById("popup-cancel-btn")
const addNewNotesBtn = document.getElementById("add-new-notes")
let popupTitleEl = document.getElementById("popup-title-el")
let notesList = document.getElementById("notes-list")
const myNotesFromLocal = JSON.parse(localStorage.getItem("myNotes"))
const notes = document.getElementById("notes")
const notesBackBtn = document.getElementById("notes-back-btn")
const notesSaveBtn = document.getElementById("notes-save-btn")
const notesContainer = document.getElementById("notes-container")
const saveAlertEl = document.getElementById("save-alert")
const deleteAlertEl = document.getElementById("delete-alert")
const addedAlertEl = document.getElementById("added-alert")

// RENDER
if (isDarkFromLocal) {
    renderDark()
}
if (myNotesFromLocal) {
    myNotes = myNotesFromLocal
    render(myNotes)
}

// BUTTON EVENT
menuBtn.addEventListener("click", () => {
    const isOpenMenu = menuEl.classList.toggle("active");
    menuBtn.innerHTML = isOpenMenu ? "<i class='fa-solid fa-xmark'></i>" : "<i class='fa-solid fa-bars'></i>"
})

darkBtn.addEventListener("click", () => {
    isDark = document.body.classList.toggle("dark")
    darkBtn.innerHTML = isDark ? "<i class='fa-solid fa-sun'></i>" : "<i class='fa-solid fa-moon'></i>"
    localStorage.setItem("isDark", JSON.stringify(isDark))
    menuClose()
})

addNewBtn.addEventListener("click", () => {
    addNewPopup.classList.add("active")
    menuClose()
})

popupCancelBtn.addEventListener("click", () => {
    addNewPopup.classList.remove("active")
    popupTitleEl.value = ""
    menuClose()
})

addNewNotesBtn.addEventListener("click", () => {
    
    myNotes.push({
        "title": popupTitleEl.value ? popupTitleEl.value : "Title",
        "text": "Your Notes",
    })

    localStorage.setItem("myNotes", JSON.stringify(myNotes))

    render(myNotes)

    console.log(myNotes);
    addNewPopup.classList.remove("active")

    popupTitleEl.value = ""

    alert(addedAlertEl)

    menuClose()
})

aboutBtn.addEventListener("click", ()=>{
    aboutEl.classList.toggle("active")
    menuClose()
})

aboutBackBtn.addEventListener("click", () => {
    aboutEl.classList.remove("active")
})

notesSaveBtn.addEventListener("click", () => {
    saveNotes()
    render(myNotes)
    menuClose()
})



// FUNCTION
function renderDark() {
    if (isDarkFromLocal) {
        document.body.classList.toggle("dark")
        darkBtn.innerHTML = "<i class='fa-solid fa-sun'></i>"
    }
}

function render(myNotes) {

    notesList.innerHTML = ""
    for (i = 0; i < myNotes.length; i++) {
        let notesListHtml = `<li class="list-card">
            <div class="card-info">
              <span class="notes-title" id="card-title${i}">${myNotes[i].title}</span>
              <span class="notes-text" id="card-text${i}">
              ${myNotes[i].text}
              </span>
            </div>
            <div class="card-menu">
              <button onclick="editNotes(${i})">
                <i class="fa-solid fa-pencil"></i>
              </button>
              <button onclick="deleteNotes(${i})">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </li>`

        notesList.innerHTML += notesListHtml
    }
}

function deleteNotes(index) {
    myNotes.splice(index, 1)
    localStorage.setItem("myNotes", JSON.stringify(myNotes))
    myNotes = myNotesFromLocal
    render(myNotes)
    alert(deleteAlertEl)
    menuClose()
}

function editNotes(index) {
    notes.innerHTML = ""
    notes.innerHTML += `
        <div class="notes-header">
          <input id="notes-title${index}" type="text" placeholder="Title" />
          <button onclick="saveNotes(${index})"><i class="fa-solid fa-check"></i></i></button>
          <button onclick="backButton()"><i class="fa-solid fa-arrow-left"></i></button>
        </div>

        <textarea name="" id="notes-text${index}" placeholder="Your notes"></textarea>
        `
    notes.classList.add("active")

    let notesTitle = document.getElementById(`notes-title${index}`)
    let notesText = document.getElementById(`notes-text${index}`)

    notesTitle.value = myNotes[index].title
    notesText.value = myNotes[index].text
    menuClose()
}

function saveNotes(index) {
    let notesTitle = document.getElementById(`notes-title${index}`)
    let notesText = document.getElementById(`notes-text${index}`)

    myNotes[index].title = notesTitle.value ? notesTitle.value : "Title"
    myNotes[index].text = notesText.value ? notesText.value : "Your Note"

    localStorage.setItem("myNotes", JSON.stringify(myNotes))
    render(myNotes)
    alert(saveAlertEl)
    menuClose()
}

function backButton() {
    notes.classList.remove("active")
    notes.innerHTML = ""
    menuClose()
}

function alert(element) {
    element.classList.add("active")
    setTimeout(() => {
        element.classList.remove("active")
    }, 2000)
}

function menuClose() {
    menuEl.classList.remove("active")
    menuBtn.innerHTML = "<i class='fa-solid fa-bars'></i>"
}
