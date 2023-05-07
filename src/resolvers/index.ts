import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";

const resolvers = loadFilesSync(path.join(__dirname, "./**/*.resolver.*"));
export default resolvers;