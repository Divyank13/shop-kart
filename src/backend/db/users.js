import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: "1",
    firstName: "Divyank",
    lastName: "Manjarwar",
    email: "divyank039@gmail.com",
    password: "shohehe",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
