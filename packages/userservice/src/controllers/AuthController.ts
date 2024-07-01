import {Request, Response} from "express";
import * as userService from "../services/UserService";

export const login = async (req: Request, res: Response): Promise<void> => {
    /*
        #swagger.tags = ['Auth']
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                email: "tisaw@gmail.com",
                password: "admin"
            }
        }
    */
    try {
        const {email, password} = req.body
        const token = await userService.loginUser(email, password)
        if (token) {
            res.json({token})
        } else {
            res.status(401).json({message: "Invalid Credentials"})
        }
    } catch (e) {
        res.status(400).json({message: "Error logging", e})
    }
}

export const register = async (req: Request, res: Response): Promise<void> => {
    /*
        #swagger.tags = ['Auth']
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                email: "mdp@gmail.com",
                password: "admin",
                username: "mdp",
                firstName: "m",
                lastName: "dp",
                age: 18
            }
        }
    */
    try {
        console.log('register')
        console.log(req.body)
        const body = req.body
        const newUser = await userService.registerUser(body)
        res.status(201).json(newUser)
    } catch (e) {
        res.status(400).json({message: "Error creating user", e})
    }
}
