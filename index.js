const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

server.use(express.json());
server.use(helmet());

// knex connecting

const knexConfig = {
  client: 'sqlite3',
  connection : {
    filename: './data/lambda.db3',
  },
  useNullAsDefault: true
}

const db = knex(knexConfig);

// endpoints here
server.get('/', (req, res) => {
  res.send('<h3>Zoos Endpoint settup</h3>')
})

server.get('/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => {
    res.status(500).json({message: "something went wrong"})
  })
})

server.get('/zoos/:id', (req, res ) => {
  db('zoos')
  .where( { id: req.params.id })
  .first()
  .then(zoo => {
    if (!zoo) {
      res.status(404).json({message:"id not found"})
    } else {res.status(200).json(zoo)}
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.post('/zoos', (req, res) => {
  db('zoos')
  .insert(req.body, 'id')
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.put('/zoos/:id', (req, res) => {
  const changes = req.body;
  db('zoos')
  .where({ id : req.params.id})
  .update(changes)
  .then(count => {
    if (count > 0){
      res.status(200).json({message: `${count} records updated`})
    } else {
      res.status(404).json({message:"id not found"})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.delete('/zoos/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id})
  .del()
  .then(count => {
    if (count > 0){
      const unit = count > 1 ? 'records' : 'record';
      res.status(200).json({message: `${count} ${unit} deleted`})
    } else {
      res.status(404).json({message:"id not found"})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.get('/bears', (req, res) => {
  db('bears')
  .then(bears => {
    res.status(200).json(bears);
  })
  .catch(err => {
    res.status(500).json({message: "something went wrong"})
  })
})

server.get('/bears/:id', (req, res ) => {
  db('bears')
  .where( { bears_id: req.params.id })
  .first()
  .then(bear => {
    if (!bear) {
      res.status(404).json({message:"id not found"})
    } else {res.status(200).json(bear)}
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.post('/bears', (req, res) => {
  db('bears')
  .insert(req.body, 'bears_id')
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.put('/bears/:id', (req, res) => {
  const changes = req.body;
  db('bears')
  .where({ bears_id : req.params.id})
  .update(changes)
  .then(count => {
    if (count > 0){
      res.status(200).json({message: `${count} records updated`})
    } else {
      res.status(404).json({message:"id not found"})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.delete('/bears/:id', (req, res) => {
  db('bears')
  .where({ bears_id: req.params.id})
  .del()
  .then(count => {
    if (count > 0){
      const unit = count > 1 ? 'records' : 'record';
      res.status(200).json({message: `${count} ${unit} deleted`})
    } else {
      res.status(404).json({message:"id not found"})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
