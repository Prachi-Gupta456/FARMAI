import { getAuth } from "@clerk/express"

const protect = (req, resp, next) => {

    const { userId } = getAuth(req)

    if (!userId) {
        return resp.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    req.clerkId = userId
    next()
}

export default protect;