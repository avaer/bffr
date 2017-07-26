class Bffr {
  constructor(init, count) {
    const _makeBuffer = typeof init === 'function' ? init : () => new ArrayBuffer(init);

    const buffers = Array(count);
    for (let i = 0; i < count; i++) {
      buffers[i] = _makeBuffer();
    }
    this.buffers = buffers;
  }

  alloc() {
    return this.buffers.pop();
  }

  free(buffer) {
    this.buffers.push(buffer);
  }
}

const bffr = (init, count) => new Bffr(init, count);
module.exports = bffr;
