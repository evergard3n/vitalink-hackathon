Source code of Team VitaLink - Havard Medical Hackathon 2025, Vietnam
This is the stable chanel, the development channel is minh-2.

To run the application locally, do the following steps:
1. cd into /chatbot-be folder, create a new virtual environment (conda is recommended)
2. Install necessary packages
```bash
pip install -r requirements.txt
```
3. Create a new .env inside the chatbot-be folder
```
OPENAI_API_KEY = YOUR_API_KEY
```
4. cd back into /vitalink-frontend
5. Install necessary packages
```
npm i 
```
or
```
pnpm i
```
6. Start development server
```
npm run dev
```
or
```
pnpm dev
```
7. You might have to claim your Clerk application (just follow their instruction)
