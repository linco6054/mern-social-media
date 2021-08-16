import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomToken = token.length < 500;
    let decodedData;

    if (token && isCustomToken) {
      decodedData = jwt.decode(token, "SECRATEwORD");

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

export default authMiddleware;
