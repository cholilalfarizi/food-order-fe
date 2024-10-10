pipeline {
    agent any

    environment {

        // Environment variables for FE-React
        VITE_API_EXPRESS = 'http://localhost:5000'
        VITE_API_NESTJS = 'http://localhost:3000'
    }

    stages {
        stage('Install Dependencies') {
            parallel {
                stage('Install FE-React') {
                    steps {
                        dir('FE-React') {
                            bat 'npm install'
                        }
                    }
                }
            }
        }
        
        stage('Build') {
            parallel {
                stage('Build FE-React') {
                    steps {
                        dir('FE-React') {
                            bat 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Start Applications') {
            parallel {
                stage('Start FE-React') {
                    steps {
                        dir('FE-React') {
                            bat 'start /B npm run preview'
                        }
                    }
                }
            }
        }
    }
}