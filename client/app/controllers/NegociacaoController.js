class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._inputData = $("#data");
    this._inputQtd = $("#quantidade");
    this._inputValor = $("#valor");
    this._negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView("#negociacoes"),
      "adiciona",
      "esvazia"
    );
    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView("#mensagemView"),
      "texto"
    );
    this._service = new NegociacaoService();
  }
  adiciona(event) {
    try {
      event.preventDefault();
      this._negociacoes.adiciona(this._criaNegociacao());
      this._mensagem.texto = "Negociação adicionada com sucesso";
      this._limpaFormulario();
    } catch (err) {
      console.log(err);
      console.log(err.stack);
      if (err instanceof DataInvalidaException) {
        this._mensagem.texto = err.message;
      } else {
        this._mensagem.texto =
          "Um erro não esperado aconteceu. Entre em contato com o suporte";
      }
    }
  }
  _limpaFormulario() {
    document.querySelector(".form").reset();
    this._inputData.focus();
  }
  _criaNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this._inputData.value),
      parseInt(this._inputQtd.value),
      parseFloat(this._inputValor.value)
    );
  }
  apaga() {
    this._negociacoes.esvazia();
    this._mensagem.texto = "Neogociações apagadas com sucesso";
  }
  importaNegociacoes() {
    const promise = this._service.obterNegociacoesDaSemana().then(
      (negociacoes) => {
        negociacoes.forEach((negociacao) => {
          this._negociacoes.adiciona(negociacao);
        });
        this._mensagem.texto = "Negociações importadas com sucesso";
      },
      (err) => (this._mensagem = texto = err)
    );
  }
}