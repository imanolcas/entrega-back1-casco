import { dirname } from "path"
import {fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

import bcrypt from "bcrypt"

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)