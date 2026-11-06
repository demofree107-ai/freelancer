const { z } = require('zod');
const numeric=z.union([z.number(),z.string().trim().min(1)]), id=numeric.pipe(z.coerce.number().int().positive()), str=z.string().trim().min(1).max(200), opt=z.string().trim().max(200).optional().nullable(), date=z.string().regex(/^\d{4}-\d{2}-\d{2}$/), money=numeric.pipe(z.coerce.number().nonnegative().multipleOf(0.01).max(9999999999.99)), marksValue=numeric.pipe(z.coerce.number().nonnegative().multipleOf(0.01).max(9999.99)), status=z.enum(['present','absent','late','excused']);
const items={
 classes:{fields:{name:str,section:str,academic_year:str},read:['admin','teacher','accountant','student','parent'],write:['admin'],scope:'class'},
 users:{fields:{name:str,email:z.string().email().max(200),password:z.string().min(12).max(72),role:z.enum(['admin','teacher','accountant','student','parent']),active:z.boolean().optional()},read:['admin'],write:['admin'],select:'id,name,email,role,active,created_at'},
 students:{fields:{admission_no:str,name:str,date_of_birth:date.optional().nullable(),gender:opt,class_id:id,roll_no:str,guardian_name:opt,guardian_phone:opt,status:z.enum(['active','inactive']).optional(),user_id:id.optional().nullable()},read:['admin','teacher','accountant','student','parent'],write:['admin'],scope:'student'},
 staff:{fields:{name:str,employee_no:str,designation:str,phone:opt,user_id:id.optional().nullable()},read:['admin','teacher','student','parent'],write:['admin']},
 parent_students:{fields:{user_id:id,student_id:id},read:['admin'],write:['admin']},
 teacher_classes:{fields:{user_id:id,class_id:id},read:['admin'],write:['admin']},
 attendance:{fields:{student_id:id,date,status,note:opt},read:['admin','teacher','student','parent'],write:['admin','teacher'],scope:'attendance'},
 staff_attendance:{fields:{staff_id:id,date,status,note:opt},read:['admin','teacher'],write:['admin'],scope:'staff'},
 fee_structures:{fields:{class_id:id,name:str,amount:money,due_date:date},read:['admin','accountant'],write:['admin','accountant']},
 invoices:{fields:{student_id:id,fee_structure_id:id,amount:money,due_date:date},read:['admin','accountant','student','parent'],write:['admin','accountant'],scope:'student_id'},
 payments:{fields:{invoice_id:id,amount:money.refine(n=>n>0,'Amount must be positive'),paid_on:date,method:z.enum(['cash','bank']),reference:opt},read:['admin','accountant','student','parent'],write:['admin','accountant'],scope:'invoice',immutable:true},
 exams:{fields:{class_id:id,name:str,subject:str,exam_date:date,max_marks:marksValue.refine(n=>n>0,'Maximum marks must be positive')},read:['admin','teacher','student','parent'],write:['admin','teacher'],scope:'class_id'},
 marks:{fields:{exam_id:id,student_id:id,marks:marksValue},read:['admin','teacher','student','parent'],write:['admin','teacher'],scope:'marks'},
 grade_bands:{fields:{label:str,minimum:numeric.pipe(z.coerce.number().min(0).max(100).multipleOf(0.01))},read:['admin','teacher','student','parent'],write:['admin']},
 timetable:{fields:{class_id:id,teacher_id:id,substitute_id:id.optional().nullable(),day:z.enum(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']),start_time:z.string().regex(/^\d\d:\d\d$/),end_time:z.string().regex(/^\d\d:\d\d$/),subject:str},read:['admin','teacher','student','parent'],write:['admin'],scope:'class_id'},
 audit_log:{read:['admin'],write:[],select:'id,actor_id,action,entity,entity_id,at'}
};
for(const item of Object.values(items)) if(item.fields) item.schema=z.object(item.fields).strict();
module.exports=items;
