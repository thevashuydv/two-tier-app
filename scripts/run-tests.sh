#!/usr/bin/env bash
set -e

echo "Running tests inside container..."
docker exec web-app npm test

