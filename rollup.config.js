import pkg from './package.json';
// import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import replace from '@rollup/plugin-replace';
// import babel from "rollup-plugin-babel";
// import nodePolyfills from 'rollup-plugin-node-polyfills';
import postCSS from 'rollup-plugin-postcss';
// import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

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
        typescript({
            useTsconfigDeclarationDir: true,
        }),
        postCSS(),
    ],
    // plugins: [
    //     nodePolyfills(),
    //     // babel({
    //     //     exclude: /node_modules/,
    //     //     presets: [
    //     //         `@babel/preset-env`,
    //     //         `@babel/preset-react`,
    //     //         `@babel/preset-typescript`,
    //     //     ],
    //     // }),
    //     postCSS({
    //         plugins: [],
    //         minimize: true,
    //     }),
    //     typescript({
    //         useTsconfigDeclarationDir: true,
    //     }),
    //     nodeResolve(),
    //     commonjs(),
    //     // replace({
    //     //     preventAssignment: true,
    //     // }),
    //     terser({

    //     }),
    // ],
};
