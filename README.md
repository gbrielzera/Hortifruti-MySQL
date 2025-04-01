# Hortifruti-MySQL

# Dependências:

npm install mysql2 prompt-sync

npm install --save-dev typescript @types/node @types/prompt-sync (Talvez não seja necessário dependendo do seu ambiente)

npm install --save-dev @types/node

npm install -D typescript@next

# Passos para compilar e executar:

Executar o banco de dados em SQL

Alterar as configurações do seu MySQL no index.ts na 9 linha.

Com o MySQL aberto digite no terminal:

tsc index.ts (ou se não funcionar) npx tsc index.ts

Após compilar execute com:

node index.js
