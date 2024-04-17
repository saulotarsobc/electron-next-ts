#! bash
echo -e "\033[33m\n\n=====> git status -s\n\033[0m"
git status -s;

echo -e "\033[33m\n\n=====> git diff --color | grep + \n\033[0m"
git diff --color | grep "+";

echo -e "\033[33m\n\n=====> git add --all \n\033[0m"
git add --all;

echo -e "\033[33m\n\n=====> git commit -m ':fire:$1' \n\033[0m"
git commit -m ":fire:$1";

echo -e "\033[33m\n\n=====> git push \n\033[0m"
git push;