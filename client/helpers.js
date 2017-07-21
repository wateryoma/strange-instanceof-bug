export const generateHead = ({title = 'Axios mock test', description = null, keywords = null})=> `\
${title ? `<title>${title}</title>` : ''}\
${description ? `<meta name="description" content="${description}">` : ''}\
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}`
