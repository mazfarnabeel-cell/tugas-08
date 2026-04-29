const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const totalEl = document.getElementById("total");
const filter = document.getElementById("filter");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// SIMPAN KE LOCAL STORAGE
function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// TAMPILKAN DATA
function renderData(filterCategory = "All") {
    list.innerHTML = "";

    let total = 0;

    expenses.forEach((exp, index) => {
        if (filterCategory !== "All" && exp.category !== filterCategory) return;

        total += exp.amount;

        const li = document.createElement("li");
        li.innerHTML = `
            ${exp.name} - Rp ${exp.amount} (${exp.category})
            <div>
                <button class="edit" onclick="editData(${index})">Edit</button>
                <button class="delete" onclick="deleteData(${index})">Hapus</button>
            </div>
        `;
        list.appendChild(li);
    });

    totalEl.textContent = total;
}

// TAMBAH DATA
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const amount = parseInt(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    if (!name || amount <= 0) {
        alert("Input tidak valid!");
        return;
    }

    expenses.push({ name, amount, category });

    saveData();
    renderData(filter.value);

    form.reset();
});

// HAPUS DATA
function deleteData(index) {
    expenses.splice(index, 1);
    saveData();
    renderData(filter.value);
}

// EDIT DATA
function editData(index) {
    const exp = expenses[index];

    document.getElementById("name").value = exp.name;
    document.getElementById("amount").value = exp.amount;
    document.getElementById("category").value = exp.category;

    expenses.splice(index, 1);
    saveData();
    renderData(filter.value);
}

// FILTER
filter.addEventListener("change", function() {
    renderData(this.value);
});

// LOAD AWAL
renderData();