pipeline {
    agent any

    stages {
        stage("Install Environment"){
            steps {
                sh 'sudo apt install curl'
                sh 'curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash'
                sh 'export NVM_DIR="$HOME/.nvm"'
                sh 'source ~/.bashrc'
                sh 'nvm install 18.19.0'
                sh 'nvm use 18.19.0'
            }
        }
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
