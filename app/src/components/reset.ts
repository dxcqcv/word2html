export const generatorReset = (isRealHtml: boolean) => `
*,
*:before,
*:after {
  box-sizing: border-box;
}

html,
body,
div,
span,
object,
iframe,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
code,
em,
img,
small,
strike,
strong,
sub,
sup,
tt,
b,
u,
i,
ol,
ul,
li,
fieldset,
form,
label,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
main,
canvas,
embed,
footer,
header,
nav,
section,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  text-size-adjust: none;
}

footer,
header,
nav,
section,
main {
  display: block;
}


body {
  line-height: 1;

	${isRealHtml ? 'padding: 8px;' : ''}
	

}

ol,
ul {
  


	padding: 16px 16px 16px 20px;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}


input {
  -webkit-appearance: none;
  border-radius: 0;
}


		table {
			border-collapse: collapse;
      border: 1px solid black;
      margin-bottom: 6px;
		}

		table td {
			border: 1px solid black;
		}

    td > p {
        padding: 16px 10px;
    }

		table tr:first-child td {
			border-top: 0;
		}

		table tr td:first-child {
			border-left: 0;
		}

		table tr:last-child td {
			border-bottom: 0;
		}

		table tr td:last-child {
			border-right: 0;
    }
    p {
      padding-bottom: 6px;
    }
`;
