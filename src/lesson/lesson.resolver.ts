import { Resolver,Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { StudentService } from '../student/student.service';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { CreateLessonInput } from './lesso.input';
import { LessonEntity } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';


@Resolver(of=>LessonType)
export class LessonResolver {

    constructor(private lessonService:LessonService ,private studentService : StudentService ){}

    @Query(returns => LessonType)
    lesson(@Args('id') id:string){
        return this.lessonService.getLesson(id);
    }

    @Query(returns => [LessonType])
    lessons (){
        return this.lessonService.getLessons();
    }
    @Mutation()
    createLesson(@Args('createLessonInput') createLessonInput:CreateLessonInput){
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(@Args('assignStudentsToLessonInput') assignStudentsToLessonInput:AssignStudentsToLessonInput){
        const {lessonId,studentIds} = assignStudentsToLessonInput;
        return this.lessonService.assignStudentsToLesson(lessonId,studentIds)
    }

    @ResolveField()
    async students(@Parent() lesson:LessonEntity){
        return this.studentService.getManyStudents(lesson.students);
    }

}