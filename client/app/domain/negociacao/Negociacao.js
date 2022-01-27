class Negociacao {
  constructor(_data, _quantidade, _valor) {
    Object.assign(this, {
      _quantidade,
      _valor,
    });
    (this._data = _data.getTime()), // data atual
      Object.freeze(this);
  }
  get Volume() {
    return this._quantidade * this._valor;
  }
  get Data() {
    return new Date(this._data);
  }
  get Quantidade() {
    return this._quantidade;
  }
  get Valor() {
    return this._valor;
  }
}
