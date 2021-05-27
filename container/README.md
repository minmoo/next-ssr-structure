docker build --tag ssg-chatbot-frontend:latest -f container/dev/Dockerfile .
docker run -itd --name frontend -p 7008:7008 -v /data/163235/.ssh:/root/.ssh -v /data/163235:/data/163235 ssg-chatbot-frontend
