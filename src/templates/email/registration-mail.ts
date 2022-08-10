import * as striptags from 'striptags';

export function registrationMailTemplate(url: string) {
  return `
    <h1>Welcome to MegaK Head Hunter - Registration link</h1> 
    <br /> 
    <b>To register click <a href="${striptags(url)}">here</a></b>
    <p>This link will expire in ${
      process.env.REGISTRATION_LINK_EXP_TIME_IN_DAYS + ' days'
    }</p>
    `;
}
