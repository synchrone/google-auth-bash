## Poor Man's Google Service Account Key
this converts your service account JSON key into a curl that gets an access token for brute access to GCP APIs in places where it's unfeasible to drag @google-cloud/* libraries

### Usage
* go to https://console.cloud.google.com/iam-admin/serviceaccounts
* choose a service account
* go to Keys tab
* ADD KEY
* Create new key
* key type = JSON
* `./get-token.js ~/Downloads/service-account-xxxxx.json`

### use it in your god-awful bash scripts
* `token="$(./get-token.js ~/Downloads/service-account-xxxxx.json | sh | jq '.access_token')"`
* `curl -H "Authorization: Bearer ${token}" https://....`

### Google products outside Cloud Platform
* `./get-token.js ~/Downloads/service-account-xxxxx.json https://www.googleapis.com/auth/drive`
* more scopes at https://developers.google.com/identity/protocols/oauth2/scopes
