FROM vibber/yolact_cpu AS build

COPY environment.yml/ environment.yml

RUN pip install flask

COPY . .

CMD  python app.py