# SignalR Notification Listener

Um serviço Node.js simples para monitorar e exibir notificações de um hub SignalR.

## Descrição

Este serviço se conecta a um hub SignalR específico e exibe no console todas as mensagens recebidas através do evento 'ReceberNotificacao'. O serviço foi projetado para ser uma ferramenta de diagnóstico e monitoramento para desenvolvedores que precisam verificar as notificações em tempo real.

## Funcionalidades

- Conecta-se automaticamente ao hub SignalR
- Exibe notificações recebidas no console
- Formata mensagens JSON para melhor visualização
- Reconexão automática com intervalos crescentes
- Gerenciamento adequado do encerramento da aplicação

## Pré-requisitos

- Node.js v12.0.0 ou superior
- npm (Node Package Manager)

## Instalação

1. Clone ou faça download deste repositório
2. Navegue até o diretório do projeto
3. Instale as dependências necessárias:

```bash
npm install @microsoft/signalr
```

## Configuração

O serviço está configurado para se conectar a `http://localhost:5003/notificacaoHub`. Se o seu hub estiver em outro endereço, edite a seguinte linha no arquivo `signal.js`:

```javascript
.withUrl('http://localhost:5003/notificacaoHub')
```

## Uso

Para iniciar o serviço, execute:

```bash
node signal.js
```

O serviço irá:

1. Tentar se conectar ao hub SignalR
2. Exibir uma mensagem de confirmação quando conectado
3. Mostrar todas as notificações recebidas no console
4. Tentar reconectar automaticamente em caso de desconexão

Para encerrar o serviço, pressione `Ctrl+C`.

## Saída do Console

O serviço exibirá mensagens como:

```
Iniciando serviço de escuta SignalR...
Conectado ao hub SignalR!
Escutando por notificações em: http://localhost:5003/notificacaoHub
Aguardando mensagens...

=== Nova Notificação Recebida ===
[14:25:30] Tipo: Notificação
Conteúdo:
{
  "id": 123,
  "tipo": "alerta",
  "mensagem": "Nova mensagem recebida",
  "data": "2025-03-06T14:25:30"
}
==============================
```

## Tratamento de Erros

O serviço inclui tratamento de erros para:

- Falhas na conexão inicial
- Perda de conexão durante a operação
- Mensagens em formato inválido

## Personalização

Você pode personalizar o comportamento do serviço modificando:

- Os intervalos de reconexão no array `withAutomaticReconnect([0, 2000, 5000, 10000, 30000])`
- O nível de logging com `.configureLogging(signalR.LogLevel.Information)`
- O formato de exibição das mensagens recebidas

## Resolução de Problemas

Se o serviço não conseguir se conectar:

1. Verifique se o servidor SignalR está em execução
2. Confirme se o endereço do hub está correto
3. Verifique se o firewall não está bloqueando a conexão
4. Confirme se o nome do método de notificação está correto ('ReceberNotificacao')

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.
