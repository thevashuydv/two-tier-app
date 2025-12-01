pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = ''    // not needed if building locally without registry
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/<your-username>/two-tier-docker-jenkins.git'
            }
        }

        stage('Build Docker image') {
            steps {
                sh 'docker build -t two-tier-app:latest .'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d --build'
            }
        }

        stage('Integration Tests') {
            steps {
                sh './scripts/run-tests.sh'
            }
        }
    }

    post {
        always {
            sh 'docker ps'
        }
    }
}

