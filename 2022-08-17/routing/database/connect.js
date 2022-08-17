import mysql from "mysql2/promise";

export default await mysql.createConnection({
    host: "pauliuspetrunin.lt",
    user: "bit",
    password: "kulokas",
    database: "Lukas",
});

console.log('prisijunge')
