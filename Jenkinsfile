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
             sh '''
                    #!/usr/bin/expect -f
                    set timeout -1
                    spawn npm run db:push
                    expect {
                        "abort/yes" {
                            send "yes\r"
                            exp_continue
                        }
                    }
                    interact
                    '''
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
