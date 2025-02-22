const button = document.querySelector("#update-user-button");
button.addEventListener("click", function (event) {
    event.preventDefault();
    const form = document.querySelector("#update-user-form");
    const formData = new FormData(form);
    const data = {};
    const token = document.querySelector("#csrf_token").value;
    formData.forEach((value,key) => {
        data[key] = value;
    })

    fetch(`/users/updateUserByFetch/${form.userId.value}`,{
        method: 'POST',
        headers:{
            "X-CSRFToken": token,
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => res.json())
        .then((value) => {
            console.log(value);
        }).catch((error) => {
            console.log(error)
        })
        alert(data)

})