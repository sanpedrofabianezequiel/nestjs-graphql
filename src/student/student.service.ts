import { Injectable } from '@nestjs/common';
import { StudentEntity } from './student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './create-student.input';
import {v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(StudentEntity) private _studentRepository:Repository<StudentEntity>){

    }

    async createStudent (createStudentInput: CreateStudentInput) :Promise<StudentEntity>{
        const {firstName,lastName} =createStudentInput; 
        const student = this._studentRepository.create({
            id:uuid(),
            firstName,
            lastName
        })
        return this._studentRepository.save(student);
    }

    async getStudents(): Promise<StudentEntity[]>{
        return this._studentRepository.find();
    }

    async  getStudent(id:string) :Promise<StudentEntity>{
        return this._studentRepository.findOne({id});
    }

    async getManyStudents(studentIds: string[]):Promise<StudentEntity[]>{
        return this._studentRepository.find({
            where:{
                id:{
                    $in:studentIds
                }
            }
        })
    }
}
