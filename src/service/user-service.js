import { validate } from "../validation/validation.js";
import {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
} from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { logger } from "../application/logging.js";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Email already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            email: true,
            first_name: true,
            last_name: true
        }
    });
};

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            email: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Email or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Email or password wrong");
    }

    const token = uuid().toString();
    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            email: user.email
        },
        select: {
            token: true,
            email: true
        }
    });
};

const get = async (email) => {
    email = validate(getUserValidation, email);

    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        },
        select: {
            email: true,
            first_name: true,
            last_name: true,
            address: true,
            image: true,
            is_active: true,
            birth_date: true
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return user;
};

const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "user is not found");
    }

    const data = {};
    if (user.first_name) {
        data.first_name = user.first_name;
    }
    if (user.last_name) {
        data.last_name = user.last_name;
    }
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }
    if (user.address) {
        data.address = user.address;
    }
    if (user.birth_date) {
        data.birth_date = user.birth_date;
    }
    if (user.image) {
        data.image = user.image;
    }

    return prismaClient.user.update({
        where: {
            email: user.email
        },
        data: data,
        select: {
            email: true,
            first_name: true,
            last_name: true,
            address: true,
            image: true,
            is_active: true,
            birth_date: true
        }
    });
};

const logout = async (email) => {
    email = validate(getUserValidation, email);

    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.user.update({
        where: {
            email: email
        },
        data: {
            token: null
        },
        select: {
            email: true
        }
    });
};

export default {
    register,
    login,
    get,
    update,
    logout
};