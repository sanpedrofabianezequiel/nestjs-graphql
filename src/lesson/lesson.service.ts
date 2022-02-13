import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonEntity } from './lesson.entity';
import { v4 as uuid }  from 'uuid';
import { CreateLessonInput } from './lesso.input';

@Injectable()
export class LessonService {
    constructor(@InjectRepository(LessonEntity) private _lessonRepository : Repository<LessonEntity>){
       
    }

    async createLesson (createLessonInput: CreateLessonInput) :Promise<LessonEntity>{
        const {name,startDate,endDate ,students} = createLessonInput;
        const lesson =  this._lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        });
        return this._lessonRepository.save(lesson);
    }

    async getLesson(id:string):Promise<LessonEntity>{
        return this._lessonRepository.findOne({id})
    }

    async getLessons():Promise<LessonEntity[]>{
        return this._lessonRepository.find();
    }


    async assignStudentsToLesson(lessonId:string, studentIds :string[]) :Promise<LessonEntity>{
        const lesson = await this._lessonRepository.findOne({id:lessonId});
        lesson.students = [ ...lesson.students, ...studentIds];
        return this._lessonRepository.save(lesson);
    }
}
