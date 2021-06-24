let goWin = {
  handleSubmit(event){
    event.preventDefault();

    let send = true;
    let inputs = document.querySelectorAll(".campo");

    goWin.clearError();

    for(let i=0; i<inputs.length; i++){
      let input = inputs[i];
      let check = goWin.checkInput(input);
      
      if(check!== true){
        send = false;
        goWin.showError(input, check);
      }
    }
    if(send){
      dados.push({'Nome: ': document.querySelectorAll(".campo")[0].value},
                  {'Email: ': document.querySelectorAll(".campo")[1].value},
                  {'Senha: ': 'Confidencial'});
      console.log(dados);
      setTimeout(()=>{form.submit()}, 5000);
    }
  },
  checkInput:(input)=>{
    let rules = input.getAttribute("data-rules");

    if(rules!==null){
      rules = rules.split("|");
      for(let k in rules){
        let rDetails = rules[k].split("=");
        switch(rDetails[0]){
          case "required":
            if(input.value === ''){
              return "Este campo é obrigatório";
            }
            break;
          case "min":
            if(input.value.length < rDetails[1]){
              return "Este campo tem que ter no mínimo " +rDetails[1]+ " caracteres";
            }
            break;
          case "email":
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            //expressão regular
            if(!regex.test(input.value.toLowerCase())){
            return "Email inválido";
            }
            break;
          case "password":
            let p1 = document.getElementsByTagName("input")[2].value;
            let p2 = document.getElementsByTagName("input")[3].value;
            if(p2 !== p1){
              return "Senhas diferentes";
            }
            break;
        }
      }
    }
    return true;
  },
  showError:(input, error)=>{
    input.style.borderColor = 'red';

    let elError = document.createElement("div");

    elError.classList.add("error");
    elError.innerHTML = error;
    input.parentElement.insertBefore(elError, input.nextElementSibling);
  },
  clearError:()=>{
    let colorError = document.querySelectorAll(".campo");
    for(let i=0; i<colorError.length; i++){
      colorError[i].style = '';
    }

    let elErrors = document.querySelectorAll(".error");
    for(let i=0; i<elErrors.length; i++){
      elErrors[i].remove();
    }
  }
}

let form = document.querySelector(".validator");
let dados = [];

form.addEventListener('submit', goWin.handleSubmit);