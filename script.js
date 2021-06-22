let toWin = {
  handleSubmit:(event)=>{
    event.preventDefault();

    let send=true;
    let inputs = form.querySelectorAll("input");

    toWin.clearErrors();

    for(let i = 0; i < inputs.length; i++){
      let input = inputs[i];
      let check = toWin.checkInput(input);

      if(check !== true){
        send=false;
        toWin.showError(input, check);
      }
    }
    if(send){
      form.submit();
    }
  },
  checkInput:(input)=>{
    let rules = input.getAttribute("data-rules");

    if(rules!==null){
      rules = rules.split("|");
      for(let k in rules){
        let rDetails = rules[k].split("=");
        switch(rDetails[0]){
          case 'required':
            if(input.value === ''){
              return "Este campo é obrigatório"
            }
            break;
          case 'min':
            if(input.value.length < rDetails[1]){
              return "Este campo tem que ter no mínimo " +rDetails[1]+ " caracteres";
            }
            break;
          case 'email':
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if(!regex.test(input.value.toLowerCase())){
              return "Este email não é válido";
            }
            break;
          case 'password':
            if(document.getElementsByTagName("input")[2].value !== document.getElementsByTagName("input")[3].value){
              return "Senhas não conferem"
              }
        }
      }
    }
    return true;
  },
  showError: (input, error)=>{
    input.style.borderColor = 'red';

    let errorElement = document.createElement("div");

    errorElement.classList.add('error');
    errorElement.innerHTML = error;
    input.parentElement.insertBefore(errorElement, input.nextElementSibling);
  },
  clearErrors:()=>{
    let colorError = document.querySelectorAll("input");
    for(let i=0; i < colorError.length; i++){
      colorError[i].style = '';
    }

    let delElement = document.querySelectorAll(".error");
    for(let i=0; i < delElement.length; i++){
      delElement[i].remove();
    }
  }
}

let form = document.querySelector(".validator");

form.addEventListener('submit', toWin.handleSubmit);