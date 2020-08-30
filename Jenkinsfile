node('master') {
    sh 'npm --version'
    env.NODEJS_HOME = "${tool 'NodeJsv14.9.0'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    sh 'npm --version'
    stage('Checkout') {
        checkout scm
        sh "ls -al"
    }
    stage('Install') {
        echo 'Install..'
        checkout scm
        sh "node -v"
        sh "npm -v"
        sh "npm install"
    }
    stage('Build') {
        checkout scm
        sh "ls -al"
        sh "npm run build"
        // sh "npm run server"
    }
}
