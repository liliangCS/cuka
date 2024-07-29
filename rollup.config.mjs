import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "lib/index.js",
  output: [
    {
      file: "dist/cuka.js",
      format: "cjs"
    },
    {
      file: "dist/cuka.mjs",
      format: "esm"
    }
  ],
  plugins: [nodeResolve()]
};
