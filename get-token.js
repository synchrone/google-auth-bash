#!/usr/bin/env node
if(process.argv.length < 3){
  console.error(`Usage: ${process.argv[1]} service_account.json [scope=https://www.googleapis.com/auth/cloud-platform]`)
}

const jws = require("jws");
const fs = require("node:fs");

const saJson = JSON.parse(fs.readFileSync(process.argv[2]));
const scope = process.argv[3] ?? 'https://www.googleapis.com/auth/cloud-platform';

const iat = Math.floor(new Date().getTime() / 1000)
const signedJWT = jws.sign({
  header: { alg: 'RS256' },
  payload: {
    iss: saJson.client_email,
    scope: scope,
    aud: saJson.token_uri,
    exp: iat + 3600,
    iat,
    sub: undefined,
  },
  secret: saJson.private_key,
});

console.log(`curl -H 'Content-Type: application/x-www-form-urlencoded' -d '`+
`grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&`+
`assertion=${encodeURIComponent(signedJWT)}' `+
` ${saJson.token_uri}`);
