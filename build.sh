echo 'hello there deploy'

# Build all projects

files=`ls -1 src-tests | cut -d "." -f 1`
for file in $files;
do
    echo $file
    npm run build --labs:input=src-tests/$file.js --labs:output=deploy/$file.min.js
done
