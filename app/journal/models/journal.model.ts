import {User} from "../../login/models/user.model";

export class Journal {
  date: Date;
  content: string;
  imageUrl: string;
  user: User;

  constructor(date: Date, content: string, imageUrl: string, user: User) {
    this.date = date;
    this.content = content;
    this.imageUrl = imageUrl;
    this.user = user;
  }
}
