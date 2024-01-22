# Express + TypeScript + Mongo + Passport, REST API CRUD
This template also includes more features such as error handlers, type and role validation, login & session token, singleton pattern for service and store classes and a more complex database schema example.

### How to setup manually
- ```npm init -y```
- ```npm i cors dotenv express ts-node mongoose joi @hapi/boom passport passport-local passport-jwt jsonwebtoken bcrypt```
- ```npm i -D @types/node @types/express @types/cors @types/passport @types/passport-jwt @types/passport-local @types/bcrypt nodemon typescript```
- ```tsc --init``` or paste **tsconfig.ts** file in the root directory.
- Create **/src** directory and paste all the template files inside.
- Open **package.json**, set ```"type": "module"``` and paste the scripts from the template.
- Create **.env** file in the **root directory**, and use the format provided in .env.example.
- Customize the components as you desire and start building your app.