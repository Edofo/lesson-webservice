import * as bcrypt from "bcrypt";

const hash = async (word: string): Promise<string> => {
    try {
        const saltOrRounds = 10;
        const hashWord = await bcrypt.hash(word, saltOrRounds);

        return hashWord;
    } catch (err) {
        throw err;
    }
};

export default hash;