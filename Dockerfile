FROM python:3

WORKDIR /usr/src/app

COPY . .
COPY ./requirements.txt .
RUN pip3 install --upgrade pip setuptools && \
    pip3 install -r requirements.txt 

RUN rm -f requirements.txt 

EXPOSE 5000

CMD ["python", "./app.py"]