import { connect } from 'mssql';

const DB_INFO = {
    host: process.env.CONNECTION_STRING,
    db: process.env.DB_NAME,
}

export async function getCharacters(query) {
    try {
        const pool = await connect(DB_INFO.host);
        const result = await pool.request().query(query);
        let data = result.recordset;
        let employees = [];

        for(let emp in data){
            employees.push({
                id: emp.id,
                first_name: emp.first_name,
                last_name: emp.last_name,
                birthday: new Date(emp.birthday)
            });
        }
        return employees;
    } catch (err) {
        console.log(err);
    }
}

export async function addCharacter(character, procName) {
    try {
        const pool = await connect(DB_INFO.host);
        const result = await pool.request()
          .input("name", character.name)
          .input("age", character.age)
          .input("actor", character.actor)
          .execute(procName);
        return result;
      } catch (error) {
        throw new Error();
      }
}


