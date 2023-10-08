const express = require('express');
const app = express();
const router = express.Router();

/*
- Create new html file named home.html
- Add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to the client
*/
router.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

/*
- Return all details from user.json file to the client as JSON format
*/
router.get('/profile', (req, res) => {
  const userData = require('./user.json');
  res.json(userData);
});

/*
- Modify /login route to accept username and password as query string parameters
- Read data from user.json file (assuming it contains user data)
- If username and password are valid, then send a response as below
    {
        status: true,
        message: "User Is valid"
    }
- If the username is invalid, then send a response as below
    {
        status: false,
        message: "User Name is invalid"
    }
- If the password is invalid, then send a response as below
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req, res) => {
  const { username, password } = req.query;
  const userData = require('./user.json'); // Load user data from user.json

  // Check if the username and password match any user in user.json
  const foundUser = userData.find(user => user.username === username && user.password === password);

  if (foundUser) {
    res.json({
      status: true,
      message: "User Is valid"
    });
  } else {
    if (!foundUser) {
      res.json({
        status: false,
        message: "User Name is invalid"
      });
    } else {
      res.json({
        status: false,
        message: "Password is invalid"
      });
    }
  }
});

/*
- Modify /logout route to accept username as a parameter and display a message
  in HTML format like <b>${username} successfully logout.</b>
*/
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logout.</b>`);
});

app.use('/', router);

app.listen(process.env.PORT || 8081, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
});
