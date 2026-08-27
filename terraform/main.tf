resource "aws_s3_bucket" "cloud_file_manager" {
  bucket = "tasmia-cloud-file-manager"
}

resource "aws_ecr_repository" "cloud_file_manager" {
  name = "cloud-file-manager"

  image_scanning_configuration {
    scan_on_push = true
  }

  image_tag_mutability = "MUTABLE"
}


resource "aws_iam_policy" "cloud_file_manager_policy" {
  name        = "CloudFileManagerS3Policy"
  description = "Allows Kubernetes application to upload, download, list and delete files in the S3 bucket."

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Sid    = "VisualEditor0"
        Effect = "Allow"

        Action = [
          "s3:ListBucket"
        ]

        Resource = [
          "arn:aws:s3:::tasmia-cloud-file-manager"
        ]
      },
      {
        Sid    = "VisualEditor1"
        Effect = "Allow"

        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject"
        ]

        Resource = [
          "arn:aws:s3:::tasmia-cloud-file-manager/*"
        ]
      }
    ]
  })
}