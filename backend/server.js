
import http from "http"
import dotenv from 'dotenv/config'
import app from "./app.js"


const port = process.env.PORT
const server = http.createServer(app)





// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});