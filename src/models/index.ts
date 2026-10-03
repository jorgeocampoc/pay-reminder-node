import { relationOptions } from "./attributes.js";
import User from "./user.model.js";
import Category from "./category.model.js";
import Services from "./services.model..js";
import UserService from "./userServices.model.js";
import Payment from "./payment.model.js";

Category.hasMany(Services, relationOptions("category_id"));
Services.belongsTo(Category, relationOptions("category_id"));

User.hasMany(UserService,relationOptions("user_id"));
UserService.belongsTo(User,relationOptions("user_id"));

Services.hasMany(UserService,relationOptions("service_id"));
UserService.belongsTo(Services,relationOptions("service_id"));

UserService.hasMany(Payment,relationOptions("user_service_id"));
Payment.belongsTo(UserService,relationOptions("user_service_id"));

export { User, Category, Services,UserService, };
