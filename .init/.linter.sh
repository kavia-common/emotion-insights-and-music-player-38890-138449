#!/bin/bash
cd /home/kavia/workspace/code-generation/emotion-insights-and-music-player-38890-138449/emotion_document_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

