# Continuous integration

Jenkins checks the main branch for changes every five minutes using Poll SCM.

The pipeline installs dependencies, runs unit tests, scans dependencies,
builds the Docker image, and pushes it to Docker Hub.

High or critical dependency findings fail the pipeline.
Test and dependency audit reports are archived with each build.
