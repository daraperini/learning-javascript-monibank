import ehUmCpf from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
const formulario = document.querySelector("[data-formulario]");
const camposDoFormulario = document.querySelectorAll("[required]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault(); //não faz reload

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    window.location.href = "./abrir-conta-form-2.html"; //redireciona para a última parte do formulário (parte da foto)
})

camposDoFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo)); //blur = tirar foco do imput
  campo.addEventListener("invalid", (evento) => evento.preventDefault()); //tira o popup padrão de erro quando não completa corretamente os campos de imput
});

const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError",
];

const mensagensDeErro = {
  nome: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "Por favor, preencha um nome válido.",
  },
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
    tooShort: "Por favor, preencha um e-mail válido.",
  },
  rg: {
    valueMissing: "O campo de RG não pode estar vazio.",
    patternMismatch: "Por favor, preencha um RG válido.",
    tooShort: "O campo de RG não tem caractéres suficientes.",
  },
  cpf: {
    valueMissing: "O campo de CPF não pode estar vazio.",
    patternMismatch: "Por favor, preencha um CPF válido.",
    customError: "O CPF digitado não existe.",
    tooShort: "O campo de CPF não tem caractéres suficientes.",
  },
  aniversario: {
    valueMissing: "O campo de data de nascimento não pode estar vazio.",
    customError: "Você deve ser maior que 18 anos para se cadastrar.",
  },
  termos: {
    valueMissing: "Você deve aceitar nossos termos antes de continuar.",
  },
};

function verificaCampo(campo) {
  let mensagem = "";

  if (campo.name == "cpf" && campo.value.length >= 11) {
    ehUmCpf(campo);
  }
  if (campo.name == "aniversario" && campo.value != "") {
    ehMaiorDeIdade(campo);
  }

  tiposDeErro.forEach(erro => {
    if(campo.validity[erro]) { //se o erro que está sendo percorrido pelo forEach for true
        mensagem = mensagensDeErro[campo.name][erro]; //pega o item na lista mensagensDeErro que tenha o nome igual ao nome do campo e procura o erro com o mesmo nome do erro que está passando pelo looping
        console.log(mensagem);
    }
  })
  const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
  const validadorDeInput = campo.checkValidity();

  if(!validadorDeInput) {
    mensagemErro.textContent = mensagem;
  } else {
    mensagemErro.textContent = "";
  }

  console.log(campo.validity);
}
