var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
   keyPath: './certs/2baba0f261-private.pem.key',
  certPath: './certs/2baba0f261-certificate.pem.crt',
    caPath: './certs/rootCA.pem',
  clientId: 'SensorBpm',
  region: 'us-west-2',
  host: 'a2i3t443pzz5ck-ats.iot.us-east-2.amazonaws.com'
});

// Estabelece conexão do dispositivo com o serviço iot amazon
device.on('connect', function() {
  console.log('Dispositivo conectado')
});

function publicarMensagem(batimentos) {
  device.publish('enviar_topico', JSON.stringify({ bpm: batimentos}));
  console.log('Mensagem enviada')
}

// Simulador de batimentos cardíacos
let minBpm = 40;
let maxBpm = 100;

// Gera um valor de batimento cardíaco aleatório de 2 em 2 segundos. Caso menor que 60bpm ou maior que 90bpm, é enviado para fila o valor
function timeout() {
    setTimeout(function () {
        let batimentos = Math.floor(Math.random() * (maxBpm - minBpm + 1)) + minBpm;
        if (batimentos < 60 || batimentos > 90) {
          publicarMensagem(batimentos);
        }
        timeout();
    }, 2000);
}

timeout();
