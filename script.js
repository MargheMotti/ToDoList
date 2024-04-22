// Operazioni ad avvio pagina

const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyList = document.querySelector('.empty-list');

// creo una chiaver per il local storage
const STORAGE_KEY = '__TODO__'

// Preparazione lista attività
let activities = [];

// controllo se ci sono già attività nel localStorage
const storage = localStorage.getItem(STORAGE_KEY)
if (storage) {
    activities = JSON.parse(storage)
}

//Esecuzione funzione, chiedo a JS di mostrare in pagina
ShowContent();

// # OPERAZIONI DINAMICHE
// Quando senti il click sul bottone
button.addEventListener('click', function () {
    // Reagisco aggiungendo l'atività
    //trim serve ad eliminare gli spazi prima e dopo
    const newActivity = inputField.value.trim()
    // se il campo non è vuoto...
    if (newActivity.length > 0) {
        addActivity(newActivity);
    };
});

// FUNZIONI

// Funzione che decide cosa mostrare in pagina
function ShowContent() {
    //Prima di tutto pulisco
    todoList.innerText = '';
    emptyList.innerText = '';

    // CONDIZIONI

    if (activities.length > 0) {
        //se c'è almeno un'attività...
        //per ogni attività...
        activities.forEach(function (activity) {
            // Crea un template HTML
            const template = createActivityTemplate(activity)
            // Inseriscilo in pagina
            todoList.innerHTML += template
        });

        // Rendi cliccabili i check
        makeCheckClickable();

    } else {
        //altrimenti mostra emptyList (messaggio lista vuota)
        emptyList.innerHTML = '<p class="empty-list">Sembra non ci siano nuove <strong>nuove attività.</strong></p>';
    };
};

// Funzione che rende cliccabili i check
function makeCheckClickable() {
    // cerca tutti i check e fa si che siano cliccabili
    const checks = document.querySelectorAll('.todo-check')
    // per ogni check
    checks.forEach(function (check, index) {
        // aggiungi una reazione al click
        check.addEventListener('click', function () {
          
            // Chiedi la conferma
            const confirmed = window.confirm('Vuoi passare alla prossima attività? 🎨');
            // Se sì, cancella attività
            if (confirmed) {
                // rimuovi l'elemento dalla lista
                activities.splice(index, 1)

                // aggiorna il localStorage
                localStorage.setItem(STORAGE_KEY, JSON.stringify(activities))

                // aggiorna la lista in pagina
                ShowContent();
            }
        })
    })
};

// funzione per aggiungere un'attività
function addActivity(newActivity) {
    // Aggiungo l'attivita alla lista
    activities.push(newActivity);

    // Aggiorna lo storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

    // Ora ridecidi cosa mostrare
    ShowContent();

    // Svuotare il campo inputField
    inputField.value = '';
};

// funzione crea template HTML per un'attività
function createActivityTemplate(activity) {
    // restituisci questo pezzo di HTML
    return `
        <li class="todo-item">
        <div class="todo-check"><strong>✓</strong></div>
        <p class="todo-text">${activity}</p>
    </li>
        `;
};
