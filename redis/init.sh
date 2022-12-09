while :
do
    redis-cli quit
    if [ $? -eq 0 ]; then
        echo "Server ready now, start to import data ..."
        cat ./seed.txt | redis-cli --pipe
        break
    else
        echo "server not ready, wait then retry..."
        sleep 3
    fi
done