const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    // Aqui você pode adicionar o código para verificar o login no servidor
    res.send("Login Successful!");
    // Após a verificação, você pode redirecionar o usuário para outra página
});

app.post('/register', (req, res) => {
    // Aqui você pode adicionar o código para enviar os dados do registro para o servidor
    res.send("Registration Successful!");
});

app.post('/recover-password', (req, res) => {
    // Aqui você pode adicionar o código para enviar os dados de recuperação de senha para o servidor
    res.send("Password Recovery Email Sent!");
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
