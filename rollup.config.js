import pkg from './package.json';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postCSS from 'rollup-plugin-postcss';

export default {
    input: `src/index.ts`,
    // output file names are loaded from the `package.json` main and module entries
    output: [
        {
            file: pkg.main,
            format: `cjs`,
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: `es`,
            sourcemap: true,
        },
    ],
    // this marks all peerDependencies as external meaning they won't be bundled in the distribution
    external: [ ...Object.keys(pkg.peerDependencies || {}) ],
    plugins: [
        nodeResolve(),
        commonjs(),
        typescript(),
        postCSS(),
    ],
};
