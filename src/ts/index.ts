const form = document.querySelector("#search-cep > form");
const input: HTMLInputElement | null  = document.querySelector("#input-cep");
const result = document.querySelector("#result");


form?.addEventListener("submit", async(event)=>{
event.preventDefault();

if(!input || !result)  return;

const newCep = input.value;

if(newCep.length < 8){
     alert("Informe um CEP válido com 9 digítos.")
    return;
}


const resultadoDaApi = await fetch(`https://viacep.com.br/ws/${newCep}/json/`);
const dados =await resultadoDaApi.json();

const informacoes = {
    localidade: dados.localidade,
    logradouro: dados.logradouro, 
    bairro: dados.bairro,
    estado: dados.estado,
    regiao: dados.regiao,
    ddd: dados.ddd
}

if(!informacoes.bairro || !informacoes.logradouro){
    informacoes.bairro = "Não defnido pelo sitema";
    informacoes.logradouro = "Não definido pelo sistema"
}



result.innerHTML=`
<div class="card-pesquisa">
          <label for="localidade">Cidade</label>
          <input type="text" id="localidade" value="${informacoes.localidade}" disabled />

          <label for="logradouro">Logradouro</label>
          <input type="text" id="logradouro" value="${informacoes.logradouro}" disabled />

          <label for="ddd">DDD</label>
          <input type="text" id="ddd" value="${informacoes.ddd}" disabled />

          <label for="bairro">Bairro</label>
          <input type="text" id="bairro" value="${informacoes.bairro}" disabled />

          <label for="estado">Estado</label>
          <input type="text" id="estado" value="${informacoes.estado}" disabled />

          <label for="regiao">Região</label>
          <input type="text" id="regiao" value="${informacoes.regiao}" disabled />
        </div>

`

});