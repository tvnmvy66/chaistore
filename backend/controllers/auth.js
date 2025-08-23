import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Adjust path as needed
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authGoogle = async (req, res) => {
    const { credential } = req.body;
    try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const jwtPayload = ticket.getPayload();

    const userexist = await User.findOne({ email: jwtPayload.email });
    if (userexist) {
    const token = jwt.sign({ _id: userexist._id, role: userexist.role}, process.env.JWT_SECRET, { expiresIn: '7d' });

    const payload = {
        email: userexist.email,
        name: userexist.name,
        picture: userexist.picture,
        shippingAddress: userexist.shippingAddress
    };

    res.status(200).json({ payload, token });
    } else {
    const user = await User.create({
        email: jwtPayload.email,
        sub: jwtPayload.sub,
        emailVerified: jwtPayload.email_verified,
        name: jwtPayload.name,
        givenName: jwtPayload.given_name,
        familyName: jwtPayload.family_name,
        picture: jwtPayload.picture,
    });

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const payload = {
        email: user.email,
        name: user.name,
        picture: user.picture,
        shippingAddress: user.shippingAddress
    };

    res.status(200).json({ payload, token });
    }}
    catch (error) {
        res.status(401).json({ message: `Invalid Google credential : ${error}` });
    }
}
