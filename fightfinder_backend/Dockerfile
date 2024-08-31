# Use uma imagem base do Python
FROM python:3.10.12

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos de requisitos e instale as dependências
COPY requirements.txt .

# Instale as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie o código da aplicação para o container
COPY . .

# Exponha a porta em que o Django irá rodar
EXPOSE 8000

# Comando para iniciar o servidor Django
# CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["sh", "-c", "python3 manage.py makemigrations && python3 manage.py migrate && python3 manage.py runserver 0.0.0.0:8000"]