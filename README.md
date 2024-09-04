# Files Manager API

Welcome to the Files Manager API, a powerful tool designed for efficient file management. This API leverages modern technologies such as Express, MongoDB, Redis, Bull, and Node.js to offer robust file handling capabilities.

## Getting Started

To get started with the Files Manager API, follow these steps:

### Prerequisites

1. **Node.js**: Ensure that Node.js is installed on your system.
2. **Yarn**: Install Yarn for managing project dependencies.

### Google API Setup

1. **Create a Google API Project**: This project should have permissions for sending emails.
2. **Configure Redirect URI**: Use a valid redirect URI, such as `http://localhost:5000/`.
3. **Place Credentials**: Save the `credentials.json` file in the root directory of your project.

### Configuration

1. **Environment Variables**: Create a `.env` file in the root directory with the following variables:

    ```plaintext
    GOOGLE_MAIL_SENDER=your-email@example.com
    PORT=5000
    DB_HOST=localhost
    DB_PORT=27017
    DB_DATABASE=files_manager
    FOLDER_PATH=/tmp/files_manager
    ```

    Adjust these values according to your setup. The `FOLDER_PATH` differs for different operating systems:
    - **Linux/Mac OS X**: `/tmp/files_manager`
    - **Windows**: `%TEMP%/files_manager`

## Installation

1. **Clone the Repository**: Clone the project repository to your local machine.
2. **Install Dependencies**: Navigate to the project directory and run `yarn install` or `npm install`.

## Running the Application

1. **Start Services**: Ensure Redis and MongoDB services are running on your machine.
2. **Start the Server**: Execute `yarn start-server` or `npm run start-server` to launch the API.

## Testing

1. **Prepare Environment**: Create a `.env.test` file with test-specific environment variables.
2. **Run Tests**: Execute `yarn test` or `npm run test` to perform end-to-end testing.

