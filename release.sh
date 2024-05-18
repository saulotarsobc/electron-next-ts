#! bash
npm version patch
git tag "v$1"
git push origin --tags