#! bash
npm version patch
git tag $1
git push origin --tags