import path from 'path';
import { alias } from './src/config/alias';
const PREFIX = './src';
const aliases = alias(PREFIX);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => {
    return [key, path.resolve(__dirname, value)];
  }),
);

const wpConfig = {
  webpack: {
    alias: resolvedAliases,
  },
};

export default wpConfig;
