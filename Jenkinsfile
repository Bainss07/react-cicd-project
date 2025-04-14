pipeline {
    agent any
    environment {
        AWS_REGION = 'us-east-1'
        ECR_REGISTRY = '910837096291.dkr.ecr.us-east-2.amazonaws.com'
        ECR_REPOSITORY = 'react-app-repo'
        IMAGE_TAG = "${env.BUILD_ID}"
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test -- --watchAll=false'
            }
        }
        stage('Build My Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}")
                }
            }
        }
        stage('Push to ECR') {
            steps {
                withAWS(credentials: 'aws-ecr-credentials', region: "${AWS_REGION}") {
                    script {
                        sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                        dockerImage.push()
                    }
                }
            }
        }
    }
}