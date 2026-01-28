#!/bin/bash
# LiteLLM Proxy Startup Script

# Directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Config file location
CONFIG_FILE="$PROJECT_ROOT/litellm-config.yaml"

# Port for the proxy (default: 4000)
PORT=${LITELLM_PORT:-4000}

# PID file for tracking the running proxy
PID_FILE="$PROJECT_ROOT/.litellm-proxy.pid"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if proxy is already running
is_running() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p "$PID" > /dev/null 2>&1; then
            return 0
        else
            rm -f "$PID_FILE"
            return 1
        fi
    fi
    return 1
}

# Function to start the proxy
start_proxy() {
    if is_running; then
        echo -e "${YELLOW}LiteLLM proxy is already running (PID: $(cat "$PID_FILE"))${NC}"
        return 0
    fi

    echo -e "${GREEN}Starting LiteLLM proxy...${NC}"
    echo "Config file: $CONFIG_FILE"
    echo "Port: $PORT"

    # Start the proxy in the background
    litellm --config "$CONFIG_FILE" --port $PORT --detailed_debug > "$PROJECT_ROOT/.litellm-proxy.log" 2>&1 &

    # Save the PID
    echo $! > "$PID_FILE"

    # Wait a moment and check if it started successfully
    sleep 2
    if is_running; then
        echo -e "${GREEN}✓ LiteLLM proxy started successfully!${NC}"
        echo -e "  Proxy URL: ${GREEN}http://localhost:$PORT${NC}"
        echo -e "  Logs: $PROJECT_ROOT/.litellm-proxy.log"
        echo ""
        echo "To use with your application:"
        echo "  export LITELLM_PROXY_URL=http://localhost:$PORT"
        echo ""
        echo "To stop the proxy:"
        echo "  $0 stop"
    else
        echo -e "${RED}✗ Failed to start LiteLLM proxy${NC}"
        echo "Check the logs at: $PROJECT_ROOT/.litellm-proxy.log"
        rm -f "$PID_FILE"
        return 1
    fi
}

# Function to stop the proxy
stop_proxy() {
    if ! is_running; then
        echo -e "${YELLOW}LiteLLM proxy is not running${NC}"
        return 0
    fi

    PID=$(cat "$PID_FILE")
    echo -e "${YELLOW}Stopping LiteLLM proxy (PID: $PID)...${NC}"
    kill "$PID"
    sleep 1

    if ps -p "$PID" > /dev/null 2>&1; then
        echo -e "${YELLOW}Force stopping...${NC}"
        kill -9 "$PID"
    fi

    rm -f "$PID_FILE"
    echo -e "${GREEN}✓ LiteLLM proxy stopped${NC}"
}

# Function to show status
status_proxy() {
    if is_running; then
        PID=$(cat "$PID_FILE")
        echo -e "${GREEN}✓ LiteLLM proxy is running (PID: $PID)${NC}"
        echo -e "  Proxy URL: http://localhost:$PORT"
        echo ""
        echo "Recent logs:"
        tail -n 10 "$PROJECT_ROOT/.litellm-proxy.log" 2>/dev/null || echo "No logs available"
    else
        echo -e "${YELLOW}LiteLLM proxy is not running${NC}"
    fi
}

# Function to restart the proxy
restart_proxy() {
    stop_proxy
    sleep 1
    start_proxy
}

# Main script logic
case "${1:-start}" in
    start)
        start_proxy
        ;;
    stop)
        stop_proxy
        ;;
    restart)
        restart_proxy
        ;;
    status)
        status_proxy
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac
