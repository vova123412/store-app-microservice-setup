

SERVER_SRCDIR=$1
NAMESPACE=$2
cd $SERVER_SRCDIR 
mirrord exec -- npm run dev -a $NAMESPACE



