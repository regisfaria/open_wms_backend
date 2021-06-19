import path from 'path';

export function resolveTemplatePath(fileName: string): string {
  const templatePath = path.resolve(
    __dirname,
    '..',
    'views',
    `${fileName}.hbs`,
  );

  return templatePath;
}
