class Bffr {
  constructor(init, count, {dynamic = false} = {}) {
    this._makeBuffer = typeof init === 'function' ? init : () => new ArrayBuffer(init);

    const buffers = Array(count);
    for (let i = 0; i < count; i++) {
      buffers[i] = this._makeBuffer();
    }
    this.buffers = buffers;
    this.dynamic = dynamic;
  }

  alloc() {
    if (this.buffers.length > 0) {
      return this.buffers.pop();
    } else if (this.dynamic) {
      return this._makeBuffer();
    } else {
      return null;
    }
  }

  free(buffer) {
    this.buffers.push(buffer);
  }
}

const bffr = (init, count, options) => new Bffr(init, count, options);
module.exports = bffr;
