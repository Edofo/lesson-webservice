import { Prisma } from "@prisma/client";
import PrismaDB from "@src/models/prisma";

interface IQuery {
    where?: any;
    select?: any;
    include?: any;
    orderBy?: any;
    skip?: number;
    take?: number;
}

/**
 * @function fetchData - Fetch data from the database
 * @param {string} db - The database to query
 * @param {Prisma.PrismaAction} method - The method to call on the database
 * @param {object} query - The query to pass to the database
 * @returns {object} - The data returned from the database
 * @throws {Error} - The error thrown by the database
 * @example
 * const data = await fetchData("user", "findMany", { where: { id: 1 } });
 * console.log(data);
 * // Output: [{ id: 1, name: "John Doe" }]
 * @example
 * const data = await fetchData("user", "findMany", { where: { id: 1 }, select: { name: true } });
 * console.log(data);
 * // Output: [{ name: "John Doe" }]
 * @example
 * const data = await fetchData("user", "findMany", { where: { id: 1 }, include: { posts: true } });
 * console.log(data);
 * // Output: [{ id: 1, name: "John Doe", posts: [{ id: 1, title: "Hello World" }] }]
 */
const fetchData = async (db: string, method: Prisma.PrismaAction, query: IQuery) => {
    try {
        // @ts-ignore
        if (!PrismaDB[db]) throw new Error(`Database ${db} does not exist.`);
        // @ts-ignore
        if (!PrismaDB[db][method]) throw new Error(`Method ${method} does not exist on database ${db}.`);

        // @ts-ignore
        const data = await PrismaDB[db][method](query);

        return data;
    } catch (err: any) {
        console.log(err, err.message);
        throw err;
    } finally {
        PrismaDB.$disconnect;
    }
};

export default fetchData;
