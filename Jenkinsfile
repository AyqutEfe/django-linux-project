pipeline {
    agent any

    environment {
        DOCKER_IMAGE       = "ayqutfe/django-multistage"
        IMAGE_TAG          = "v1.0.${BUILD_NUMBER}"
        SWARM_MANAGER_IP   = "10.53.0.105"
        SWARM_MANAGER_USER = "ubuntu"
        STACK_NAME         = "my-django-stack"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/AyqutEfe/django-linux-project.git'
            }
        }

        stage('Build') {
            steps {
                sh """
                    docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} -t ${DOCKER_IMAGE}:latest .
                """
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
                        docker push ${DOCKER_IMAGE}:${IMAGE_TAG}
                        docker push ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }

        stage('Deploy to Swarm') {
            steps {
                sh """
                    scp -o StrictHostKeyChecking=no docker-stack.yml ${SWARM_MANAGER_USER}@${SWARM_MANAGER_IP}:/home/${SWARM_MANAGER_USER}/docker-stack.yml
                    ssh -o StrictHostKeyChecking=no ${SWARM_MANAGER_USER}@${SWARM_MANAGER_IP} 'docker stack deploy -c /home/${SWARM_MANAGER_USER}/docker-stack.yml ${STACK_NAME}'
                """
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        success {
            echo "Deploy başarılı: ${DOCKER_IMAGE}:${IMAGE_TAG} -> ${STACK_NAME}"
        }
        failure {
            echo "Pipeline başarısız oldu, loglara bakın."
        }
    }
}