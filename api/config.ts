import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, "public"),
    db: "mongodb://localhost/forum_hw88",
    jwtSecret: process.env.JWT_SECRET || 'default_fallback',
}

export default config;