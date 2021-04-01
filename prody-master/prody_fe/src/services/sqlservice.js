const Connection = require("tedious").Connection
const Request = require("tedious").Request
const { ipcMain } = require('electron')

/**
 * Connect to the database
 * @returns 'Promise' A promise object containing an open connection to the database
*/
const connectToServer = () => {
    return new Promise((resolve, reject) => {
        const config = {
            //process.env.DB_SERVER
            server: 'sql5.freemysqlhosting.net',
            authentication: {
                //process.env.DB_AUTHTYPE
                type: 'default',
                options: {
                    //domain: process.env.DB_DOMAIN,
                    userName: 'sql5396493',
                    password: 'TZRVXNLpNq'
                }
            },
            options: {
                database: 'sql5396493',
                //instanceName: process.env.DB_INSTANCENAME,

                // These two settings are really important to make successfull connection
                encrypt: false,
                trustServerCertificate: false,

                // This will allow you to access the rows returned. 
                // See 'doneInProc' event below
                rowCollectionOnDone: true
            }
        }

        let connection = new Connection(config)

        connection.connect()

        connection.on('connect', function (err) {
            if (err) {
                console.log('Error: ', err)
                reject(err)
            } else {
                // If no error, then good to go...
                console.log('Connection Successful!')
                resolve(connection)
            }
        })

        connection.on('end', () => { console.log("Connection Closed!") })
    })
}

/**
 * Read data from the database
 * @param 'connection' connection object to use to connect to DB
 * @param 'sqlQuery' sqlQuery as a string to be executed against the database
 * @returns 'Promise' A promise object with either collection of data or an error
*/
const readFromDb = (connection, sqlQuery) => {
    return new Promise((resolve, reject) => {
        let products = []

        console.log('Reading rows from the Table...')

        // Read all rows from table
        let request = new Request(sqlQuery, (err, rowCount, rows) => {
            if (err) {
                reject(err)
            } else {
                console.log(rowCount + ' row(s) returned')
                resolve(products)
                connection.close()
            }
        })

        request.on('doneInProc', (rowCount, more, rows) => {
            products = []
            rows.map(row => {
                let result = {}
                row.map(child => {
                    result[child.metadata.colName] = child.value
                })
                products.push(result)
            })
        })

        // Execute SQL statement
        connection.execSql(request)
    })
}

const getProducts = () => {
    return new Promise((resolve, reject) => {
        connectToServer()
            .then(connection => {
                let sqlStr = 'SELECT TOP(2) [Name], [ProductNumber] FROM Production.Product'

                return readFromDb(connection, sqlStr)
            })
            .then(products => resolve(products))
            .catch(err => reject(err))
    })
}

ipcMain.handle('getproducts', getProducts)