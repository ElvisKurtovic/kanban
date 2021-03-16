import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import BoardSchema from '../models/Board'
import ListSchema from '../models/List'
import TaskSchema from '../models/Task'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Board = mongoose.model('Board', BoardSchema);

  List = mongoose.model('List', ListSchema);

  Task = mongoose.model('Task', TaskSchema);
}

export const dbContext = new DbContext()
