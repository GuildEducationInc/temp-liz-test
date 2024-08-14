# Gives a warning if the upstream main branch is ahead of the current branch.

git fetch upstream

# check if behind the main branch of the template
var=`git rev-list --left-right --count  upstream/main...HEAD | awk '{print $1}' | xargs echo`

# If behind, set env var to show update warning. Display logic is located in webpack.dev
if [[ $var -gt 0 ]]
then
  export REACT_APP_UPSTREAM_UPDATES=true
  echo $REACT_APP_UPSTREAM_UPDATES
fi

cross-env NODE_ENV=development webpack serve
