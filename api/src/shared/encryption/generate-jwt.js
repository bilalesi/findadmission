
const jwt = require('jsonwebtoken');
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('0123456789', 6);
// entity_id is an optional third argument which is used to mute specific entities,
// like a ambassador, institution, findadmission system, ... For example,
// for the user is muting notifications from a channel,
// then the entity_id will represent the insititution_id ... 

export const generate_unsubscribe_token = (
    user_id,
    type,
    dataId,
) => {
    if (!user_id || !type) return null;

    let token;
    try {
        token = jwt.sign(
            { user_id, type, dataId },
            process.env.EMAIL_JWT_SIGNATURE,
            { expiresIn: 60 * 60 * 24 * 7, } // 7 days
        );
    } catch (err) {
        return null;
    }

    if (!token || token === undefined) {
        return null;
    }

    return token;
};


export const generate_validation_token = ({ user_id, type, email, secret }) => {
    if (!user_id || !type || !email) return null;
    let token;
    try {
        token = jwt.sign(
            { user_id, type, email, secret },
            process.env.AUTH_JWT_SIGNATURE,
            { expiresIn: 60 * 60 * 24 } // 1 day
        );
    } catch (err) {
        return null;
    }

    if (!token || token === undefined) {
        return null;
    }

    return token;
}

export const generate_auth_token = (user_id, type, email, other_data) => {
    if (!user_id || !type || !email) return null;
    let token;
    try {
        token = jwt.sign(
            { sub: user_id, type, email, ...other_data },
            process.env.AUTH_JWT_SIGNATURE,
            { expiresIn: 60 * 60 * 24 * 30 } // 30 days
        );
    } catch (err) {
        return null;
    }

    if (!token || token === undefined) {
        return null;
    }

    return token;
}

export const generate_random_pin_6_digits = () => {
    return nanoid();
}

export const decode_token = (token, signature) => {
    return jwt.verify(token, process.env[signature]);
}