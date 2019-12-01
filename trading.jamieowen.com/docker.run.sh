docker run \
--rm \
-p 10001:8888 \
-v "$PWD"/container-data/home-volume:/home/jovyan \
-e JUPYTER_ENABLE_LAB=yes \
trading.jamieowen.com