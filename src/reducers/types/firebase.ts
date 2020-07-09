import { FirebaseReducer as FirebaseReducerType } from 'react-redux-firebase';

export type FirebaseReducer = FirebaseReducerType.Reducer<Profile>;
// export type FirebaseReducer = FirebaseReducerType.Reducer<Profile, Schema>;

export type Profile = {
  name: string;
  email: string;
};

// export type Schema = {}

// export type Schema = {
//   todos: Todo
// }
//
// export type Todo = {
//   text: string
//   completed: boolean
// }

export default FirebaseReducer;
