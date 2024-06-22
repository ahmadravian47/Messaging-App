const sql = require('mssql/msnodesqlv8');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;



const config = {
  connectionString: 'Driver=SQL Server;Server=localhost\\SQLEXPRESS;Database=master;Trusted_Connection=true;'
};

const pool = new sql.ConnectionPool(config);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  // Assuming the form data is sent as JSON in the request body
  const { name, email, password } = req.body;

  // Connect to the database
  pool.connect().then(() => {
    const request = new sql.Request(pool);

    // Input parameters for the stored procedure
    request.input('Username', sql.VarChar(50), name);
    request.input('Email', sql.VarChar(100), email);
    request.input('Password', sql.VarChar(255), password);


    // Output parameter to capture the result (success or failure)
    request.output('Result', sql.Int);

    // Execute the stored procedure
    request.execute('signup', (err, result) => {
      if (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Internal Server Error');
      } else {
        const resultValue = result.output.Result;
        res.json({ status: resultValue });
      }

      // Close the database connection
      pool.close();
    });
  }).catch(err => {
    console.error('Error connecting to the database:', err);
    res.status(500).send('Internal Server Error');
  });
});

//--------------------------------------------------------------------------------------
app.post('/login', (req, res) => {
  pool.connect().then(() => {
    const request = new sql.Request(pool);
    const { email, password } = req.body;

    request.input('Email', sql.VarChar(100), email);
    request.input('Password', sql.VarChar(255), password);
    request.output('Result', sql.Int);
    request.execute('login', (err, result) => {
      if (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        const resultValue = result.output.Result;
        res.json({ status: resultValue });
      }
    });
  });
});
//--------------------------------------------------------------------------------------
app.post('/allusers', (req, res) => {
  pool.connect().then(() => {
    const request = new sql.Request(pool);

    const { email } = req.body;

    request.input('Email', sql.VarChar(100), email);
    request.execute('fetchdata', (err, result) => {
      if (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Error executing stored procedure:');
      }
      else {
        res.json(result.recordset);
      }

    })

  })
});
//--------------------------------------------------------------------------------------
app.post('/sendrequest', (req, res) => {
  pool.connect().then(() => {
    const request = new sql.Request(pool);
    const { sender_email, receiver_id } = req.body;

    request.input('sender_email', sql.VarChar(100), sender_email);
    request.input('receiver_id', sql.Int, receiver_id);

    request.output('Result', sql.Int);
    request.execute('send_request', (err, result) => {
      if (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Error executing stored procedure');
      }
      else {
        const resultValue = result.output.Result;
        res.json({ status: resultValue });
      }
    });
  });
})
//--------------------------------------------------------------------------------------
app.post('/getrequest', (req, res) => {
  pool.connect().then(() => {
    const request = new sql.Request(pool);

    const { email } = req.body;

    request.input('receiver_email', sql.VarChar(100), email);
    request.execute('all_request', (err, result) => {
      if (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Error executing stored procedure:');
      }
      else {
        res.json(result.recordset);
      }
    })

  })
});
//--------------------------------------------------------------------------------------
app.post('/acceptrequest', (req, res) => {
  pool.connect().then(() => {
    const request = new sql.Request(pool);
    const { receiver_email, sender_id } = req.body;
    console.log(receiver_email);
    console.log(sender_id);

    request.input('receiver_email', sql.VarChar(100), receiver_email);
    request.input('sender_id', sql.Int, sender_id);

    request.output('Result', sql.Int);
    request.execute('accept_request', (err, result) => {
      if (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Error executing stored procedure');
      }
      else {
        const resultValue = result.output.Result;
        res.json({ status: resultValue });
      }
    });
  });
})
//--------------------------------------------------------------------------------------
app.post('/getconnections', (req, res) => {
  pool.connect().then(() => {
    const request = new sql.Request(pool);

    // Update the property name to match the one sent from the client
    const { email } = req.body;

    request.input('email', sql.VarChar(100), email);

    request.execute('fetchconnections', (err, result) => {
      if (err) {
        console.error('Error executing stored procedure:', err);
        res.status(500).send('Error executing stored procedure');
      } else {
        res.json(result.recordset);
      }
    });
  });
});



//-------------------------------------------------------------------------------------
app.post('/getmessage', (req, res) => {
  const { id, email } = req.body;
  console.log('I am fetching all your messages');

  console.log(id);
  console.log(email);

  const request = new sql.Request(pool);

  request.input('person2email', sql.VarChar(100), email);
  request.input('person1ID', sql.Int, id);
 

  request.execute('fetchmessage', (err, result) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Error executing stored procedure');
    } else {
      console.log('---------------------------------------------------------s');
      console.log(result.recordset)
      res.json(result.recordset);
    }
  });
});
//------------------------------------------------------------------------------------
app.post('/sendmessage', (req, res) => {
  const { email, id,message } = req.body;
  console.log('I am going to send your message');

  console.log(id);
  console.log(email);
  console.log(message);

  const request = new sql.Request(pool);

  request.input('senderemail', sql.VarChar(100), email);
  request.input('receiverid', sql.Int, id);
  request.input('message', sql.VarChar(100), message);

  request.output('Result', sql.Int);
  request.execute('insertmessage', (err, result) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      res.status(500).send('Error executing stored procedure');
    } else {
      console.log('---------------------------------------------------------s');
      const resultValue = result.output.Result;
      res.json({ status: resultValue });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
