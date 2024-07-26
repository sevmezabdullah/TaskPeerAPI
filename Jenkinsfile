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

    }
      post {
        success {
            sh '''curl -X POST -H 'Content-Type: application/json' -d '{"chat_id": "882145688", "text": "🚀 Task Peer Deployment Succeed ", "disable_notification": false}' https://api.telegram.org/bot7363271537:AAE51HI4oRHJMfZWKNuXjMk1uNrkxcjSAK8/sendMessage'''
    }

        failure {
            sh '''curl -X POST -H 'Content-Type: application/json' -d '{"chat_id": "882145688", "text": "😭 Task Peer Deployment Failed ", "disable_notification": false}' https://api.telegram.org/bot7363271537:AAE51HI4oRHJMfZWKNuXjMk1uNrkxcjSAK8/sendMessage'''
        }
  }
}
