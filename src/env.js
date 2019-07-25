import dotenv from 'dotenv'
import NPMPackage from '../package.json'

dotenv.config()

process.env.APP_NAME       = NPMPackage.name
process.env.APP_VERSION    = NPMPackage.version
process.env.APP_TITLE      = NPMPackage.title
process.env.APP_DESCRIPTION= NPMPackage.description
process.env.APP_PORT       = process.env.PORT || 4000
process.env.APP_LOG_LEVEL  = process.env.LOG_LEVEL || "info"
