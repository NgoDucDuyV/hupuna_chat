import { Role } from '../../../common/enums/role.enum';
export declare class User {
    id: string;
    email: string;
    password?: string;
    fullName: string;
    avatar?: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
