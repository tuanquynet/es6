HELP="Please provide TARGET_SERVER. \`SSH_KEY_FILE_PEM=/path/to/pem-file/ TARGET_SERVER=domain sh deploy.sh\`";
if [ ! $SSH_KEY_FILE_PEM ]
then
    echo "$HELP";
    exit 0;
fi;

if [ ! $TARGET_SERVER ]
then
    echo "$HELP";
    exit 0;
fi;

if [ ! $PORT ]
then
    PORT='2294'
fi;

PACKAGE=_book

ssh -i $SSH_KEY_FILE_PEM -p $PORT pi@$TARGET_SERVER "mkdir -p /home/pi/apps/es6"
rsync -avzh --progress -e "ssh -i $SSH_KEY_FILE_PEM -p $PORT" $PACKAGE pi@$TARGET_SERVER:/home/pi/apps/es6
