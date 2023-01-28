import { Request, Response } from 'express'

import { isEmpty } from 'lodash'

const missingValues = (req: Request, res: Response, acceptedFields: string[]) => {
    const checkValues = acceptedFields.filter(field => !req.body[field])

    if (!isEmpty(checkValues)) {
        return res.status(400).json({
            error: "Values are missing !"
        })
    } else {
        return true
    }
}

export default missingValues