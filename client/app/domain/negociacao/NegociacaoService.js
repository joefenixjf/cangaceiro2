class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana(cb) {
    return this._http.get("negociacoes/semana").then(
      (dados) => {
        const negociacoes = dados.map(
          (objeto) =>
            new Negociacao(
              new Date(objeto.data),
              objeto.quantidade,
              objeto.valor
            )
        );
        return negociacoes;
      },
      (err) => {
        throw new Error("não foi possível obter as negociações");
      }
    );

    // return new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.open("GET", "negociacoes/semana");
    //   xhr.onreadystatechange = () => {
    //     if (xhr.readyState == 4) {
    //       if (xhr.status == 200) {
    //         console.log("Obtendo as neg");
    //         const negociacoes = JSON.parse(xhr.responseText).map(
    //           (objeto) =>
    //             new Negociacao(
    //               new Date(objeto.data),
    //               objeto.quantidade,
    //               objeto.valor
    //             )
    //         );
    //         resolve(negociacoes);
    //       } else {
    //         console.log(xhr.responseText);
    //         console.log("não funcionou");
    //         reject("Não foi possível obter as negociações da semana");
    //       }
    //     }
    //   };
    //   xhr.send();
    // });
  }
}
