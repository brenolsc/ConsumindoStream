// Streams: Entendendo como receber os dados de uma stream de leitura e processar esses dados.
// Transformação: Recupera os dados de uma stream de leitura e transformar esses dados. Funciona como uma função intermediária entre leitura e escrita.

/* Process.stdin -> stream de leitura
    .pipe(Process.stdout) -> stream de escrita */

    import { Readable, Writable, Transform } from 'stream';

class oneToHundredStream extends Readable {
    index = 1
    
    _read () {
        const i = this.index++

        setTimeout(() => {
            if(i>100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed))) // Buffer -> transicionar dados entre streams
    }
}

class MultiplyByTenStream extends Writable {
    _write (chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}
new oneToHundredStream()
.pipe (new InverseNumberStream())
    .pipe(new MultiplyByTenStream())