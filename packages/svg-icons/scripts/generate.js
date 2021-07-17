import glob from 'glob';
import { camelCase } from 'lodash-es';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import { dirname, parse, resolve } from 'path';
import { optimize } from 'svgo';
import { fileURLToPath } from 'url';
import { parseStringPromise } from 'xml2js';

const __dirname = dirname(fileURLToPath(import.meta.url));

glob('**/*.svg', { cwd: resolve(__dirname, '../svg') }, async (err, files) => {
  const store = memFs.create();
  const fs = editor.create(store);

  const iconTemplate = resolve(__dirname, '../templates/icon.js.ejs');
  const indexTemplate = resolve(__dirname, '../templates/index.js.ejs');

  Promise.all(
    files.map(async (file) => {
      const outFile = file.replace('.svg', '.js');
      const identifier = camelCase(parse(outFile).name);

      fs.copyTpl(
        indexTemplate,
        resolve(__dirname, '../dist/glyphs/index.js'),
        {
          identifier,
          path: `./${parse(outFile).base}`,
        },
        {},
        {
          append: true,
        },
      );

      const { data } = optimize(fs.read(resolve(__dirname, '../svg', file)), {
        multipass: true,
      });

      const result = await parseStringPromise(data);

      await fs.copyTplAsync(
        iconTemplate,
        resolve(__dirname, '../dist', outFile),
        {
          identifier,
          content: JSON.stringify(result),
        },
      );

      fs.commit();
    }),
  );
});
