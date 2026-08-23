# Use the official Python 3.13 image
FROM python:3.13-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the backend requirements file
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application into the container
COPY backend/ .

# Expose the Flask port
EXPOSE 5000

# Start the Flask application
CMD ["python", "app.py"]