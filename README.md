# AWS Cloud File Manager on Amazon EKS (Docker + ECR + EKS + Terraform + Helm + CI/CD)

## Project Overview

This project demonstrates how to deploy a containerized cloud-based file management application on AWS using modern cloud engineering and Kubernetes practices.

The application was built using Python Flask and allows users to upload, list, download, and delete files stored in Amazon S3.

The application was containerized using Docker and the Docker image was stored in Amazon Elastic Container Registry (ECR). The application was deployed on Amazon Elastic Kubernetes Service (EKS), where Kubernetes manages application containers, networking, health checks, service discovery, and autoscaling.

Terraform was used for Infrastructure as Code (IaC), while GitHub Actions was implemented as a CI/CD pipeline to automate Docker image builds, ECR image pushes, and Kubernetes deployments.

Helm was used to package and manage Kubernetes resources. An AWS Application Load Balancer (ALB) was configured using Kubernetes Ingress and the AWS Load Balancer Controller.

Prometheus and Grafana were implemented for Kubernetes monitoring, while a Horizontal Pod Autoscaler (HPA) was configured to automatically scale the application based on CPU utilization.

Production-oriented security improvements were also implemented, including Kubernetes Secrets, ConfigMaps, resource requests and limits, health probes, non-root container execution, and a default seccomp profile.

This project demonstrates containerization, Kubernetes, Infrastructure as Code, CI/CD, cloud networking, load balancing, monitoring, autoscaling, storage, and container security.

---

# Project Objectives

- Build a cloud-based file management application using Flask
- Store application files in Amazon S3
- Containerize the application using Docker
- Store Docker images in Amazon ECR
- Deploy the application on Amazon EKS
- Provision infrastructure using Terraform
- Implement CI/CD using GitHub Actions
- Package Kubernetes resources using Helm
- Configure an AWS Application Load Balancer using Kubernetes Ingress
- Implement Kubernetes health probes
- Configure CPU and memory requests and limits
- Implement Horizontal Pod Autoscaling
- Monitor Kubernetes resources using Prometheus
- Visualize metrics using Grafana
- Run containers as non-root users
- Demonstrate production-oriented Kubernetes deployment practices

---

# AWS Services Used

- Amazon S3
- Amazon Elastic Container Registry (ECR)
- Amazon Elastic Kubernetes Service (EKS)
- Application Load Balancer (ALB)
- AWS Load Balancer Controller
- AWS Identity and Access Management (IAM)
- Amazon Elastic Block Store (EBS)
- Amazon EBS CSI Driver
- Amazon VPC
- Security Groups

---

# Technologies Used

- Python
- Flask
- Boto3
- HTML
- CSS
- JavaScript
- Docker
- Kubernetes
- Amazon EKS
- Amazon ECR
- Helm
- Terraform
- Git
- GitHub
- GitHub Actions
- Prometheus
- Grafana
- Metrics Server
- Horizontal Pod Autoscaler
- YAML
- REST API
---

# Live Application

The Cloud File Manager application is deployed on Amazon EKS and exposed through an AWS Application Load Balancer.

<img width="1484" height="856" alt="cloud-file-manager" src="https://github.com/user-attachments/assets/117f651f-9ae0-468e-88af-a1e2835d7bf0" />

### Live API

The backend API is also accessible through the ALB.

<img width="1499" height="342" alt="live-api" src="https://github.com/user-attachments/assets/88fe506e-2d8e-43eb-82d0-ec4effd3228d" />

---

# Architecture Diagram

![](screenshots/architecture-diagram.png)

---

# Frontend

The Cloud File Manager frontend provides a simple web interface for interacting with the application.

Users can:

- Select files
- Upload files
- View uploaded files
- Download files
- Delete files

The frontend is copied into the Flask application's static directory during the Docker image build.

![](screenshots/cloud-file-manager-frontend.png)

---

# Live Application

The application is exposed through an AWS Application Load Balancer created through Kubernetes Ingress and the AWS Load Balancer Controller.

![](screenshots/live-application.png)

---

# Project Phases

## Phase 1 – Flask Backend

### Completed Tasks

- Created Flask backend application
- Implemented REST API endpoints
- Integrated Flask with Amazon S3 using Boto3
- Implemented file upload functionality
- Implemented file listing functionality
- Implemented file download functionality
- Implemented file deletion functionality
- Implemented `/health` health-check endpoint
- Configured Flask to run on port 5000

### API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/` | GET | Serves the frontend |
| `/upload` | POST | Uploads a file to S3 |
| `/files` | GET | Lists files stored in S3 |
| `/download/<filename>` | GET | Generates a presigned download URL |
| `/delete/<filename>` | DELETE | Deletes an S3 file |
| `/health` | GET | Returns application health status |

The backend source code is available in:

```text
backend/app.py
```

---

## Phase 2 – Docker

### Completed Tasks

- Created Dockerfile
- Used Python 3.13 slim image
- Installed application dependencies
- Copied backend application into the container
- Copied frontend into the Flask static directory
- Exposed port 5000
- Created a non-root application user
- Assigned UID 1000 to the application user
- Configured the container to run as `appuser`
- Verified the Docker image build successfully

### Evidence

![](screenshots/01-docker-build.png)

---

## Phase 3 – Amazon Elastic Container Registry (ECR)

### Completed Tasks

- Created Amazon ECR repository
- Configured the `cloud-file-manager` repository
- Built Docker image
- Tagged Docker image
- Authenticated Docker with Amazon ECR
- Pushed Docker image to Amazon ECR
- Verified uploaded container images

### ECR Repository

```text
cloud-file-manager
```

### Evidence

![](screenshots/02-ecr-repository.png)

---

## Phase 4 – Amazon Elastic Kubernetes Service (EKS)

### Completed Tasks

- Created Amazon EKS cluster
- Created Kubernetes worker nodes
- Configured Kubernetes networking
- Connected `kubectl` to the EKS cluster
- Deployed the Cloud File Manager application
- Verified Kubernetes nodes
- Verified application pods
- Configured Kubernetes Deployment

### EKS Cluster

```text
cloud-file-manager
```

### Evidence

![](screenshots/03-eks-cluster.png)

### Kubernetes Pods

![](screenshots/04-eks-pods.png)

---

## Phase 5 – Amazon S3 Integration

### Completed Tasks

- Created Amazon S3 bucket
- Integrated Flask backend with Amazon S3
- Configured Boto3
- Implemented S3 upload
- Implemented S3 file listing
- Implemented S3 deletion
- Implemented presigned download URLs
- Configured the S3 bucket name through Kubernetes configuration
- Verified application access to S3

### S3 Bucket

```text
tasmia-cloud-file-manager
```

### Evidence

![](screenshots/05-s3-bucket.png)

---

## Phase 6 – Terraform

### Completed Tasks

- Initialized Terraform
- Configured AWS provider
- Created Terraform infrastructure definitions
- Configured Terraform variables
- Configured Terraform outputs
- Validated Terraform configuration
- Reviewed infrastructure changes using Terraform plan
- Applied infrastructure using Terraform

### Terraform Commands

```bash
terraform init
terraform validate
terraform plan
terraform apply
```

### Evidence

![](screenshots/06-terraform-folder.png)

![](screenshots/07-terraform-plan.png)

![](screenshots/08-terraform-apply.png)

---

## Phase 7 – GitHub Actions CI/CD

### Completed Tasks

- Created GitHub Actions workflow
- Configured GitHub repository secrets
- Configured AWS credentials
- Configured Amazon ECR authentication
- Automated Docker image builds
- Automated Docker image pushes to ECR
- Automated Helm deployment to EKS
- Configured Kubernetes rollout verification
- Verified successful CI/CD deployments

### CI/CD Workflow

```text
Git Push
   |
   v
GitHub Actions
   |
   v
Checkout Repository
   |
   v
Configure AWS Credentials
   |
   v
Login to Amazon ECR
   |
   v
Build Docker Image
   |
   v
Push Image to ECR
   |
   v
Configure kubectl
   |
   v
Deploy Helm Chart
   |
   v
Verify Kubernetes Rollout
```

### Evidence

![](screenshots/09-github-actions-success.png)

---

## Phase 8 – Helm

### Completed Tasks

- Created Helm chart
- Created `Chart.yaml`
- Created `values.yaml`
- Created Helm templates
- Converted Kubernetes Deployment to Helm
- Converted Kubernetes Service to Helm
- Converted ConfigMap to Helm
- Converted Ingress to Helm
- Added HPA Helm template
- Parameterized container image configuration
- Parameterized resource requests and limits
- Parameterized AWS region and S3 bucket
- Verified Helm chart using `helm lint`
- Rendered Helm templates using `helm template`
- Deployed application using Helm

### Helm Commands

```bash
helm lint cloud-file-manager
```

```bash
helm template cloud-file-manager ./cloud-file-manager
```

```bash
helm upgrade --install cloud-file-manager ./cloud-file-manager
```

### Evidence

![](screenshots/10-helm-chart.png)

![](screenshots/11-helm-release.png)

---

## Phase 9 – AWS ALB Ingress

### Completed Tasks

- Converted application Service to ClusterIP
- Installed AWS Load Balancer Controller
- Associated IAM OIDC provider with EKS
- Created AWS Load Balancer Controller IAM policy
- Created IAM service account
- Installed AWS Load Balancer Controller
- Created Kubernetes Ingress
- Configured internet-facing ALB
- Configured IP target mode
- Automatically created an AWS Application Load Balancer
- Registered Kubernetes pods as ALB targets
- Verified ALB DNS resolution
- Verified application access through the ALB

### Traffic Flow

```text
Internet
   |
   v
AWS Application Load Balancer
   |
   v
Kubernetes Ingress
   |
   v
ClusterIP Service
   |
   v
Flask Application Pods
```

### Evidence

![](screenshots/12-alb-ingress.png)

![](screenshots/13-load-balancer.png)

### Validation

```bash
kubectl get ingress
```

```bash
nslookup <ALB-DNS>
```

```bash
curl http://<ALB-DNS>
```

---

## Phase 10 – Monitoring and Logging

### Completed Tasks

- Installed Prometheus using Helm
- Installed Grafana
- Installed kube-state-metrics
- Installed Prometheus Node Exporter
- Verified Metrics Server
- Installed Amazon EBS CSI Driver
- Configured Kubernetes persistent storage
- Verified Prometheus Server
- Verified Prometheus targets
- Verified Kubernetes node metrics
- Verified Kubernetes pod metrics
- Verified cAdvisor metrics
- Verified Prometheus health
- Verified Grafana availability

### Prometheus Monitoring

Prometheus successfully monitored:

- Kubernetes API servers
- Kubernetes nodes
- cAdvisor container metrics
- Kubernetes pods
- Kubernetes service endpoints
- Prometheus itself
- Node Exporter
- kube-state-metrics

### Prometheus Targets

![](screenshots/14-prometheus-targets.png)

### Grafana Dashboard

![](screenshots/15-grafana-dashboard.png)

### Monitoring Commands

```bash
kubectl get pods
```

```bash
kubectl top pods
```

```bash
kubectl top nodes
```

---

## Phase 11 – Horizontal Pod Autoscaler (HPA)

### Completed Tasks

- Verified Metrics Server
- Created Horizontal Pod Autoscaler
- Configured CPU-based autoscaling
- Configured minimum replicas
- Configured maximum replicas
- Created controlled CPU load
- Verified HPA CPU metrics
- Verified automatic replica creation
- Verified application scaling
- Converted HPA into a Helm-managed resource

### HPA Configuration

```yaml
minReplicas: 1
maxReplicas: 3
targetCPUUtilizationPercentage: 50
```

### Scaling Demonstration

```text
1 Application Pod
        |
        v
   CPU Load
        |
        v
2 Application Pods
        |
        v
Higher CPU Load
        |
        v
3 Application Pods
```

### HPA Evidence

![](screenshots/16-hpa-scaling.png)

### HPA Commands

```bash
kubectl get hpa
```

```bash
kubectl describe hpa cloud-file-manager
```

---

## Phase 12 – Production Readiness

### Completed Tasks

- Configured liveness probe
- Configured readiness probe
- Configured CPU resource requests
- Configured CPU limits
- Configured memory requests
- Configured memory limits
- Stored AWS credentials in Kubernetes Secrets
- Stored application configuration in ConfigMaps
- Configured Kubernetes security context
- Configured non-root container execution
- Assigned UID 1000 to the application user
- Configured `runAsNonRoot`
- Configured `seccompProfile: RuntimeDefault`
- Verified application deployment health
- Verified HPA configuration
- Verified application access through ALB
- Audited Git repository for exposed AWS credentials

### Health Probes

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 5000
```

```yaml
readinessProbe:
  httpGet:
    path: /health
    port: 5000
```

### Resource Configuration

```yaml
resources:
  requests:
    cpu: "100m"
    memory: "128Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"
```

### Container Security

The application container runs as a non-root user:

```text
uid=1000(appuser)
gid=1000(appuser)
groups=1000(appuser)
```

Kubernetes security configuration:

```yaml
securityContext:
  runAsUser: 1000
  runAsGroup: 1000
  runAsNonRoot: true
  seccompProfile:
    type: RuntimeDefault
```

### Evidence

![](screenshots/17-production-readiness.png)

![](screenshots/18-non-root-container.png)

---

# Final Kubernetes Validation

```bash
kubectl get pods
```

```bash
kubectl get svc
```

```bash
kubectl get ingress
```

```bash
kubectl get hpa
```

### Final Helm Validation

```bash
helm list
```

### Final Application Validation

```bash
curl http://<ALB-DNS>/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

### Evidence

![](screenshots/19-final-kubernetes-state.png)

![](screenshots/20-final-application.png)

---

# Kubernetes Resources

The project uses the following Kubernetes resources:

- Deployment
- Service
- ConfigMap
- Secret
- Ingress
- HorizontalPodAutoscaler
- ServiceAccount
- PersistentVolumeClaim
- StorageClass
- TargetGroupBinding

---

# Storage

Amazon EBS was configured through the Amazon EBS CSI Driver to support Kubernetes persistent storage.

The EBS CSI Driver was installed as an EKS add-on.

The Kubernetes `gp2` StorageClass was configured as the default StorageClass.

---

# Security

Security practices implemented in this project include:

- AWS credentials stored in GitHub Secrets
- AWS credentials referenced through Kubernetes Secrets
- No AWS credentials committed to source control
- Non-root Docker container
- Explicit UID 1000 for application user
- Kubernetes `runAsNonRoot`
- Runtime default seccomp profile
- Kubernetes resource requests and limits
- Liveness probes
- Readiness probes
- Kubernetes Service configured as ClusterIP behind the ALB Ingress
- IAM roles for AWS infrastructure components

---

# CI/CD

The GitHub Actions pipeline automatically builds and deploys the application when changes are pushed to the `main` branch.

The workflow performs:

1. Checkout source code
2. Configure AWS credentials
3. Login to Amazon ECR
4. Build Docker image
5. Push image to ECR
6. Configure Kubernetes access
7. Deploy the Helm chart
8. Verify the Kubernetes rollout

---

# Monitoring

Prometheus collects Kubernetes metrics from the EKS cluster.

Grafana provides visualization for:

- CPU utilization
- Memory utilization
- Kubernetes nodes
- Kubernetes pods
- Container metrics
- Cluster health

---

# Autoscaling

The Horizontal Pod Autoscaler monitors CPU utilization for the Cloud File Manager Deployment.

Configured values:

```text
Minimum replicas: 1
Maximum replicas: 3
CPU target: 50%
```

The application was tested under CPU load and successfully scaled beyond a single replica.

---

# Troubleshooting Experience

During the deployment of this project, several Kubernetes and AWS infrastructure issues were identified and resolved.

### EKS IAM Permissions

The CI/CD deployment initially encountered an EKS IAM permission issue involving cluster access.

The required IAM permissions were configured and Kubernetes access was restored.

### Kubernetes Authentication

`kubectl` initially failed to authenticate against the EKS cluster.

The AWS IAM permissions and kubeconfig configuration were corrected.

### Helm Resource Ownership

Helm initially reported ownership conflicts for existing Kubernetes resources.

Existing resources were reconciled so that Helm could manage them correctly.

### Persistent Storage

Prometheus initially remained pending because no StorageClass was assigned.

The `gp2` StorageClass was configured as the default StorageClass.

### Amazon EBS CSI Driver

Persistent volume provisioning initially failed because the Amazon EBS CSI Driver was not installed.

The EBS CSI Driver was installed as an EKS add-on with an IAM role.

### Pod Capacity

The two `t3.small` worker nodes reached their pod capacity.

Optional monitoring workloads were reduced so the core application and monitoring components could run within the available pod capacity.

### Container Security

The initial non-root configuration failed because Kubernetes could not verify the named `appuser` as non-root.

The application user was assigned an explicit numeric UID of `1000`, and Kubernetes was configured to run the container using that UID.

These troubleshooting experiences provided practical experience with Kubernetes IAM, networking, storage, scheduling, Helm, container security, and EKS operations.

---

# Skills Demonstrated

- Python
- Flask
- REST API Development
- Amazon S3
- Docker
- Amazon ECR
- Amazon EKS
- Kubernetes
- Helm
- Terraform
- GitHub Actions
- CI/CD
- AWS IAM
- Kubernetes Secrets
- Kubernetes ConfigMaps
- Kubernetes Ingress
- AWS Application Load Balancer
- AWS Load Balancer Controller
- Amazon EBS
- EBS CSI Driver
- Prometheus
- Grafana
- Metrics Server
- Horizontal Pod Autoscaler
- Container Security
- Health Probes
- Resource Management
- Cloud Networking
- Infrastructure as Code
- Kubernetes Troubleshooting

---

# Key Learning Outcomes

Through this project I learned how to:

- Build a Flask-based cloud application.
- Integrate a backend application with Amazon S3.
- Containerize applications using Docker.
- Store container images in Amazon ECR.
- Deploy applications to Amazon EKS.
- Manage Kubernetes Deployments and Services.
- Package Kubernetes applications using Helm.
- Provision cloud infrastructure using Terraform.
- Automate deployments with GitHub Actions.
- Configure an AWS Application Load Balancer using Kubernetes Ingress.
- Configure the AWS Load Balancer Controller.
- Configure Kubernetes health probes.
- Configure CPU and memory requests and limits.
- Implement Horizontal Pod Autoscaling.
- Monitor Kubernetes infrastructure using Prometheus.
- Visualize infrastructure metrics using Grafana.
- Configure Amazon EBS persistent storage.
- Configure Kubernetes Secrets and ConfigMaps.
- Run containers securely as non-root users.
- Troubleshoot Kubernetes scheduling, IAM, storage, networking, and deployment issues.

---

# Future Improvements

- Enable HTTPS using AWS Certificate Manager (ACM)
- Configure a custom domain using Route 53
- Replace static AWS application credentials with IAM-based application access
- Integrate AWS Secrets Manager
- Configure centralized application logging
- Configure Grafana alerting
- Configure Prometheus alerting
- Add Kubernetes NetworkPolicies
- Add automated application tests to CI/CD
- Add container image vulnerability scanning
- Implement blue/green or canary deployments
- Add more advanced observability
- Configure production-grade persistent monitoring storage

Cloud / IT Infrastructure Portfolio Project
