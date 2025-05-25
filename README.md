# Dockerized ToDo App
 A simple to do application using docker along with node, react and mongo.

### Follow the steps below to run the application.
- Install Docker on your PC.
- Go to the project root directory and run 'docker-compose build' to build the images.
- Run 'docker-compose up' to run the container.
- Go to localhost:3000 to Run the application.
- Run 'docker-compose down' to terminate the container.

Use 'rest.http' to check the https requests.

Dockerized Todo App – GCP Cloud-Native Deployment (CS436 Project)

This project is a cloud-native Todo application deployed across Google Kubernetes Engine (GKE), a Compute Engine VM, and a Cloud Function. It demonstrates modular cloud architecture, autoscaling, load testing, and serverless integration.

 1. Clone the Repository

git clone https://github.com/YOUR_USERNAME/Dockerized-Todo-App.git
cd Dockerized-Todo-App

 2. Kubernetes Setup (GKE)

 Step 1: Deploy MongoDB

kubectl apply -f mongo-deployment.yaml

 Step 2: Deploy Backend

kubectl apply -f todo-backend-deployment.yaml

Backend listens on port 5000. The service maps port: 80 → targetPort: 5000.

 Step 3: Deploy Frontend

kubectl apply -f todo-frontend-deployment.yaml

Frontend uses an NGINX image to serve the static React build.

 Step 4: Verify Services

kubectl get svc

Note the EXTERNAL-IP of the frontend and backend services.

 3. VM Setup (Google Compute Engine)

Used for:

Manual MongoDB or app testing

Locust load generation

Basic Setup:

sudo apt update && sudo apt install -y git curl nodejs npm mongodb

Or use Docker:

sudo apt install docker.io -y
sudo systemctl start docker
sudo docker run -d -p 27017:27017 -v mongodb_data:/data/db mongo:6.0

 4. Cloud Function (Serverless Health Check)

This function:

Performs a health check on the backend endpoint.

Returns 200 OK if /todos is reachable.

Steps:

Navigate to Cloud Functions → Create Function

Runtime: Node.js 18

Use HTTP trigger

Function code:

const fetch = require("node-fetch");
exports.healthCheck = async (req, res) => {
  try {
    const r = await fetch("http://[BACKEND-EXTERNAL-IP]/todos");
    if (r.ok) return res.status(200).send("Backend Healthy");
    else return res.status(500).send("Backend Error");
  } catch (e) {
    return res.status(500).send("Connection Failed");
  }
};

 5. Local Docker Compose Setup (Optional)

docker-compose up --build

Frontend → http://localhost:3000Backend → http://localhost:5000

 6. Load Testing with Locust

Used on the VM:

sudo apt install python3-pip -y
pip3 install locust

Create locustfile.py:

from locust import HttpUser, task

class TodoUser(HttpUser):
    @task
    def get_todos(self):
        self.client.get("/todos")

Run:

locust --host http://[BACKEND-EXTERNAL-IP]

Access Locust UI → http://[VM-IP]:8089



