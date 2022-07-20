export function testMailTemplate() {
  return `
  <h1>Test</h1> 
  <p>It can use handlebars</p>
  <br /> 
  <b>But remember to use striptags() on data from user</b>
  `;
}
