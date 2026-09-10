pipeline {
    agent { label 'docker-agent' }

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Node 16 checks') {
            agent {
                docker {
                    image 'node:16.20.2'
                    args '-u 1000:1000'
                    reuseNode true
                }
            }

            environment {
                npm_config_cache = '/tmp/npm-cache'
            }

            stages {
                stage('Install dependencies') {
                    steps {
                        sh 'node --version'
                        sh 'id'
                        sh 'npm ci --engine-strict --no-audit --no-fund'
                    }
                }

                stage('Unit tests') {
                    steps {
                        sh 'mkdir -p reports'
                        sh 'npm test -- --json --outputFile=reports/unit-tests.json'
                    }
                }

                stage('Dependency security scan') {
                    steps {
                        script {
                            def auditStatus = sh(
                                script: 'npm audit --audit-level=high --json > reports/dependency-audit.json',
                                returnStatus: true
                            )

                            sh 'cat reports/dependency-audit.json'

                            if (auditStatus != 0) {
                                error('Dependency scan failed: High/Critical vulnerabilities or an audit error. Check the report.')
                            }
                        }
                    }
                }
            }
        }

        stage('Build image') {
            steps {
                sh 'docker build -t pabingurung22343460/isec6000-assessment2:$BUILD_NUMBER .'
            }
        }

        stage('Push image') {
            steps {
                script {
                    docker.withRegistry(
                        'https://index.docker.io/v1/',
                        'dockerhub-credentials'
                    ) {
                        docker.image(
                            "pabingurung22343460/isec6000-assessment2:${env.BUILD_NUMBER}"
                        ).push()
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'reports/*.json',
                allowEmptyArchive: true
            )
        }
    }
}
