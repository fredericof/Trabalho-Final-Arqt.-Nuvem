var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'us-east-1'
});

exports.handler = function(event, context) {
    
    // Valor do batimento cardíaco
    let bpm = JSON.parse(event.Records[0].body).bpm;

    var paramsBpmAbaixo = {
        Destination: {
            ToAddresses: ["fredericofbh@gmail.com"]
        },
        Message: {
            Body: {
                Text: {
                    Data: "Batimento cardíaco abaixo do normal"
                }
            },
            Subject: {
                Data: "Alerta batimento cardíaco do paciente"
            }
        },
        Source: "fredericofbh@gmail.com"
    };
    
    var paramsBpmAcima = {
        Destination: {
            ToAddresses: ["fredericofbh@gmail.com"]
        },
        Message: {
            Body: {
                Text: {
                    Data: "Batimento cardíaco acima do normal"
                }
            },
            Subject: {
                Data: "Alerta batimento cardíaco do paciente"
            }
        },
        Source: "fredericofbh@gmail.com"
    };
    
    // Função para enviar email
    function enviaEmail(eParams) {
        console.log('===Enviando EMAIL===');
        var email = ses.sendEmail(eParams, function(err, data){
            if(err) console.log(err);
            else {
                console.log("===EMAIL Enviado===");
                console.log(data);
    
    
                console.log("EMAIL CODE END");
                console.log('EMAIL: ', email);
                context.succeed(event);
    
            }
        });
    }
    
    // Verifica se o batimento cardíaco está abaixo ou acima do normal, caso verdadeiro, é enviado um e-mail
    if (bpm < 60) {
        enviaEmail(paramsBpmAbaixo)
    }
    else if (bpm > 90) {
        enviaEmail(paramsBpmAcima)
    }

};
