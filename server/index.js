const app=require('./app');
const port=Number(process.env.API_PORT||4000);
app.listen(port,'127.0.0.1',()=>console.log(`School API listening on ${port}`));
