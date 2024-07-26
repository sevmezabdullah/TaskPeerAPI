pipeline {
    agent any
    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        stage("Install Dependencies") {
            steps {
                sh 'npm install'
            }
        }
        stage("DB Migration") {
            steps {
                sh 'npm run db:migrate'
                sh 'npm run db:push'
            }
        }
        stage("Deploy") {
            steps {
                sh 'npm run deploy'
            }
        }
        stage("Build Image") {
            steps {
                // 'sh' komutunun içeriğini doldurun veya kaldırın.
                sh 'echo "Building Docker image..."'
            }
        }
    }
}
