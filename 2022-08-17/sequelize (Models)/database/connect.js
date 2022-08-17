import { Sequelize } from 'sequelize'
import Posts from '../model/posts.js'

const database = {} 

try {
    const sequelize = new Sequelize('blog', 'root', '', { dialect: 'mysql'})

    database.Posts = Posts(sequelize)

    await sequelize.sync({ alter: false })
} catch {
    console.log('Nepavyko prisijungti prie duomenų bazės');
}

export default database