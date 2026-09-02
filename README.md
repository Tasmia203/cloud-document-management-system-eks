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

The Cloud File Manager application is deployed on Amazon EKS and exposed through an AWS Application Load Balancer using Kubernetes Ingress and the AWS Load Balancer Controller.

### Frontend

The application provides a web interface for interacting with files stored in Amazon S3.

Users can:

- Select files
- Upload files
- View uploaded files
- Download files
- Delete files

<img width="1484" height="856" alt="cloud-file-manager" src="https://github.com/user-attachments/assets/42050d7d-9d0a-42fe-9d9a-e41f0b111fdc" />

### Live API

The backend API is also accessible through the AWS Application Load Balancer.

<img width="1499" height="342" alt="live-api" src="https://github.com/user-attachments/assets/16e264e4-3b83-4722-b465-738e503fabf8" />

---

# Architecture Diagram

<img width="428" height="528" alt="architecture-diagram" src="https://github.com/user-attachments/assets/b29fb3ab-ce2e-48b5-b971-fbc4297c8362" />


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

### Docker Build

<img width="686" height="407" alt="docker-build" src="https://github.com/user-attachments/assets/6ea02c1b-7162-4446-bfb3-bb07d505d729" />

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

<img width="1511" height="775" alt="ecr-repository" src="https://github.com/user-attachments/assets/b7fab591-8680-4b3e-a095-efdacf04bb86" />

### ECR Images

<img width="1512" height="802" alt="ecr-images" src="https://github.com/user-attachments/assets/5d3ca6d0-4fda-45f0-a7a6-8c899e334f58" />


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

<img width="1510" height="793" alt="eks-cluster" src="https://github.com/user-attachments/assets/44e2e43d-97e4-4dd8-ab2b-0462cf1d90f2" />


### Kubernetes Pods

<img width="689" height="114" alt="eks-pods" src="https://github.com/user-attachments/assets/f3603c78-77c4-4020-b147-20bf760d8f4a" />

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

<img width="1511" height="829" alt="s3-bucket" src="https://github.com/user-attachments/assets/39970b94-34b1-49cd-917d-5bf1c8ea78b5" />

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

<img width="915" height="574" alt="terraform" src="https://github.com/user-attachments/assets/07ce8249-b40b-4f36-abde-e81377fadeab" />

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

<img width="1509" height="831" alt="github-actions-success" src="https://github.com/user-attachments/assets/e1f5e515-9c64-46dc-abe0-b2fcc9d9e887" />

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

### Helm Release

<img width="1129" height="73" alt="helm-release" src="https://github.com/user-attachments/assets/b01277dc-2960-41a7-bca7-833c0b57aebf" />

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

### Alb Ingress

<img width="872" height="61" alt="alb-ingress" src="https://github.com/user-attachments/assets/99eb53a9-cebd-4d93-983f-bae1e4957555" />

### Load Balancer

<img width="1507" height="836" alt="load-balancer" src="https://github.com/user-attachments/assets/36c40954-2d62-400f-a734-8570051d1a07" />

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

<img width="1506" height="864" alt="prometheus-targets-top" src="https://github.com/user-attachments/assets/806fa74d-8c37-4b09-9a6d-05025668feda" />

<img width="1503" height="868" alt="prometheus-targets-bottom" src="https://github.com/user-attachments/assets/a94927a7-d7a5-4562-b5a8-6365667e49f4" />


### Grafana Dashboard

<img width="1486" height="843" alt="grafana-dashboard" src="https://github.com/user-attachments/assets/1df00f20-d38e-4b5a-895f-e382f8bde71a" />

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

### HPA Scaling

<img width="914" height="224" alt="hpa-scaling" src="https://github.com/user-attachments/assets/7bcaa87c-6b93-4940-b88d-11c943b7732b" />

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

### Production Security

<img width="1491" height="742" alt="production-security" src="https://github.com/user-attachments/assets/7ade3de4-e44b-418d-ba68-d2ca4ba3e17a" />

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

<img width="878" height="346" alt="final-kubernetes-state" src="https://github.com/user-attachments/assets/d1da70f7-b4ea-45f5-a0fa-82229ff49823" />

<img width="1500" height="825" alt="final-application" src="https://github.com/user-attachments/assets/53bd7d8f-b708-4916-96a9-cf93eaec239e" />

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

