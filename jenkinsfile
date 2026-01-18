pipeline {
    agent any

    stages {

        stage('Checkout code') {
            steps {
                git branch: 'main', url: 'https://github.com/Dayeshlate/Energy-Tracking-Application.git'
            }
        }

        stage('Login to Docker') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'f77912a3-1eb0-45ab-85ed-6f076fdff1fc',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Build Images') {
            steps {
                sh '''
                docker build -t my-project-image ./my-project
                docker build -t reactjs-image ./reactjs
                docker build -t spring-image ./energy_tracking_backend
                '''
            }
        }
        
        stage('Tag and push image of myproject'){
            steps{
                withCredentials([usernamePassword(
                    credentialsId: 'f77912a3-1eb0-45ab-85ed-6f076fdff1fc',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )])
                {
                    sh '''docker tag my-project-image:latest $DOCKER_USER/my-project-image:latest
                    docker push $DOCKER_USER/my-project-image:latest
                    '''
                }
            }
        }
        
        stage('Tag and push image of reactjs'){
            steps{
                withCredentials([usernamePassword(
                    credentialsId: 'f77912a3-1eb0-45ab-85ed-6f076fdff1fc',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )])
                {
                    sh '''docker tag reactjs-image:latest $DOCKER_USER/reactjs-image:latest
                    docker push $DOCKER_USER/reactjs-image:latest
                    '''
                }
            }
        }
        
        stage('Tag and push image ofspring boot'){
            steps{
                withCredentials([usernamePassword(
                    credentialsId: 'f77912a3-1eb0-45ab-85ed-6f076fdff1fc',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )])
                {
                    sh '''docker tag spring-image:latest $DOCKER_USER/spring-image:latest
                    docker push $DOCKER_USER/spring-image:latest
                    '''
                }
            }
        }






        stage('Create Network') {
            steps {
                sh 'docker network create app-net || true'
            }
        }

        stage('Run MySQL') {
            steps {
        sh '''
        docker rm -f mysql-container || true
        docker run -d --name mysql-container --network app-net \
          -e MYSQL_ROOT_PASSWORD=root \
          -e MYSQL_DATABASE=mydb \
          mysql:8.0
        '''
    }
        }
        
        
stage('Wait for MySQL') {
    steps {
        sh 'sleep 25'
    }
}

        stage('Run Spring Boot') {
            steps {
        withCredentials([usernamePassword(
            credentialsId: 'f77912a3-1eb0-45ab-85ed-6f076fdff1fc',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
        )]) {
            sh '''
            docker rm -f spring-container || true
            docker pull $DOCKER_USER/spring-image:latest

            docker run -d --name spring-container --network app-net \
              -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql-container:3306/mydb \
              -e SPRING_DATASOURCE_USERNAME=root \
              -e SPRING_DATASOURCE_PASSWORD=root \
              -p 8080:8080 \
              $DOCKER_USER/spring-image:latest
            '''
        }
            }
        }

        stage('Run my-project Service') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'f77912a3-1eb0-45ab-85ed-6f076fdff1fc',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                sh '''
                docker pull $DOCKER_USER/my-project-image:latest
                docker run -d --name my-project-container --network app-net \
                -p 5174:5173 \
                $DOCKER_USER/my-project-image:latest
                '''
                }
            }
        }

        stage('Run reactjs Frontend') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'f77912a3-1eb0-45ab-85ed-6f076fdff1fc',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                sh '''
                docker pull $DOCKER_USER/reactjs-image:latest
                docker run -d --name reactjs-container --network app-net \
                -p 5173:5173 \
                 $DOCKER_USER/reactjs-image:latest
                '''
            }
        }
    }
    }
    
    post {
        always {
            sh 'docker logout'
        }
        success {
            echo 'All containers are running successfully'
        }
    }
}
