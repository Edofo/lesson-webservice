import * as bcrypt from "bcrypt";

const verifyHash = async (word: string, hashWord: string): Promise<boolean> => {
    try {
        const isMatch = await bcrypt.compare(word, hashWord);

        return isMatch;
    } catch (err) {
        throw err;
    }
};

export default verifyHash;