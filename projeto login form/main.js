const input = document.querySelector("#input")
const button = document.querySelector("#button")



button.addEventListener("click", (e) => {
    e.preventDefault()
    const value = input.value

    console.log(value)

    console.log(valueJson)

    fetch("db.json")
    .then(response => response.json())
    .then(data => {
        // Adicionando um novo usuário ao JSON existente
        data.users.push({ nome: value });

        // Convertendo o objeto JSON modificado de volta para uma string JSON
        const updatedJson = JSON.stringify(data);

        // Enviando o JSON atualizado para o servidor (simulado no exemplo)
        fetch("db.json", {
            method: "POST",
            body: updatedJson,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (response.ok) {
                console.log("Usuário adicionado com sucesso!");
            } else {
                console.error("Erro ao adicionar usuário.");
            }
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
        });
    })
    .catch(error => {
        console.error("Erro ao carregar o JSON:", error);
    });


    

    input.value = ""
})

// fetch("db.json").then((resp) => {
//     resp.json().then((data) => {
//         console.log(data);
//     })
// })