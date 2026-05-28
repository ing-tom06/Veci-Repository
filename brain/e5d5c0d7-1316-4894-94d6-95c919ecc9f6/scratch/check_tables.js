require('dotenv').config({ path: 'c:\\Users\\Tomas Sanchez\\Desktop\\AppVeci\\backend\\.env' });
const pool = require('c:\\Users\\Tomas Sanchez\\Desktop\\AppVeci\\backend\\config\\db');

async function check() {
  try {
    const [tables] = await pool.execute('SHOW TABLES');
    console.log('Tables found:', tables);
    
    for (const t of tables) {
      const tableName = Object.values(t)[0];
      if (tableName.toLowerCase().includes('notificac') || tableName.toLowerCase().includes('notification')) {
        const [columns] = await pool.execute(`DESCRIBE ${tableName}`);
        console.log(`Columns for ${tableName}:`, columns);
      }
    }
  } catch (err) {
    console.error('Error querying tables:', err);
  } finally {
    process.exit(0);
  }
}

check();
