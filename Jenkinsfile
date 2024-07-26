pipeline {
    agent any
    tools{
        nodejs "nodejs"
    }

    stages {

        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        stage("Install Dependencies") {
            steps {
                sh 'npm install --force'
            }
        }
        stage("DB Migration") {
            steps {
                sh 'npm run db:generate'
                sh 'npm run db:migrate'
                
            }
        }
        stage("Deploy") {
            steps {
                sh 'npm i -g bun'
                sh 'npm run deploy'
            }
        }

        stage("Information"){
            steps{
                sh 'curl ifconfig.me'
            }
        }
            stage('Deploy to CapRover') {
            steps {
                sh '''
                docker build -t root/task_peer .
                captain login --server https://captain.api.digiqrmenu.com.tr/ --user admin --password captain42
                captain deploy -p ./Dockerfile --app root/task_peer
                '''
            }
        }

    }
}
