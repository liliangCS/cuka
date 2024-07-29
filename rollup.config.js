import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/cuka.js",
      format: "cjs"
    },
    {
      file: "dist/cuka.esm.js",
      format: "esm"
    }
  ],
  plugins: [nodeResolve()]
};
