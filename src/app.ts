

import  express, {Application} from 'express';
import  bodyParser from "body-parser";
import  morgan from "morgan";
import cookieParser from 'cookie-parser'
import errorMiddleware from './middlewares/errorMiddleware';
import {NextFunction, Response ,Request} from 'express';
import swaggerUi from 'swagger-ui-express'
// import swaggerDocument from './docs/swaggerDocument';
// import cors from 'cors'

class App {
  public app: Application;

  constructor(controllers:any) {
    this.app= express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    
  }

  public listen(){
    const port = process.env.PORT || 3000;
    const hostname = process.env.API_URL|| '127.0.0.1';

    this.app.listen( Number(port)  ,hostname, () => {
      console.log(`Example app listening at http://${hostname}:${port}`);
      console.log('OK');
      
    })
  }

  public getServer() 
    {
        return this.app;
    }
    public get()
    {
        this.app.get('/', (request, response) => {
            response.send('Ok.Le serveur est bien configuré, bravo!!');
        })
    }
    private initializeMiddlewares()
    { 
      
        
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(morgan("tiny"));
        this.app.use(express.static("public"));
        this.app.use(this.enableCORS)
        // this.app.use(
        //   '/api-docs',
        //   swaggerUi.serve, 
        //   swaggerUi.setup(swaggerDocument,{ explorer: true })
        // );
        // this.app.use(cors({
        //   origin: 'http://localhost:8080',
        //   optionsSuccessStatus:200,
        //   credentials:true
        // }))
        // this.app.use(cors())

        // this.app.use(function(req, res, next) {
        //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        //   next();
        // });

        
    }

    private enableCORS(req:Request, res:Response, next:NextFunction){

      res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
      res.header('Access-Control-Allow-Credentials', 'true')
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Content-Encoding, Accept'
      )
      res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PATCH, PUT, DELETE'
      )
      next()
    }
    
    
    private initializeErrorHandling()
    {
      this.app.use(errorMiddleware);
        
    }

    

    private initializeControllers(controllers: any[])
    {
      
        controllers.forEach((controller ) => {
          //console.log(controller.getRouter())
            this.app.use('/',controller.router);
        });
     
    }

}
export default App;





