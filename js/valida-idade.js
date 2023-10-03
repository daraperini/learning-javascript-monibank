export default function ehMaiorDeIdade(campo) {
  const dataNascimento = new Date(campo.value);
  if (!validaIdade(dataNascimento)) {
    campo.setCustomValidity("O usuário não é maior de idade");
  } else {
    campo.setCustomValidity("")
  }
}

function validaIdade(data) {
  const dataAtual = new Date(); //pega a data do momento atual que estamos
  const dataMais18 = new Date(
    data.getUTCFullYear() + 18,
    data.getUTCMonth(),
    data.getUTCDate()
  ); //pega a data de nascimento inserida no HTML e soma 18

  return dataAtual >= dataMais18; //verifica se a data atual é igual ou maior a data de nascimento + 18
}
