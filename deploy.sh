echo 'hello there deploy'

files=`ls -1 src-tests`
for file in $files;
do
    echo src-tests/$file;
    npm run build --labs:project=src-tests/$file --labs:project-output=deploy/$file
done
