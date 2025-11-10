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

# Function to kill process on a specific port
kill_port() {
    local port=$1
    local pid
    
    # Try lsof first (works on macOS and Linux)
    if command_exists lsof; then
        pid=$(lsof -ti:$port 2>/dev/null)
        if [ -n "$pid" ]; then
            echo -e "${YELLOW}⚠️  Killing process on port $port (PID: $pid)...${NC}"
            kill -9 $pid 2>/dev/null || true
            sleep 1
            return 0
        fi
    # Fallback to netstat (Linux)
    elif command_exists netstat; then
        pid=$(netstat -tlnp 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d'/' -f1 | head -1)
        if [ -n "$pid" ]; then
            echo -e "${YELLOW}⚠️  Killing process on port $port (PID: $pid)...${NC}"
            kill -9 $pid 2>/dev/null || true
            sleep 1
            return 0
        fi
    # Fallback to ss (modern Linux)
    elif command_exists ss; then
        pid=$(ss -tlnp 2>/dev/null | grep ":$port " | awk '{print $6}' | cut -d',' -f2 | cut -d'=' -f2 | head -1)
        if [ -n "$pid" ]; then
            echo -e "${YELLOW}⚠️  Killing process on port $port (PID: $pid)...${NC}"
            kill -9 $pid 2>/dev/null || true
            sleep 1
            return 0
        fi
    fi
    
    return 1
}

# Function to kill processes on required ports
kill_ports() {
    local ports=("$@")
    local killed_any=false
    
    for port in "${ports[@]}"; do
        if kill_port $port; then
            killed_any=true
        fi
    done
    
    if [ "$killed_any" = true ]; then
        echo -e "${GREEN}✅ Ports cleared${NC}"
        echo ""
    fi
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
        
        # Kill any existing processes on required ports
        kill_ports 3000 3001
        
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
        
        # Kill any existing processes on required ports
        kill_ports 3000 3001
        
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
        echo ""
        
        # Kill any existing process on port 3000
        kill_ports 3000
        
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
        echo ""
        
        # Kill any existing process on port 3001
        kill_ports 3001
        
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
    
    kill|stop)
        echo -e "${GREEN}🛑 Stopping all services...${NC}"
        echo ""
        kill_ports 3000 3001
        echo -e "${GREEN}✅ All services stopped${NC}"
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
        echo "  kill, stop    - Kill processes on ports 3000 and 3001"
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

