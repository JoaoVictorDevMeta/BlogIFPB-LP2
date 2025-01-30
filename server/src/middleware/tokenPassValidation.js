import prisma from "../db/database.js";

async function isValidToken(req, res, next) {
    try{
        const token = req.params.token || req.body.token;
        const tokenData = await prisma.token.findFirst({
            where: {
                token
            }
        });

        if(!tokenData){
            return res.status(400).send({auth: false, message: 'Token inválido'});
        }
        if(tokenData.expiration < new Date()){
            return res.status(401).send({auth: false, message: 'Token expirado'});
        }

        req.token = tokenData;

        next();
    }catch(error){
        res.status(401).send({auth: false, message: 'Token inválido'});
    }
}

export { isValidToken };