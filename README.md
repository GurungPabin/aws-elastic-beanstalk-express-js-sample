# AWS Elastic Beanstalk Node.js Sample App

This repository contains a sample Node.js web application built using [Express](https://expressjs.com/), meant to be used as part of the AWS DevOps Learning Path.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.


## ISEC6000 Assessment 2

Name: Pabin Gurung
Student ID: 22343460

For this assessment, I added a greeting unit test, a Dockerfile and a
Jenkins pipeline to the sample application.

The application returns "Hello World!" on port 8080.

### Application files

- app.js sets up the web application.
- greeting.js sends the greeting.
- greeting.test.js checks that the expected greeting is sent exactly once.
- Dockerfile packages the application and runs it as the non-root node user.
- Jenkinsfile defines the automated checks, image build and upload.
- CI.md describes the automatic build process.

### Pipeline

Jenkins checks the main branch every five minutes.
When it detects a change, it installs dependencies, runs the unit test,
checks dependencies for vulnerabilities, and builds and uploads the image.

The dependency installation, test and scan use Node 16.20.2, as required
by the assessment.

High or Critical dependency findings stop the pipeline before image
build and upload. Test and audit reports are saved with the Jenkins build.

### Verification

Build 3 started automatically after a repository change and passed.

Build 4 used a temporary vulnerable development dependency to test the
security check. Jenkins detected a High finding and skipped image build
and upload.

The temporary dependency was removed. Build 5 passed and published tag 5.
Its dependency report contained 3 Moderate findings and no High or
Critical findings. These remaining findings are recorded in the report.

### Related repositories

Jenkins infrastructure and setup instructions:
https://github.com/GurungPabin/isec6000-assessment2-jenkins

Published application images:
https://hub.docker.com/r/pabingurung22343460/isec6000-assessment2
