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

    }
}
