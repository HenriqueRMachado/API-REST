
const express = require('express') // utilização do express
const app = express()
const port = 3000 // define a porta do localhost

//Indica ao servior que iremos trabalhar com JSON 
app.use(express.json());

/*
    Simula um banco de dados
*/ 
let cursos = [
    { id: 1, name: "Engenharia de Software", CargaHoraria: "4000", Universidade: "Univille"},
    { id: 2, name: "Sistemas de Informação", CargaHoraria: "4000", Universidade: "USP"},
    { id: 3, name: "Psicologia", CargaHoraria: "3500", Universidade: "UFSC"},
    { id: 4, name: "Educação Física", CargaHoraria: "4000", Universidade: "Univille"},
    { id: 5, name: "Engenharia Química", CargaHoraria: "4500", Universidade: "UDESC"},
];

let alunos = [
    { id: 1, name: "Lucas", email: "lucas@gmail.com", matricula: 2983428374, telefone: 4002-8922},
    { id: 2, name: "Henrique", email: "henrique@gmail.com", matricula: 234234267, telefone: 4002-8922},
    { id: 3, name: "Marcelo", email: "marcelo@gmail.com", matricula: 3284237843, telefone: 4002-8922},
    { id: 4, name: "Camilli", email: "camilli@gmail.com", matricula: 7394237642, telefone: 4002-8922},
    { id: 5, name: "Gustavo", email: "gustavo@gmail.com", matricula: 9834826344, telefone: 4002-8922},
];

let professores = [
    {id: 1, nome: "roberson", periodo: "1 semestre", disciplina: "matematica discreta"},
    {id: 2, nome: "andressa", periodo: "3 semestre", disciplina: "desenvolvimento web"},
    {id: 3, nome: "andrei", periodo: "2 e 3 semestre", disciplina: "banco de dados"},
    {id: 4, nome: "lucia", periodo: "5 e 6 semestre", disciplina: "rede de computadores"},
    {id: 4, nome: "marcos", periodo: "3 e 4 semestre", disciplina: "algoritmo"},
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
    const curso = cursos.find(curso => curso.id === id);


    //se o item existir, retorna com status 200
    //se não existir, retorna status 404 com uma mensagem de erro

    if (curso) {

        const response = cursos.map(curso => ({
        ...curso,
        link: generationItemLink(curso),
    }));

        res.status(200).json(response[id - 1]);
    } else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});

// Endpoint para adicionar um novo item, método POST
app.post('/curso', (req, res) => {

    //Validação para garantir que o campo 'name' não seja vazio
    if (!req.body.name || req.body.name.trim() === "") {
        return res.status(422).json({ message: "O campo 'name' não pode ser vazio." });
    }
    //os arrays tem uma propriedade chamada length... essa propriedade calcula o tamanho
    //do meu vetor e retorna ele em formato de inteiro...
    const newItem = { id: cursos.length + 1, ...req.body}
    //push insere um novo item no vetor...
    cursos.push(newItem);
    res.status(201).json(newItem);
});

//Endpoint para apagar um item, método DELETE
app.delete('/curso/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cursos.findIndex(curso => curso.id === id);
    if(index !== -1) {
        //desafio remover o item do array
        cursos.splice(index, 1);
        res.status(200).json({mensage: "Item removido!"});
    } else {
        res.status(404).json({mensage: "Item não encontrado"});
    }
});

//Endpoint para atualizar itens da lista, método PUT

app.put('/curso/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cursos.findIndex(curso => curso.id === id);
    
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




//Mapa de itens
function generationItemLink(aluno) {
    return {
        self: { href: `/aluno/${aluno.id}`},
        update: { href: `/aluno/${aluno.id}`, method: "PUT"},
        delete: { href: `/aluno/${aluno.id}`, method: "DELETE"}
    }
}

//Endpoint para buscar todos os itens da lista, método GET
app.get('/aluno', (req, res) => {
    const response = alunos.map(aluno => ({
        ...aluno,
        link: generationItemLink(aluno),
    }));
    res.status(200).json(response);
});

//Endpoint para buscar um item específico pelo ID, método GET
app.get('/aluno/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const aluno = alunos.find(aluno => aluno.id === id);

    //3 - se o item existir, retorna com status 200
    //se não existir, retorna status 404 com uma mensagem de erro

    if (aluno) {

        const response = alunos.map(aluno => ({
        ...aluno,
        link: generationItemLink(aluno),
    }));

        res.status(200).json(response[id - 1]);
    } else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});

// Endpoint para adicionar um novo item, método POST
app.post('/aluno', (req, res) => {
    //os arrays tem uma propriedade chamada length... essa propriedade calcula o tamanho
    //do meu vetor e retorna ele em formato de inteiro...
    const newItem = { id: alunos.length + 1, ...req.body}
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
