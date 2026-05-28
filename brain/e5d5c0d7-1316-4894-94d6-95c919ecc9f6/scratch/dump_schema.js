const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../backend/.env') });

async function dump() {
  try {
    console.log(`Connecting to database ${process.env.DB_NAME} on ${process.env.DB_HOST}:${process.env.DB_PORT}...`);
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'db_veci',
      port: parseInt(process.env.DB_PORT || '3306')
    });

    const [tables] = await connection.execute('SHOW TABLES');
    let sqlDump = '';
    
    for (const t of tables) {
      const tableName = Object.values(t)[0];
      const [createTableResult] = await connection.execute(`SHOW CREATE TABLE \`${tableName}\``);
      const createStatement = createTableResult[0]['Create Table'];
      sqlDump += `${createStatement};\n\n`;
    }
    
    const outputPath = path.join(__dirname, '../../../db_schema.sql');
    fs.writeFileSync(outputPath, sqlDump);
    console.log('Successfully dumped database schema to db_schema.sql!');
    await connection.end();
  } catch (err) {
    console.error('Error dumping schema:', err.message);
  }
}

dump();
