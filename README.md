# UnderTheSameWoof
 Final school project in Node.js

# Dependencies you need to install:
* npm install body-parser
* npm install ejs
* npm install express
* npm install express-session (for cookie management by server)
* npm install bcryptjs (for password encryption and decryption)

### Optional:
* npm install nodemon (automatically restarts server after save)

# TODO list:
1. Add the "Add to Cart" functionality.
2. Checkout page.
3. Differentiate between admin to normal user (regular users should not be able to see the admin menues)
4. Store sessions (=cookies managed by the server) in a .json file, so we can track users activity.
5. Carts - need to be redesigned to support multiple users. Currently each user has an empty cart on creation, that is stored in the database carts.json file. We also need to implement support for multiple carts for multiple users (as we can't use SQL/real DB, that would be a copy of data). For this - carts should be able to remember the user email they are related to.