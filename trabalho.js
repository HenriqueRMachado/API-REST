const express = require('express')
const app = express()
const port = 3000

//Indica ao servior que iremos trabalhar com JSON 
app.use(express.json());

/*
    Simula um banco de dados
*/ 
let cursos = [
    { id: 1, name: "Engenharia de Software"},
    { id: 2, name: "Sistemas de Informação"},
];

//Mapa de itens
function generationItemLink(curso) {
    return {
        self: { href: `/curso/${curso.id}`},
        update: { href: `/curso/${curso.id}`, method: "PUT"},
        delete: { href: `/curso/${curso.id}`, method: "DELETE"}
    }
}


//Endpoint para buscar todos os itens da lista, método GET
app.get('/curso', (req, res) => {
    const response = cursos.map(curso => ({
        ...curso,
        link: generationItemLink(curso),
    }));
    res.status(200).json(response);
});

//Endpoint para buscar um item específico pelo ID, método GET
app.get('/curso/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const curso = cursos.find(item => item.id === id);


    //se o item existir, retorna com status 200
    //se não existir, retorna status 404 com uma mensagem de erro

    if (curso) {

        const response = cursos.map(curso => ({
        ...curso,
        link: generationItemLink(curso),
    }));

        res.status(200).json(response);
    } else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});

// Endpoint para adicionar um novo item, método POST
app.post('/curso', (req, res) => {
    //os arrays tem uma propriedade chamada length... essa propriedade calcula o tamanho
    //do meu vetor e retorna ele em formato de inteiro...
    const newItem = { id: cursos.length + 1, ...req.body}
    //push insere um novo item no vetor...
    cursos.push(newItem);
    res.status(201).json(newItem);
});

//Endpoint para apagar um item, método DELETE
app.delete('/cursos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cursos.findIndex(item => item.id === id);
    if(index !== -1) {
        //desafio remover o item do array
        items.splice(index, 1);
        res.status(200).json({mensage: "Item removido!"});
    } else {
        res.status(404).json({mensage: "Item não encontrado"});
    }
});

//Endpoint para atualizar itens da lista, método PUT

app.put('/curso/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cursos.findIndex(item => item.id === id);
    
    // 8 - Validação para garantir que o campo 'name' não seja vazio
    if (!req.body.name || req.body.name.trim() === "") {
        return res.status(422).json({ message: "O campo 'name' não pode ser vazio." });
    }

    if (index !== -1) {
        cursos[index] = {id, ...req.body}
        res.status(200).json(alunos[index]);
    } else {
        res.status(404).json({ message: "Item não encontrado!"});
    }

});

//Recurso alunos


let alunos = [
    { id: 1, name: "Lucas"},
    { id: 2, name: "Henrique"},
    { id: 3, name: "Marcelo"},
    { id: 4, name: "Camilli"},
    { id: 5, name: "Gustavo"},
];
//Endpoint para buscar todos os itens da lista, método GET
app.get('/aluno', (req, res) => {
    res.status(200).json(alunos);
});

//Endpoint para buscar um item específico pelo ID, método GET
app.get('/aluno/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const aluno = alunos.find(aluno => aluno.id === id);

    //3 - se o item existir, retorna com status 200
    //se não existir, retorna status 404 com uma mensagem de erro

    if (aluno) {
        res.status(200).json(aluno);
    } else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});

// Endpoint para adicionar um novo item, método POST
app.post('/aluno', (req, res) => {
    //os arrays tem uma propriedade chamada length... essa propriedade calcula o tamanho
    //do meu vetor e retorna ele em formato de inteiro...
    const newItem = { id: items.length + 1, ...req.body}
    //push insere um novo item no vetor...
    alunos.push(newItem);
    res.status(201).json(newItem);
});

//Endpoint para apagar um item, método DELETE
app.delete('/aluno/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = alunos.findIndex(aluno => aluno.id === id);
    if(index !== -1) {
        //desafio remover o item do array
        alunos.splice(index, 1);
        res.status(200).json({mensage: "Item removido!"});
    } else {
        res.status(404).json({mensage: "Item não encontrado"});
    }
});

//Endpoint para atualizar itens da lista, método PUT

app.put('/aluno/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = alunos.findIndex(aluno => aluno.id === id);

    // 8 - Validação para garantir que o campo 'name' não seja vazio
    if (!req.body.name || req.body.name.trim() === "") {
        return res.status(422).json({ message: "O campo 'name' não pode ser vazio." });
    }

    if (index !== -1) {
        alunos[index] = {id, ...req.body}
        res.status(200).json(alunos[index]);
    } else {
        res.status(404).json({ message: "Item não encontrado!"});
    }

});

app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
})
