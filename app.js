let notes = [];

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const colorSelector = document.getElementById('colorSelector');
    const notesContainer = document.getElementById('notesContainer');

    const noteText = noteInput.value;
    const noteColor = colorSelector.value;

    if (noteText.trim() === '') {
        alert('Please enter a note.');
        return;
    }

    const note = {
        text: noteText,
        color: noteColor,
    };

    notes.push(note);

    // Update the notes container
    renderNotes();

    // Clear the input fields
    noteInput.value = '';
}

function renderNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = `mb-6 p-4 border rounded ${note.color} relative h-16`;
        noteElement.innerHTML = note.text; // Use innerHTML to allow for HTML content

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'hidden absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded'; // Adjusted top position
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(index);

        noteElement.appendChild(deleteButton);

        // Add save button
        const saveButton = document.createElement('button');
        saveButton.className = 'hidden absolute top-12 right-2 bg-green-500 text-white py-1 px-3.5 rounded'; // Adjusted top position
        saveButton.textContent = 'Save';
        saveButton.onclick = () => saveNoteAsDoc(note.text);

        noteElement.appendChild(saveButton);

        // Show buttons on hover
        noteElement.addEventListener('mouseover', () => {
            deleteButton.classList.remove('hidden');
            saveButton.classList.remove('hidden');
        });

        noteElement.addEventListener('mouseout', () => {
            deleteButton.classList.add('hidden');
            saveButton.classList.add('hidden');
        });

        notesContainer.appendChild(noteElement);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}

function saveNoteAsDoc(text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'note.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

let darkMode = false;

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const colorSelector = document.getElementById('colorSelector');
    const categorySelector = document.getElementById('categorySelector');
    const notesContainer = document.getElementById('notesContainer');

    const noteText = noteInput.value;
    const noteColor = colorSelector.value;
    const noteCategory = categorySelector.value;

    if (noteText.trim() === '') {
        alert('Please enter a note.');
        return;
    }

    const note = {
        text: noteText,
        color: noteColor,
        category: noteCategory,
    };

    notes.push(note);

    // Update the notes container
    renderNotes();

    // Clear the input fields
    noteInput.value = '';
}

function renderNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = `mb-6 p-4 border rounded ${note.color} relative h-24 draggable`;
        noteElement.innerHTML = `<strong>${note.category}</strong><br>${note.text}`;

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'hidden absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(index);

        noteElement.appendChild(deleteButton);

        // Add save button
        const saveButton = document.createElement('button');
        saveButton.className = 'hidden absolute top-12 right-2 bg-green-500 hover:bg-green-700 text-white py-1 px-3.5 rounded';
        saveButton.textContent = 'Save';
        saveButton.onclick = () => saveNoteAsDoc(note.text);

        noteElement.appendChild(saveButton);

        // Show buttons on hover
        noteElement.addEventListener('mouseover', () => {
            deleteButton.classList.remove('hidden');
            saveButton.classList.remove('hidden');
        });

        noteElement.addEventListener('mouseout', () => {
            deleteButton.classList.add('hidden');
            saveButton.classList.add('hidden');
        });

        // Set data-index attribute for draggable functionality
        noteElement.setAttribute('data-index', index);

        notesContainer.appendChild(noteElement);
    });

    // Make notes draggable
    makeNotesDraggable();
}

// Function to make notes draggable
function makeNotesDraggable() {
    $(".draggable").draggable({
        containment: "#notesContainer",
        scroll: false,
        stack: ".draggable",
        stop: function (event, ui) {
            // Update the notes array based on the new order
            const newNotesOrder = [];
            $(".draggable").each(function () {
                const index = parseInt($(this).attr("data-index"));
                newNotesOrder.push(notes[index]);
            });
            notes = newNotesOrder;
        },
    });
}

renderNotes();