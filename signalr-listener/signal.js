// signal.js
const signalR = require('@microsoft/signalr');

// Configuração da conexão SignalR
const connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5003/notificacaoHub')
    .withAutomaticReconnect([0, 2000, 5000, 10000, 30000]) // Tentativas de reconexão (ms)
    .configureLogging(signalR.LogLevel.Information)
    .build();

// Função para formatar e exibir mensagens recebidas
connection.on('ReceberNotificacao', (message) => {
    const timestamp = new Date().toLocaleTimeString();
    
    console.log('\n=== Nova Notificação Recebida ===');
    console.log(`[${timestamp}] Tipo: Notificação`);
    
    try {
        // Tenta fazer parse como JSON para exibir de forma formatada
        const jsonObj = typeof message === 'object' ? message : JSON.parse(message);
        console.log('Conteúdo: ');
        console.log(JSON.stringify(jsonObj, null, 2));
    } catch (error) {
        // Se não for JSON, exibe como string normal
        console.log('Conteúdo: ' + message);
    }
    
    console.log('==============================');
});

// Gerenciamento de eventos de conexão
connection.onreconnecting((error) => {
    console.log(`Tentando reconectar... Erro: ${error ? error.message : 'Desconhecido'}`);
});

connection.onreconnected((connectionId) => {
    console.log(`Reconectado com sucesso! ID: ${connectionId}`);
});

connection.onclose((error) => {
    console.log(`Conexão fechada. ${error ? 'Erro: ' + error.message : ''}`);
});

// Iniciar a conexão com o signalR
async function start() {
    try {
        await connection.start();
        console.log('Conectado ao hub SignalR!');
        console.log('Escutando por notificações em: http://localhost:5003/notificacaoHub');
        console.log('Aguardando mensagens...');
    } catch (err) {
        console.log(`Erro ao conectar: ${err.message}`);
        console.log('Tentando reconectar em 5 segundos...');
        setTimeout(start, 5000);
    }
}

// Capturar CTRL+C para encerrar a aplicação corretamente
process.on('SIGINT', async () => {
    console.log('\nEncerrando conexão...');
    await connection.stop();
    console.log('Conexão encerrada. Saindo...');
    process.exit(0);
});

// Iniciar o serviço
console.log('Iniciando serviço de escuta SignalR...');
start();