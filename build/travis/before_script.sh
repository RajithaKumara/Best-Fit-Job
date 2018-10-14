#!/bin/bash

echo "Run development server as background process"
nohup bash -c "npm run dev 2>&1 &"
