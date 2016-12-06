import {USER_DATA} from "./src/app/data/users-data";
import {User} from "./src/app/my-form/user.model";

declare const require;

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();

app.use(express.static('.'));
app.use(bodyParser.json());
app.use(bodyParser.text());

/*
 * write the server code from here
 */

var userslist = USER_DATA;

var uidSequence : number = userslist.length;

var REST_BASE_URI = '/api';


/**
 * REST-API implementation
 */

app.route(REST_BASE_URI + '/users')
  .get( (req, res) => {
      // array for the response (list of users)
      var responseData = [];

      // if 'search' URL query parameter is presented then filter the result
      if (req.query.term) {
        console.log('[rest-api] find users by search term: ' + req.query.term);
        responseData = findUsers(req.query.term);
      }
      else {
        // no filter, return all users
        responseData = findUsers('');
      }

      // HTTP response 200 with the users list as JSON object
      res.status(200).json(responseData);
  })

  .post((req, res) => {
    // convert JSON string (request body) to JSON object
    //var newUser = JSON.parse(req.body);
    // NOTE: we do not need parse because the content-type is "application/json" in the HTTP header
    var newUser = req.body;

      // set ID with the incremented sequence
    newUser.id = incrementUidSequence();

    // add the new user into the users array
    userslist.push(newUser);

    res.status(200).json(newUser);
    console.log('[rest-api] POST request');
  })

  .put((req, res) => {
    // convert JSON string (request body) to JSON object
    //var updatedUser = JSON.parse(req.body);
    // NOTE: we do not need parse because the content-type is "application/json" in the HTTP header
    var updatedUser = req.body;

    const id = updatedUser.id;

    // find the user object (associated with the given ID) in the users array
    var foundUser = _.find(userslist,
      user => user.id == id
    );

    var index = userslist.indexOf(foundUser);

    console.log("updating user with id: " + id + " at index " + index);

    if (index > -1) {
      userslist[index] = updatedUser;
    }
    res.status(200).json(updatedUser);
    console.log('[rest-api] PUT request');
   });


app.route(REST_BASE_URI + '/users/:id')
  .get( (req, res) => {
      const id = req.params.id;
      console.log("getting user with id: ", id);

      // find the user object (associated with the given ID) in the users array
      var foundUser = _.find(userslist,
        user => user.id == id
      );

      res.status(200).json(foundUser);
      console.log('[rest-api] GET user by ID request');
  })

  .delete((req, res) => {
      const id = req.params.id;
      console.log("deleting user with id: ", id);

      // find the user object (associated with the given ID) in the users array
      var foundUser = _.find(userslist,
          user => user.id == id
      );

      var index = userslist.indexOf(foundUser);

      // remove the user object from array
      userslist.splice(index, 1);

      console.log("deleted user with id: " + id + " at index " + index);

      res.status(200).send();
    console.log('[rest-api] DELETE request');
  });

/**
 * ------------- end of REST-API implementation ------------
 */


/**
 * increment the ID sequence and return the new incremented value
 *
 * @returns {number}
 */
function incrementUidSequence() : number
{
  uidSequence++;
  return uidSequence;
}


/**
 * find users with the given search term
 *
 * @param term
 * @returns {Array}
 */
function findUsers(term : string) : User[]
{
  // it will contain the users result filtered by the given search 'term'
  let result = [];

  // iterate all users and filter
  for (let user of userslist)
  {
    // if no filter then add user
    if (term == null || term == '') {
      result.push(user);
    }
    else {
      // filtering the result by the given 'term'
      let match : boolean = false;

      if (user.userid != null && user.userid.toLowerCase().indexOf(term.toLowerCase()) != -1) {
        match = true;
      }

      if (user.firstname != null && user.firstname.toLowerCase().indexOf(term.toLowerCase()) != -1) {
        match = true;
      }

      if (user.lastname != null && user.lastname.toLowerCase().indexOf(term.toLowerCase()) != -1) {
        match = true;
      }

      if (user.email != null && user.email.toLowerCase().indexOf(term.toLowerCase()) != -1) {
        match = true;
      }

      if (user.telephone != null && user.telephone.toLowerCase().indexOf(term.toLowerCase()) != -1) {
        match = true;
      }

      if (match) {
        result.push(user);
      }
    }
  }

  return result;
}

/*
 * start HTTP server
 */

var server = app.listen(8081, function() {
    console.log("Server running at http://localhost:" + server.address().port);
});
