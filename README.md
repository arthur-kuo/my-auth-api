# My Auth API

## Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and set the required environment variables.
	```
	MONGO_URI=your_mongodb_url
	JWT_SECRET=your_jwt_secret
	```

4. Build the application:
   ```sh
   npm run build
   ```
5. Start the application:
   ```sh
   npm run start
   ```

## Docker

1. Create a `.env` file and set the required environment variables.
	```
	MONGO_URI=your_mongodb_url
	JWT_SECRET=your_jwt_secret
	```
2. Build the Docker image:
   ```sh
   docker build -t my-auth-api .
   ```
3. Run the Docker container:
   ```sh
   docker run -p 5000:5000 my-auth-api
   ```

## Docker Compose

You can run the app with a MongoDB locally using Docker Compose:

1. Create a `.env` file and set the required environment variables.
	```
	MONGO_URI=mongodb://localhost:27017/myauthapi
	JWT_SECRET=your_jwt_secret
	```
3. Run the Docker container:
   ```sh
   docker compose up -d
   ```