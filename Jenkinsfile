pipeline{
    agent any
    stages{
        stage("Checkout"){
            steps{
                checkout scm
            }
        }
        stage("Install Depencencies"){
            steps{
                sh 'npm install'
            }
        }
        stage("DB Migration"){
            steps{
                sh 'npm run db:migrate'
                sh 'npm run db:push'
            }
        }
        stage("Deploy"){
            steps{
                sh 'npm run deploy'
            }
        }
        stage("Build Image"){
       steps{
             sh ''
       }
        }
    }
}