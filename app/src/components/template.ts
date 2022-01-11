import { generatorReset } from '@/components/reset';
const resetCSS = generatorReset(true);
export const generateHtml = ({
  title,
  content,
}: {
  title: string;
  content: string;
}): string => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${title}</title>
	<style>
	${resetCSS}
	</style>
</head>
<body>

${content}
</body>
</html>
    `;
};
