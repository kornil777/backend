const fs = require('fs');
const path = require('path');


const usersPath = path.join(__dirname, '..', 'data', 'users.json');

function getUsers() {
  try {
    const data = fs.readFileSync(usersPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Ошибка чтения users.json:', err);
    return null;
  }
}

module.exports = { getUsers };