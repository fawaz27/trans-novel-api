
import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/AppDataSource';
import { User } from './user.entity';
import bcrypt from 'bcrypt';
import NotFoundException from '../../exceptions/NotFoundException';
import CreateUserDto from './user.dto';

export class UserService{
   
    private userRepository:Repository<User> ;

    constructor(){
        this.userRepository = AppDataSource.getRepository(User);
    }

    public async getUserByEmail(email:string){
     
        const user = await this.userRepository.findOne(({where:{email:email}}));
        
        if(user)
            return user;
        else
            throw new NotFoundException(`User with email ${email} not found.`);       
    }

    public async getUserById(id:number){    
        const user = await this.userRepository.findOne(({where:{id:id}}));

        if(user)
            return user;
        else
            throw new NotFoundException('User not found.');
    }

    public async getAllUsers(){
        const users = await this.userRepository.find();

        if(users)
            return users;
    
    }

    public async markEmailAsConfirmed(email: string) {
        
        const result = await this.userRepository.update({ email }, {
            isEmailConfirmed: true
        }); 
        
        return result;
    }

    public async updatePassword(email: string,password:string) {

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await this.userRepository.update({ email }, {
            password: hashedPassword
        }); 
        
        return result;

    }

    public async updateUser(id: number, user : CreateUserDto ) {

        await this.getUserById(id);
        const userUpdate = this.userRepository.create(user);
        const result = await this.userRepository.update({ id }, userUpdate); 
        
        return result;

    }

    public async deleteUser(id: number) {

        await this.getUserById(id);

        const result = await this.userRepository.delete(id);
        
        return result;

    }
}