import { MongoClient } from "mongodb";

// Connect db
const client = new MongoClient(process.env.DATABASE_URL || "mongodb://localhost:27017/webservice", {});

let dbConnection: any;

const dbo = {
    connectToServer: (callback: any) => {
        console.log("Connecting to MongoDB...");
        client.connect((err, db) => {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db("lesson-webservice");
            console.log("Successfully connected to MongoDB.");

            return callback();
        });
    },

    getDb: () => {
        return dbConnection;
    },

    closeConnection: (callback: any) => {
        client.close((err) => {
            if (err) {
                return callback(err);
            }

            return callback();
        });
    },
};

export default dbo;
