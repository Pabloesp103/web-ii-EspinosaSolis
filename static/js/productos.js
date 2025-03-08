const createButton = document.getElementById('add-product-button');
const createSuccess = document.getElementById('create-success');
const createError = document.getElementById('create-error');
const createErrorMsg = document.getElementById('create-error-msg');
const deleteSuccess = document.getElementById('delete-success');
const deleteError = document.getElementById('delete-error');
const deleteErrorMsg = document.getElementById('delete-error-msg');
const tableInsert = document.getElementById('recent-products');


createButton.addEventListener("click", function (event) {
    resultTexts();
    event.preventDefault();

    const form = document.getElementById("create-product");
    const formData = new FormData(form);
    const data = {};
    const token = document.querySelector("#csrf_token").value;

    formData.forEach((value, key) => {
        data[key] = value
    });

    fetch(EVENTO_CREATE_URL, {
        method: "POST",
        headers: {
            "X-CSRFToken": token,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) =>
            res.json().then((json) => ({
                status: res.status,
                body: json,
            }))
        )
        .then(({ status, body }) => {
            if (status >= 400 && status <= 500) {
                createError.classList.remove("hidden");
                createError.style.display = "flex"
                createErrorMsg.innerText =
                    body.error || "An error occurred";
            } else if (status >= 200 && status < 300) {
                createSuccess.classList.remove("hidden");
                createSuccess.style.display = "flex"
                
                addToTable(
                    body.data.id,
                    body.data.name,
                    body.data.precio,
                    body.data.localidad_name
                );
            }
        })
        .catch((error) => {
            createError.classList.remove("hidden");
            createErrorMsg.innerText = error.message;
        });
})

function productoDelete(id)
{
    resultTexts();
    event.preventDefault();
    
    const token = document.querySelector("#csrf_token").value;
    fetch(EVENTO_DELETE_URL, {
        method: "POST",
        headers: {
            "X-CSRFToken": token,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"evento_id": id}),
    })
        .then((res) =>
            res.json().then((json) => ({
                status: res.status,
                body: json,
            }))
        )
        .then(({ status, body }) => {
            if (status >= 400 && status <= 500) {
                deleteError.classList.remove("hidden");
                deleteError.style.display = "flex"
                deleteErrorMsg.innerText =
                    body.error || "An error occurred";
            } else if (status >= 200 && status < 300) {
                deleteSuccess.classList.remove("hidden");
                deleteSuccess.classList.add("shown");

                deleteToTable(id);
            }
        })
        .catch((error) => {
            createError.classList.remove("hidden");
            createErrorMsg.innerText = error.message;
        });
}

function addToTable(id, name, precio, localidad){
    tableInsert.insertAdjacentHTML("afterbegin", `
        <tr id="Producto-${id}">
            <th scope="row">${name}</th>
            <td>${precio}</td>
            <td>${localidad}</td>
            <td>
                <button onclick="deleteProducto(${id})" id="deleted-producto-{{id}}" class="delete-button">Eliminar</button>
            </td>
        </tr>
    `)
}

function deleteToTable(id){
    tableRow = document.getElementById(`Producto-${id}`);
    tableRow.classList.add('hidden');
}

function resultTexts()
{
    createSuccess.style.display = "none"
    createError.style.display = "none"
    deleteError.style.display = "none"
    deleteSuccess.style.display = "none"
}

