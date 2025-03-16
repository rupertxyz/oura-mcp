# Oura MCP Server

A Model Context Protocol (MCP) server for accessing Oura Ring data.

## Setup

### Prerequisites
- Node.js (v16+)
- Oura account

### Installation
1. Clone the repository
2. Run: 
```
npm install
npm run build
```
## Configuration

### Obtaining Credentials
1. Log in to [Oura Cloud Console](https://cloud.ouraring.com/)
2. Get either:
   - [Personal Access Token](https://cloud.ouraring.com/personal-access-tokens) (for testing)
   - [OAuth2 Credentials](https://cloud.ouraring.com/oauth/applications) (for production)

### Environment Variables
Create a `.env` file:
```
# Option 1: Personal Access Token
OURA_PERSONAL_ACCESS_TOKEN=your_token

# Option 2: OAuth2 credentials
OURA_CLIENT_ID=your_client_id
OURA_CLIENT_SECRET=your_client_secret
OURA_REDIRECT_URI=http://localhost:3000/callback
```

## Usage

### Testing
```
node test.js <tool_name> <date>
```
Example: `node test.js get_daily_sleep 2023-05-01`

### Claude Desktop Integration
Add to Claude Desktop's config (Settings → Developer → Edit Config):
```json
{
    "mcpServers": {
        "oura": {
            "command": "node",
            "args": ["/absolute/path/to/oura-mcp/build/index.js"],
            "env": {"OURA_PERSONAL_ACCESS_TOKEN": "your_token"}
        }
    }
}
```
Restart Claude Desktop after saving. See [MCP docs](https://modelcontextprotocol.io/quickstart/user) for details.

## Available Resources
- `personal_info` - User profile
- `daily_activity` - Activity summaries
- `daily_readiness` - Readiness scores
- `daily_sleep` - Sleep summaries
- `sleep` - Detailed sleep data
- `sleep_time` - Sleep timing
- `workout` - Workout data
- `session` - Session data
- `daily_spo2` - SpO2 measurements
- `rest_mode_period` - Rest periods
- `ring_configuration` - Ring config
- `daily_stress` - Stress metrics
- `daily_resilience` - Resilience metrics
- `daily_cardiovascular_age` - CV age
- `vO2_max` - VO2 max data

## Available Tools
For date-based resources, use tools like `get_daily_sleep` with `startDate` and `endDate` parameters (YYYY-MM-DD). 