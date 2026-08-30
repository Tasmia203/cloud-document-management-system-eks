# Use the official Python 3.13 image
FROM python:3.13-slim

# Set the working directory inside the container
WORKDIR /app

# Create a non-root user
RUN useradd --create-home --shell /bin/bash --uid 1000 appuser

# Copy the backend requirements file
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application into the container
COPY backend/ .

# Copy frontend into Flask static folder
COPY frontend/ ./static/

# Give the application user ownership of the application files
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Expose the Flask port
EXPOSE 5000

# Start the Flask application
CMD ["python", "app.py"]