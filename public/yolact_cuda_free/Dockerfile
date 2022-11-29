FROM ubuntu AS build

ENV PATH="/root/miniconda3/bin:${PATH}"
ARG PATH="/root/miniconda3/bin:${PATH}"

RUN apt-get update && \
    apt-get install -y --no-install-recommends libglib2.0-0 libsm6 libxrender-dev libxext6 &&\
    apt-get install -y build-essential
RUN apt-get install ffmpeg libsm6 libxext6  -y

RUN apt-get install -y wget && rm -rf /var/lib/apt/lists/*

RUN wget \
    https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh \
    && mkdir /root/.conda \
    && bash Miniconda3-latest-Linux-x86_64.sh -b 


RUN conda install flask
RUN conda install pillow
RUN conda install pip
RUN pip install torch
RUN pip install torchvision
RUN pip install opencv-python
RUN pip install cython
RUN pip install numpy
RUN conda install -c conda-forge pycocotools


COPY . .

CMD  python app.py