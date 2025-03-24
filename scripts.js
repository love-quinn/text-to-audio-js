//Seleção de elementos
const selecaoVoz = document.getElementById('selecao-voz');
const entradaDeTexto = document.getElementById('entrada-de-texto');
const botaoOuvir = document.getElementById('ouvir-btn');
const botaoBaixarTexto = document.getElementById('baixar-texto-btn');
const botaoBaixarAudio = document.getElementById('baixar-audio-btn');
const uploadArquivo = document.getElementById('upload-arquivo');


//Iniciar a API de voz do Google
const fala = new SpeechSynthesisUtterance();

//Preencher o select
const atualizarValores = () => {
    vozesDisponiveis = window.speechSynthesis.getVoices();

    console.log(vozesDisponiveis);

    fala.voice = vozesDisponiveis[0];

    vozesDisponiveis.forEach((voz, index) => {
        const opcao = document.createElement('option');
        opcao.value = index;
        opcao.textContent = voz.name;
        selecaoVoz.appendChild(opcao);
    });
};

window.speechSynthesis.onvoiceschanged = atualizarValores;

selecaoVoz.addEventListener('change', () => {
    fala.voice = vozesDisponiveis[selecaoVoz.value];
});

botaoOuvir.addEventListener('click', () => {
    console.log(entradaDeTexto.value);
    fala.text = entradaDeTexto.value;
    window.speechSynthesis.speak(fala);
});

uploadArquivo.addEventListener('change', () => {
    const arquivo = uploadArquivo.files[0];

    if (arquivo) {
        const reader = new FileReader();
        reader.onload = (e) => {
            entradaDeTexto.value = e.target.result;
        };
        
        reader.readAsText(arquivo);
    }
});

botaoBaixarTexto.addEventListener('click', () => {
    const texto = entradaDeTexto.value;
    const blob = new Blob([fala.text], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'texto.txt';
    a.click();

    URL.revokeObjectURL(url);
});