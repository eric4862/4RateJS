const express = require('express');
const app = express();

const usuariosRoutes = require('./routes/usuarios');
const avaliacoesRoutes = require('./routes/avaliacoes');

app.use(express.json());

// rotas
app.use('/usuarios', usuariosRoutes);
app.use('/avaliacoes', avaliacoesRoutes);

app.get('/', (req, res) => {
    res.send('API 4Rate funcionando');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
