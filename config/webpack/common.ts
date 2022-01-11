import { appSrc, appHtml, appDist, appPublic, nodeModules } from '../paths';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import * as PrettierPlugin from 'prettier-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

// fix devServer ts err
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  entry: [`${appSrc}/index.tsx`],
  output: {
    path: appDist,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: nodeModules,
      },
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),
    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: appPublic,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'webpack react',
      favicon: `${appSrc}/images/favicon.ico`,
      template: appHtml, // template file
      filename: 'index.html', // output file
    }),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules',
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
  ],
  resolve: {
    /**
     * bugs:Can't resolve 'ansi-html'
     * https://github.com/webpack/webpack-dev-server/issues/1969
     */
    modules: [appSrc, 'node_modules'],
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
    alias: {
      '@': appSrc,
    },
  },
  cache: {
    type: 'filesystem',
  },
};

export default config;
