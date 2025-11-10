#!/bin/bash

# Weather Graphics - Run Script
# This script helps you run the application components

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Weather Graphics - Run Script     ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════╝${NC}"
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Node.js is installed
if ! command_exists node; then
    echo -e "${YELLOW}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Parse command line arguments
COMMAND=${1:-dev}

case $COMMAND in
    dev|start)
        echo -e "${GREEN}🚀 Starting backend + web frontend...${NC}"
        echo ""
        echo -e "${YELLOW}Backend will run on: http://localhost:3000${NC}"
        echo -e "${YELLOW}Web app will run on: http://localhost:3001${NC}"
        echo ""
        
        # Check if root dependencies are installed
        if [ ! -d "node_modules" ] || [ ! -d "node_modules/concurrently" ]; then
            echo -e "${YELLOW}Installing root dependencies...${NC}"
            npm install
        fi
        
        # Check if backend dependencies are installed
        if [ ! -d "backend/node_modules" ]; then
            echo -e "${YELLOW}Installing backend dependencies...${NC}"
            cd backend && npm install && cd ..
        fi
        
        # Check if web frontend dependencies are installed
        if [ ! -d "frontend/web/node_modules" ]; then
            echo -e "${YELLOW}Installing web frontend dependencies...${NC}"
            cd frontend/web && npm install && cd ../..
        fi
        
        # Run backend + web
        npm run dev
        ;;
    
    all)
        echo -e "${GREEN}🚀 Starting all services (backend + web + mobile)...${NC}"
        echo ""
        echo -e "${YELLOW}Backend will run on: http://localhost:3000${NC}"
        echo -e "${YELLOW}Web app will run on: http://localhost:3001${NC}"
        echo -e "${YELLOW}Mobile app will start Expo dev server${NC}"
        echo ""
        
        # Check if root dependencies are installed
        if [ ! -d "node_modules" ] || [ ! -d "node_modules/concurrently" ]; then
            echo -e "${YELLOW}Installing root dependencies...${NC}"
            npm install
        fi
        
        # Check if backend dependencies are installed
        if [ ! -d "backend/node_modules" ]; then
            echo -e "${YELLOW}Installing backend dependencies...${NC}"
            cd backend && npm install && cd ..
        fi
        
        # Check if web frontend dependencies are installed
        if [ ! -d "frontend/web/node_modules" ]; then
            echo -e "${YELLOW}Installing web frontend dependencies...${NC}"
            cd frontend/web && npm install && cd ../..
        fi
        
        # Check if mobile dependencies are installed
        if [ ! -d "frontend/mobile/node_modules" ]; then
            echo -e "${YELLOW}Installing mobile dependencies...${NC}"
            cd frontend/mobile && npm install && cd ../..
        fi
        
        # Run all services
        npm run dev:all
        ;;
    
    backend)
        echo -e "${GREEN}🚀 Starting backend only...${NC}"
        echo -e "${YELLOW}Backend will run on: http://localhost:3000${NC}"
        
        # Check if backend dependencies are installed
        if [ ! -d "backend/node_modules" ]; then
            echo -e "${YELLOW}Installing backend dependencies...${NC}"
            cd backend && npm install && cd ..
        fi
        
        cd backend && npm run dev
        ;;
    
    web)
        echo -e "${GREEN}🚀 Starting web frontend only...${NC}"
        echo -e "${YELLOW}Web app will run on: http://localhost:3001${NC}"
        
        # Check if web frontend dependencies are installed
        if [ ! -d "frontend/web/node_modules" ]; then
            echo -e "${YELLOW}Installing web frontend dependencies...${NC}"
            cd frontend/web && npm install && cd ../..
        fi
        
        cd frontend/web && npm run dev
        ;;
    
    mobile)
        echo -e "${GREEN}🚀 Starting mobile app...${NC}"
        
        # Check if mobile dependencies are installed
        if [ ! -d "frontend/mobile/node_modules" ]; then
            echo -e "${YELLOW}Installing mobile dependencies...${NC}"
            cd frontend/mobile && npm install && cd ../..
        fi
        
        cd frontend/mobile && npm start
        ;;
    
    install)
        echo -e "${GREEN}📦 Installing all dependencies...${NC}"
        npm run install:all
        ;;
    
    help|--help|-h)
        echo -e "${BLUE}Usage: ./run.sh [command]${NC}"
        echo ""
        echo "Commands:"
        echo "  dev, start    - Start backend + web frontend (default)"
        echo "  all           - Start backend + web + mobile"
        echo "  backend       - Start backend only"
        echo "  web           - Start web frontend only"
        echo "  mobile        - Start mobile app only"
        echo "  install       - Install all dependencies"
        echo "  help          - Show this help message"
        echo ""
        echo "Examples:"
        echo "  ./run.sh           # Start backend + web"
        echo "  ./run.sh backend   # Start backend only"
        echo "  ./run.sh web       # Start web only"
        ;;
    
    *)
        echo -e "${YELLOW}Unknown command: $COMMAND${NC}"
        echo "Run './run.sh help' for usage information"
        exit 1
        ;;
esac

