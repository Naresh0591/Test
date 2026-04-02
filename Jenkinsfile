pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        skipDefaultCheckout()
        durabilityHint('PERFORMANCE_OPTIMIZED')
    }

    tools {
        jdk 'jdk17'
        nodejs 'node18'
    }

    environment {
        SCANNER_HOME   = tool 'sonar-scanner'
        DOCKERHUB_USER = 'naresh9163'
        IMAGE_NAME     = "${DOCKERHUB_USER}/hotstar"
        EKS_REGION     = 'us-east-1'
        EKS_CLUSTER    = 'cloudhotstar'
    }

    stages {

        stage('Clean Workspace') {
            steps { cleanWs() }
        }

        stage('Checkout from Git') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Naresh0591/Hotstar-devops.git',
                        credentialsId: 'github-token'
                    ]]
                ])
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh """
                        ${SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectName=hotstar \
                        -Dsonar.projectKey=hotstar
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    pwd && ls -la
                    cd hotstar
                    npm install
                '''
            }
        }

        stage('TRIVY FS Scan') {
            steps {
                sh 'trivy fs . > trivyfs.txt'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                    withCredentials([string(credentialsId: 'tmdb-api-key', variable: 'TMDB_KEY')]) {
                        sh """
                            docker build --no-cache \
                              --build-arg REACT_APP_TMDB=${TMDB_KEY} \
                              -t ${IMAGE_NAME}:${BUILD_NUMBER} hotstar/
                            docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                            docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                            docker push ${IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }

        stage('TRIVY Image Scan') {
            steps {
                sh "trivy image ${IMAGE_NAME}:${BUILD_NUMBER} > trivyimage.txt"
            }
        }

        stage('Deploy to EKS') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh """
                        export AWS_DEFAULT_REGION=${EKS_REGION}
                        aws eks update-kubeconfig --region ${EKS_REGION} --name ${EKS_CLUSTER}
                        sed -i "s|${IMAGE_NAME}:latest|${IMAGE_NAME}:${BUILD_NUMBER}|g" deployment.yml
                        kubectl apply -f deployment.yml
                        kubectl rollout status deployment/hotstar
                        kubectl get pods
                        kubectl get svc
                    """
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'trivyfs.txt, trivyimage.txt', allowEmptyArchive: true
            echo 'Pipeline execution complete.'
        }

        success {
            echo "Pipeline succeeded! Image ${IMAGE_NAME}:${BUILD_NUMBER} deployed."
        }

        failure {
            emailext(
                subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Check Jenkins logs: ${env.BUILD_URL}",
                to: 'your-email@gmail.com'
            )
        }

        cleanup {
            sh "docker rmi ${IMAGE_NAME}:${BUILD_NUMBER} || true"
        }
    }
}
