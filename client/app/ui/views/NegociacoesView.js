class NegociacoesView extends View {
  template(model) {
    return `<table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>DATA</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
          <th>VOLUME</th>
        </tr>
      </thead>

      <tbody>${model
        .paraArray()
        .map((negociacao) => {
          return `
        <tr>
            <td>${DateConverter.paraTexto(negociacao.Data)}</td>
            <td>${negociacao.Quantidade}</td>
            <td>${negociacao.Valor}</td>
            <td>${negociacao.Volume}</td>
            </tr>`;
        })
        .join("")}</tbody>

      <tfoot>
        <tr>
          <td colspan="3"></td>
          <td>${model.VolumeTotal}</td>
        </tr></tfoot>
    </table>;
    `;
  }
}
