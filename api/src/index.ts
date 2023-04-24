import express from "express";
import * as mysql from 'promise-mysql';
import bodyParser from "body-parser";
import cors from 'cors';
import cron from 'node-cron';

const app = express();
const port = 3000;

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const connection = async () => {
  const connection = await mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'squwJwh8AS',
    database: 'roomio_db',
    multipleStatements: true
  });
  return connection;
}

const getSqlDatetimeStr = (date: Date): string => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + date.getMinutes()).slice(-2);
  const second = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// create table if the tables is not exist
const checkTable = (table: string, query:string):void => {
  connection().then(connection => {
    const result = connection.query(`SHOW TABLES LIKE '${table}'`);
    connection.end();
    return result;
  }).then((ret) => {
    if(ret.length == 0){
      console.log(`${table} table is not exist!`);
      // Create table
      connection().then(connection => {
        connection.query(query);
        connection.end();
      })
      console.log(`${table} table is created!`);
    }else{
      console.log(`${table} table is exist!`);
    }
  })
}

const query_C_USER = 'CREATE TABLE USER (id VARCHAR(50) UNIQUE,name VARCHAR(50));';
const query_C_LOG = 'CREATE TABLE LOG (id VARCHAR(50),place VARCHAR(50), inTime DATETIME, outTime DATETIME);';

checkTable('USER', query_C_USER);
checkTable('LOG', query_C_LOG);


// Survival Confirmation API
app.post('/api/health', (req, res) => {
  console.log(new Date().toLocaleString());
  console.log(new Date().toISOString());
  res.status(200).send('alive');
});


// User name Register/Update API
app.post('/api/register', (req, res) => {
  connection().then(connection => {
    const result = connection.query(`SELECT name FROM USER WHERE id="${req.body.id}"`);
    connection.end();
    return result;
  }).then((ret) => {
    if(ret.length == 0){
      // In the case the is not exist.
      // Register the username.
      connection().then(connection => {
        connection.query(`INSERT INTO USER (id, name) VALUES ('${req.body.id}', '${req.body.name}');`);
        connection.end();
      })
      console.log(`Register ${req.body.id}: ${req.body.name}.`);
    }else{
      // In the case the ID has already exist.
      // Update the username.
      connection().then(connection => {
        connection.query(`UPDATE USER SET name = "${req.body.name}" WHERE id="${req.body.id}";`);
        connection.end();
      })
      console.log(`Update ${req.body.id}: ${ret[0].name} => ${req.body.name}.`);
    }
  });
  res.status(200).send('ok');
})


// Get User List API
app.post('/api/userlist', (req, res) => {
  connection().then(connection => {
    const result = connection.query('SELECT * FROM USER')
    connection.end();
    return result;
  }).then((ret) => {
    console.log(ret);
    res.status(200).send(ret);
  })
})


// Get Active Users API
app.post('/api/activeuser', (req, res) => {
  connection().then(connection => {
    const result = connection.query('SELECT COALESCE(u.name, "Unknown") as name, place, inTime FROM USER u RIGHT JOIN  LOG l ON u.ID = l.ID WHERE l.outTime IS NULL;')
    connection.end();
    return result;
  }).then((ret) => {
    res.status(200).send(ret);
  })
})

// Get Todays Activity API
app.post('/api/activity', (req, res) => {
  const dateStr:String = req.body.date;
  connection().then(connection => {
    const result = connection.query(`SELECT COALESCE(u.name, "Unknown") as name, place, inTime, outTime FROM USER u RIGHT JOIN  LOG l ON u.ID = l.ID WHERE CAST(l.inTime AS DATE) = '${dateStr}';`);
    connection.end()
    return result;
  }).then(ret => {
    res.status(200).send(ret);
  })
})


// Get Activity History API
app.post('/api/history', (req, res) => {

  var history: number[] = [];
  var existDays: { [key: string]: number } = {};
  
  const getBeginDate = ():Date => {
    var lastYear: Date = new Date();
    lastYear.setFullYear(lastYear.getFullYear()-1);
    lastYear.setDate(lastYear.getDate() - lastYear.getDay());
    return lastYear;
  }

  connection().then(async connection => {
    const result = connection.query(`
        SELECT DATE_FORMAT(inTime, '%Y-%m-%d') AS date, COUNT(*) AS count 
        FROM LOG 
        WHERE inTime >= DATE_SUB(NOW(), INTERVAL 1 YEAR) 
          AND DATE_FORMAT(inTime, '%Y-%U') >= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 YEAR), '%Y-%U') 
        GROUP BY DATE_FORMAT(inTime, '%Y-%m-%d')
        ORDER BY DATE_FORMAT(inTime, '%Y-%m-%d');
    `);
    connection.end();
    return result;
  }).then(ret => {
    for (let i = 0; i < ret.length; i++) {
      existDays[ret[i].date] = ret[i].count;
    }

    for(let date = getBeginDate(); date <= new Date; date.setDate(date.getDate()+1)){

      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const dateString = year + '-' + month + '-' + day;

      if(existDays.hasOwnProperty(dateString)){
        history.push(existDays[dateString]);
      }else{
        history.push(0);
      }
    }
    res.status(200).send({'history':history});
  });

})


// IO API
app.post('/api/io', (req, res) => {

  const id :string = req.body.id;
  const place: string = req.body.place;

  connection().then(connection => {
    const result = connection.query(`SELECT id FROM LOG WHERE id="${id}" AND outTime IS NULL;`);
    connection.end();
    return result;
  }).then((ret) => {
    if(ret.length == 0){
      // In the case user is in the room.
      connection().then(connection =>{
        connection.query(`INSERT INTO LOG (id, place, inTime) VALUES ('${id}', '${place}', '${getSqlDatetimeStr(new Date())}');`);
        connection.end();
      })
      console.log(`${id} enters into ${place}.`);
    }else{
      // In the case user is not in the room.
      connection().then(connection =>{
        connection.query(`UPDATE LOG SET outTime = "${getSqlDatetimeStr(new Date())}" WHERE id="${id}" AND outTime IS NULL;`);
        connection.end();
      })
      console.log(`${id} exit from ${place}.`);
    }
    
  })
  res.status(200).send('ok');
})


// At 0:00 Forced to leave the room if there is a user who forgot to exit the room
cron.schedule('0 0 0 * * *', () => {
  connection().then(connection => {
    connection.query(`UPDATE LOG SET outTime = "${getSqlDatetimeStr(new Date())}" WHERE outTime IS NULL;`);
    connection.end();
  })
});

app.listen(port, () => console.log(`Example app membersening on port ${port}!`));