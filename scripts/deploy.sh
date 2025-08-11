# Script to deploy the application to production or staging environment

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    -e|--environment)
      environment="$2"
      shift
      shift
      ;;
    *)
      echo "Invalid argument: $1"
      exit 1
      ;;
  esac
done

# Ask for the environment if not provided as an argument
if [ -z "$environment" ]; then
  echo "Which environment do you want to deploy to?"
  PS3="Select an environment: "
  select environment in "production" "staging"; do
    break;
  done
fi

# Check if the environment is valid
if [ "$environment" != "production" ] && [ "$environment" != "staging" ]; then
  echo "Invalid environment"
  exit 1
fi

# Deploy to the environment based on the environment
if [ "$environment" == "production" ]; then

  # Check current branch in main
  if [ "$(git branch --show-current)" != "main" ]; then
    echo "You can only deploy to production from the main branch"
    exit 1
  fi

  echo "Deploying to production"
  firebase use production
  firebase deploy --only hosting
else
  echo "Deploying to staging"
  firebase use staging
  # Change environment variables to production
  cp .env.production .env.production.backup
  cp .env.development .env.production 
  firebase deploy --only hosting
  # Restore environment variables to development
  cp .env.production.backup .env.production
  rm .env.production.backup
fi
