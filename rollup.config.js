import pkg from './package.json';
import config from './tsconfig.rollup.json';
import babel from "@rollup/plugin-babel";
// import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
// import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import esbuild from 'rollup-plugin-esbuild';
import nodePolyfills from 'rollup-plugin-polyfill-node';
// import replace from '@rollup/plugin-replace';
// import babel from "rollup-plugin-babel";
// import nodePolyfills from 'rollup-plugin-node-polyfills';
import postCSS from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
// import typescript2 from 'rollup-plugin-typescript2';

export default [
    {
        input: `src/index.ts`,
        // output file names are loaded from the `package.json` main and module entries
        output: [
            {
                // file: pkg.main,
                dir: config.compilerOptions.declarationDir,
                format: `cjs`,
                sourcemap: true,
                preserveModules: true,
            },
            // {
            //     file: pkg.module,
            //     format: `es`,
            //     sourcemap: true,
            // },
        ],
        // this marks all peerDependencies as external meaning they won't be bundled in the distribution
        external: [ ...Object.keys(pkg.peerDependencies || {}) ],
        plugins: [
            peerDepsExternal(),
            nodePolyfills({
                include: [ `src/**/*.ts`, `src/**/*.tsx` ],
            }),
            nodeResolve(),
            babel({
                babelHelpers: `runtime`,
                exclude: `node_modules/**`,
            }),
            typescript({
                tsconfig: `./tsconfig.rollup.json`,
            }),
            // commonjs(),
            postCSS(),
            terser(),
        // typescript(),
        // nodeResolve({
        //     preferBuiltins: false
        // }),
        // commonjs({
        //     include: /node_modules/,
        //     namedExports: {
        //         'prop-types': `PropTypes`,
        //     }
        // }),
        // nodePolyfills({
        //     include: null,
        // }),
        // postCSS(),
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
    },
    // {
    //     input: `dist/types/index.d.ts`,
    //     output: [
    //         {
    //             file: `dist/index.d.ts`,
    //             format: `esm`,
    //         },
    //     ],
    //     plugins: [ dts() ],
    //     external: [ /\.css$/ ],
    // },
];
