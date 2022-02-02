import { transform } from '@svgr/core';
import * as fantasticons from '@terenceodonoghue/svg-icons/fantasticons';
import { upperFirst } from 'lodash-es';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import { dirname, parse, resolve } from 'path';
import prettier from 'prettier';
import { fileURLToPath } from 'url';
import xml2js from 'xml2js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const builder = new xml2js.Builder({
  headless: true,
});

const store = memFs.create();
const fs = editor.create(store);

const iconSets = {
  fantasticons,
};

const iconTemplate = (
  { componentName, exports, imports, interfaces, jsx },
  { tpl },
) => {
  const formattedName = `${componentName}: React.FunctionComponent<IconDefinition>`;

  return tpl`
  ${imports}

  ${interfaces}

  import { IconDefinition } from '../types';

  const ${formattedName} = function ${componentName}({ fill, ...props }) {
    return ${jsx};
  }
  
  ${exports}
  `;
};

const indexTemplate = resolve(__dirname, '../templates/index.ts.ejs');
const packageJsonTemplate = resolve(__dirname, '../templates/package.json.ejs');

Promise.all(
  Object.entries(iconSets).map(([iconSetName, iconSet]) => {
    const outDir = iconSetName;

    Promise.all(
      Object.entries(iconSet).map(async ([iconName, icon]) => {
        const content = builder.buildObject(icon);

        const identifier = upperFirst(iconName);
        const outFile = resolve(
          __dirname,
          '../out-svgr',
          outDir,
          `${upperFirst(iconName)}.tsx`,
        );

        const jsx = await transform(
          content,
          {
            icon: true,
            replaceAttrValues: {
              '#000': '{fill || "currentColor"}',
              '#fff': '{fill || "currentColor"}',
            },
            svgo: false,
            template: iconTemplate,
          },
          {
            componentName: identifier,
          },
        );

        fs.write(
          outFile,
          prettier.format(jsx, {
            arrowParens: 'always',
            parser: 'babel',
            singleQuote: true,
            trailingComma: 'all',
          }),
        );

        fs.copyTpl(
          indexTemplate,
          resolve(__dirname, '../out-svgr', outDir, 'index.ts'),
          {
            identifier,
            path: `./${parse(outFile).name}`,
          },
          {},
          {
            append: true,
          },
        );
      }),
    );

    fs.copyTpl(
      packageJsonTemplate,
      resolve(__dirname, '../dist/cjs/package.json'),
      {
        type: `"commonjs"`,
      },
    );

    return fs.commit();
  }),
);
