import conf from "../conf/conf";
import { Client,Account,ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
       this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }
    

    //FOR CREATION OF ACCOUNT
    async createAccount({email,password,name}){
       try {
        const userAccount = await this.account.create(ID.unique(),email,password,name);
          
          if(userAccount){
            //Call another method
            return this.login({email,password});
          }else{
            return userAccount;
          }

       } catch (error) {
          throw error
       }
    }
    
    //FOR LOGIN PURPOSE
    async login({email,password}){
      try {
         return await this.account.createEmailPasswordSession(email,password);
      } catch (error) {
         throw error;
      }
    }

    //FOR CURRENT STATUS OF USER
    async getCurrentUser(){
       try {
          return await this.account.get();
       } catch (error) {
          throw error;
       }

       return null;
    }


    //FOR LOGOUT PURPOSE
    async logout(){
      try {
         await this.account.deleteSessions();
      } catch (error) {
         console.log(`appwrite service :: logout :: error ${error}`);
      }
    }
}

const authService = new AuthService();

export default authService;