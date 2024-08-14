# install everything
yarn install

# setup typewriter functions
yarn run typewriter:dev

# add upstream remote as a remote to pull changes from
# Ask if the remote should be set using https, ssh or cli versions
PS3="How would you like to setup the upstream fork repository connection? "

select opt in ssh https; do
  case $opt in
    ssh)
      git remote add upstream git@github.com:GuildEducationInc/employer-portal-remote-template.git
      break;;
    https)
      git remote add upstream https://github.com/GuildEducationInc/employer-portal-remote-template.git
      break;;
    *) 
      echo "$REPLY is an invalid option. Please enter 1 or 2 or press ctrl+c to exit."
  esac
done

# Disable push url of upstream
git remote set-url --push upstream no_push