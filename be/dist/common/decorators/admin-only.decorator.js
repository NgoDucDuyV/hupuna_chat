"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOnly = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../enums/role.enum");
exports.ROLES_KEY = 'roles';
const AdminOnly = () => (0, common_1.SetMetadata)(exports.ROLES_KEY, [role_enum_1.Role.ADMIN]);
exports.AdminOnly = AdminOnly;
//# sourceMappingURL=admin-only.decorator.js.map