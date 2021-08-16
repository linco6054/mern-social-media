import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res
        .status(404)
        .json({ message: `user with Email: ${email} does not exist!` });

    const isPasswordValid = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentioals" });

    if (existingUser && isPasswordValid) {
      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser._id,
        },
        "SECRATEwORD",
        { expiresIn: "1hr" }
      );
      res.status(200).json({ result: existingUser, token });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};
export const signUpUser = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    //find if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(404)
        .json({ message: `user with Email: ${email} already exist!` });

    if (password !== confirmPassword) {
      return res
        .status(404)
        .json({ message: `Password does not match. Please try again` });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      "SECRATEwORD",
      { expiresIn: "1hr" }
    );
    res.status(200).json({ result: result, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};
