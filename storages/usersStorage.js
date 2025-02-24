// storages/usersStorage.js

//This would normally be a database

//This constructor class simulates a database
class UsersStorage {
  constructor() {
    //Create an empty object to store users
    this.storage = {};
    //Create unique user IDs automatically
    this.id = 0;
  }

  //Adds a new user to the storage with a unique id
  addUser({ firstName, lastName }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName };
    this.id++;
  }

  /*Returns an array of all users stored 
    in the storage object, without
    their IDs as keys. Use "Object.values" to create an array
    of user objects to extract values from the storage object - 
    keys are user IDs and values are user objects*/
  getUsers() {
    return Object.values(this.storage);
  }

  /*This method retrieves a user object 
    from the storage object by its
    unique id*/
  getUser(id) {
    return this.storage[id];
  }

  /*This method updates a user's 
    information in the storage object by
    replacing the existing user object with
    a new one, while keeping the same id.*/
  updateUser(id, { firstName, lastName }) {
    this.storage[id] = { id, firstName, lastName };
  }

  /*This method deletes a user from the
    storage object by removing the property
    with the specified id.*/
  deleteUser(id) {
    delete this.storage[id];
  }
}
/*Rather than exporting the class, we can export an instance
of the class by instantiating it. This ensures only one
instance of this class can exist, also known as the 
"singleton" pattern.*/
module.exports = new UsersStorage();

