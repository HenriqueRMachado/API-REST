
const express = require('express') // utilização do express
const app = express()
const port = 3000 // define a porta do localhost

//Indica ao servior que iremos trabalhar com JSON 
app.use(express.json());

// /*
//     Simula um banco de dados
// */ 

let cursos = [
    { id: 1, name: "Engenharia de Software", CargaHoraria: "4000", Universidade: "Univille"},
    { id: 2, name: "Sistemas de Informação", CargaHoraria: "4000", Universidade: "USP"},
    { id: 3, name: "Psicologia", CargaHoraria: "3500", Universidade: "UFSC"},
    { id: 4, name: "Educação Física", CargaHoraria: "4000", Universidade: "Univille"},
    { id: 5, name: "Engenharia Química", CargaHoraria: "4500", Universidade: "UDESC"},
];

let alunos = [
    { id: 1, name: "Lucas", email: "lucas@gmail.com", matricula: "2983428374", telefone: "4002-8922"},
    { id: 2, name: "Henrique", email: "henrique@gmail.com", matricula: "234234267", telefone: "4002-8922"},
    { id: 3, name: "Marcelo", email: "marcelo@gmail.com", matricula: "3284237843", telefone: "4002-8922"},
    { id: 4, name: "Camilli", email: "camilli@gmail.com", matricula: "7394237642", telefone: "4002-8922"},
    { id: 5, name: "Gustavo", email: "gustavo@gmail.com", matricula: "9834826344", telefone: "4002-8922"},
];

let professores = [
    {id: 1, name: "Roberson", periodo: "1 semestre", disciplina: "Matematica Discreta"},
    {id: 2, name: "Andressa", periodo: "3 semestre", disciplina: "Desenvolvimento Web"},
    {id: 3, name: "Andrei", periodo: "2 e 3 semestre", disciplina: "Banco de Dados"},
    {id: 4, name: "Lucia", periodo: "5 e 6 semestre", disciplina: "Rede de Computadores"},
    {id: 5, name: "Marcos", periodo: "3 e 4 semestre", disciplina: "Algoritmo"},
];





// GPS DE ITENS DO ENDPOINT DE PROFESSORES

function linkprofessores(prof) {
    return {
        self: { href: `/professores/${prof.id}`},
        update: { href: `/professores/${prof.id}`, method: "PUT"},
        delete: { href: `/professores/${prof.id}`, method: "DELETE"},
        post: {href: `/professores/${prof.id}`, method: "POST"}
    }
};

// GET ALL

app.get('/professores', (req, res) => {
    const response = professores.map(prof => ({
        ...prof,
        link: linkprofessores(prof),
    }));
    res.status(200).json(response);
});


// VERBO get do ep professores -- PEGA PELO ID ESPECIFICADO NA URL
app.get('/professores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const prof = professores.find(prof => prof.id === id);

    if (prof) {

        const response = professores.map(prof => ({
        ...prof,
        link: linkprofessores(prof),
    }));

        res.status(200).json(response[id - 1]);
    } else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});


app.post('/professores', (req, res) => {

    //Validação para garantir que o campo 'name' não seja vazio
    if (!req.body.name) {
        return res.status(422).json({ message: "O campo 'name' não pode ser vazio." });
    }
    else if (!req.body.periodo) {
        return res.status(422).json({ message: "O campo 'periodo' não pode ser vazio." });
    }
    else if (!req.body.disciplina ) {
        return res.status(422).json({ message: "O campo 'disciplina' não pode ser vazio." });
    }
    //os arrays tem uma propriedade chamada length... essa propriedade calcula o tamanho
    //do meu vetor e retorna ele em formato de inteiro...
    const newItem = { id: professores.length + 1, ...req.body}
    //push insere um novo item no vetor...
    professores.push(newItem);
    res.status(201).json(newItem);
});


//Endpoint para apagar um item, método DELETE
app.delete('/professores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = professores.findIndex(prof => prof.id === id);
    if(index !== -1) {
        //desafio remover o item do array
        professores.splice(index, 1);
        res.status(200).json({mensage: "Item removido!"});
    } else {
        res.status(404).json({mensage: "Item não encontrado"});
    }
});

//Endpoint para atualizar itens da lista, método PUT

//RUSSIA = PUTin

app.put('/professores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = professores.findIndex(prof => prof.id === id);
    
    // 8 - Validação para garantir que o campo 'name' não seja vazio
    if (!req.body.name || req.body.name.trim() === "") {
        return res.status(422).json({ message: "O campo 'name' não pode ser vazio." });
    }

    if (index !== -1) {
        professores[index] = {id, ...req.body}
        res.status(200).json(professores[index]);
    } else {
        res.status(404).json({ message: "Item não encontrado!"});
    }

});














// GPS DE ITENS

function linkcurso(curso) {
    return {
        self: { href: `/curso/${curso.id}`},
        update: { href: `/curso/${curso.id}`, method: "PUT"},
        delete: { href: `/curso/${curso.id}`, method: "DELETE"},
        post: {href: `/curso/${curso.id}`, method: "POST"}
    }
};


// ENDPOINT DO BANCO DE DADOS CURSOS

//Endpoint para buscar todos os itens da lista, método GET

app.get('/curso', (req, res) => {
    const response = cursos.map(curso => ({
        ...curso,
        link: linkcurso(curso),
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
        link: linkcurso(curso),
    }));

        res.status(200).json(response[id - 1]);
    } else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});

// Endpoint para adicionar um novo item, método POST
app.post('/curso', (req, res) => {

    //Validação para garantir que o campo 'name' não seja vazio
    if (!req.body.name) {
        return res.status(422).json({ message: "O campo 'name' não pode ser vazio." });
    }
    else if (!req.body.CargaHoraria) {
        return res.status(422).json({ message: "O campo 'CargaHoraria' não pode ser vazio." });
    }
    else if (!req.body.Universidade ) {
        return res.status(422).json({ message: "O campo 'Universidade' não pode ser vazio." });
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
        res.status(200).json(cursos[index]);
    } else {
        res.status(404).json({ message: "Item não encontrado!"});
    }

});



// ENDPOINT


// VERIFICAR ESSES METODOS DO ENDPOINT DO ALUNOS

//Mapa de itens
function linkaluno(aluno) {
    return {
        self: { href: `/aluno/${aluno.id}`},
        update: { href: `/aluno/${aluno.id}`, method: "PUT"},
        delete: { href: `/aluno/${aluno.id}`, method: "DELETE"}
    }
};

//Endpoint para buscar todos os itens da lista, método GET
app.get('/aluno', (req, res) => {
    const response = alunos.map(aluno => ({
        ...aluno,
        link: linkaluno(aluno),
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
        link: linkaluno(aluno),
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
});
