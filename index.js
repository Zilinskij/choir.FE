const mysql = require('mysql2/promise');
const express = require('express')
const app = express()
const port = 3030

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json());

let connStr = {
    host: '127.0.0.1',
    port: 3306,
    database: 'les1',
    user: 'root',
    password: 'zilinskij',
}

async function getConn() {
    return await mysql.createConnection(connStr);
}

async function getPeople(req, res) {
    try {
        const c = await getConn();
        const [results, fields] = await c.query(
            'SELECT first_name, last_name, tembrname from people inner join tembr on id_tembr = tembrid order by tembrname'
        );
        res.send(results);
        await c.end();
    }
    catch (err) {
        console.log(err);
    }
}

async function getUkr(req, res) {
    try {
        const c = await getConn();
        const [results, fields] = await c.query(
            'SELECT * FROM les1.pisni order by nazva'
        );
        res.send(results);
        await c.end();
    }
    catch (err) {
        console.log(err);
    }
}

async function getGimn(req, res) {
    try {
        const c = await getConn();
        const [results, fields] = await c.query(
            'SELECT * FROM les1.pisni where type = "гімн"'
        );
        res.send(results);
        await c.end();
    }
    catch (err) {
        console.log(err);
    }
}

async function getPovstanska(req, res) {
    try {
        const c = await getConn();
        const [results, fields] = await c.query(
            'SELECT * FROM les1.pisni where type = "повстанська" order by nazva'
        );
        res.send(results);
        await c.end();
    }
    catch (err) {
        console.log(err);
    }
}

async function getBogorodychna(req, res) {
    try {
        const c = await getConn();
        const [results, fields] = await c.query(
            'SELECT * FROM les1.pisni where type = "богородична"'
        );
        res.send(results);
        await c.end();
    }
    catch (err) {
        console.log(err);
    }
}

async function getSearchSong(req, res) {
    const { searchTerm } = req.body;

    try {
        let connection = await mysql.createConnection(connStr);
        let [rows] = await connection.execute('select substring_index(text, "\n", 2) as firsttwolines from les1.pisni where text LIKE ?', [`%${searchTerm}%`]);
        await connection.end();

        if (rows.length > 0) {
            let allLines = rows.map(item => item.firsttwolines);
            res.status(200).send(allLines);
        } else {
            res.status(404).send('Текст не знайдено'); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Помилка сервера');
    }
};

async function getSearchNazva(req, res) {
    const { searchTerm } = req.body;

    try {
        let connection = await mysql.createConnection(connStr);
        let [imja] = await connection.execute('select substring_index(nazva, "\n", 1) as nazvapisni from les1.pisni where text LIKE ?', [`%${searchTerm}%`]);
        await connection.end();

        if (imja.length > 0) {
            let allNames = imja.map(item => item.nazvapisni)
            res.status(200).send(allNames);
        } else {
            res.status(404).send('Назву не знайдено'); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Помилка сервера');
    }
};

async function postSongText(req, res) {
    const { searchTerm } = req.body;

    try {
        let connection = await mysql.createConnection(connStr);
        let [rows] = await connection.execute('select text from les1.pisni where nazva LIKE ?', [`%${searchTerm}%`]);
        await connection.end();

        if (rows.length > 0) {
            let allLines = rows.map(item => item.text);
            res.status(200).send(allLines);
        } else {
            res.status(404).send('Текст не знайдено'); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Помилка сервера');
    }
};




app.get("/people", getPeople);
app.get("/ukr", getUkr);
app.get("/gimn", getGimn)
app.get("/povstanska", getPovstanska)
app.get("/bogorodychna", getBogorodychna)
app.post('/search-song', getSearchSong)
app.post('/search-nazva', getSearchNazva)
app.post('/search-song-text', postSongText)

app.listen(port, () => {
    console.log(`привіт ${port}`)
})
