var selectedRow = null;

// Show Alerts
function showAlert(message, className){
    const div=document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);    
}

//Clear All Fields
function clearFields(){
    document.querySelector("#cnpj").value = "";
    document.querySelector("#razaoSocial").value = "";
    document.querySelector("#dataA").value = "";
}

//Add Data
document.querySelector("#cadastro-field").addEventListener("submit", (e) => {
    e.preventDefault();

    //Get Form Values
    const cnpj = document.querySelector("#cnpj").value;
    const razaoSocial = document.querySelector("#razaoSocial").value;
    const dataA = document.querySelector("#dataA").value;
    
    //validate
    if(cnpj == "" || razaoSocial == "" || dataA == ""){
        showAlert("Please fill in all fields" , "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#cadastro-list");
            const row = document.createElement ("tr");

            row.innerHTML = `
                <td>${cnpj}</td>
                <td>${razaoSocial}</td>
                <td>${dataA}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
                <a href="#" class="btn btn-danger btn-sm delete">Deletar</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Enviado com sucesso!", "success");
        }
        else{
            selectedRow.children[0].textContent = cnpj;
            selectedRow.children[1].textContent = razaoSocial;
            selectedRow.children[2].textContent = dataA;
            selectedRow = null;
            showAlert("Editado com sucesso!" , "info");
        }

        clearFields();
    }
});

// Edit Data

document.querySelector("#cadastro-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#cnpj").value = selectedRow.children[0].textContent;
        document.querySelector("#razaoSocial").value = selectedRow.children[1].textContent;
        document.querySelector("#dataA").value = selectedRow.children[2].textContent;
    }
});


//Delete Data

document.querySelector("#cadastro-list").addEventListener("click", (e) => {
    const target = e.target; 
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Deletado com sucesso!" , "danger");
    }
});

