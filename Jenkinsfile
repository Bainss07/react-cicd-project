pipeline {
    agent any
    environment {
        AWS_REGION = 'us-east-2'
        ECR_REGISTRY = '910837096291.dkr.ecr.us-east-2.amazonaws.com'
        ECR_REPOSITORY = 'react-app-repo'
        IMAGE_TAG = "${env.BUILD_ID}"
        ECS_CLUSTER = 'react-app-cluster'
        ECS_SERVICE = 'react-app-service'
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
        stage('Deploy to AWS') {
            steps {
                withAWS(credentials: 'aws-ecr-credentials', region: "${AWS_REGION}") {
                    script {
                        sh "aws ecs register-task-definition --cli-input-json file://task-definition.json"
                        sh "aws ecs update-service --cluster ${ECS_CLUSTER} --service ${ECS_SERVICE} --task-definition react-app-task"
                    }
                }
            }
        }
    }
}