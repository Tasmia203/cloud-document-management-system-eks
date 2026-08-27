from flask import Flask, request, jsonify, send_from_directory, redirect
from flask_cors import CORS
import boto3
import os

app = Flask(__name__)
CORS(app)

BUCKET_NAME = os.environ["BUCKET_NAME"]

s3 = boto3.client(
    "s3",
    region_name=os.environ["AWS_DEFAULT_REGION"],
    aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"]
)


@app.route("/")
def home():
    return send_from_directory("static", "index.html")


@app.route("/style.css")
def style():
    return send_from_directory("static", "style.css")


@app.route("/script.js")
def script():
    return send_from_directory("static", "script.js")


@app.route("/upload", methods=["POST"])
def upload_file():

    if "file" not in request.files:
        return jsonify({"error": "No file selected"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    s3.upload_fileobj(file, BUCKET_NAME, file.filename)

    return jsonify({"message": "File uploaded successfully"})


@app.route("/files", methods=["GET"])
def list_files():

    response = s3.list_objects_v2(Bucket=BUCKET_NAME)

    files = []

    if "Contents" in response:
        files = [obj["Key"] for obj in response["Contents"]]

    return jsonify(files)


@app.route("/download/<filename>")
def download_file(filename):

    url = s3.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": BUCKET_NAME,
            "Key": filename
        },
        ExpiresIn=300
    )

    return redirect(url)


@app.route("/delete/<filename>", methods=["DELETE"])
def delete_file(filename):

    s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=filename
    )

    return jsonify({"message": "File deleted successfully"})

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)