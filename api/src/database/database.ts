import mongoose from "mongoose";

let dbConnection: mongoose.Connection;

const dbo = {
    connectToServer: () => {
        if (process.env.DATABASE_URL === undefined) {
            throw new Error("DATABASE_URL is undefined");
        }

        if (process.env.DATABASE_NAME === undefined) {
            throw new Error("DATABASE_NAME is undefined");
        }

        console.log("Connecting to MongoDB...");
        dbConnection = mongoose.createConnection(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`, {});

        console.log("Successfully connected to MongoDB.");
    },

    getDb: () => {
        return dbConnection;
    },

    closeConnection: async () => {
        await dbConnection.close();
    },
};

export default dbo;
