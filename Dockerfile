<<<<<<< HEAD
FROM python:3.9

# Set the working directory
WORKDIR /app

# Create a virtual environment
RUN python -m venv venv

# Activate the virtual environment
ENV PATH="/app/venv/bin:$PATH"

# Upgrade pip within the virtual environment
RUN /app/venv/bin/python -m pip install --upgrade pip

# Copy the requirements file
COPY requirements.txt .

# Install the dependencies
RUN /app/venv/bin/pip install -r requirements.txt

# Copy the application code
COPY . .

# Expose the port
EXPOSE 8080

# Define the command to run the application
CMD ["gunicorn", "-b", ":8080", "main:app"]
=======
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]

RUN npm install -g sequelize-cli

# ⚠️Set the environment variable to control seeding during migration
ENV RUN_SEED=false

RUN sequelize db:migrate
RUN sequelize db:seed:all
>>>>>>> origin/main
