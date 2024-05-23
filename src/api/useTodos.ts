import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type Response = {
  data: Todo[];
};

function getTodos() {
  // return axios.get('https://jsonplaceholder.typicode.com/todos');
  return axios.get('http://localhost:5173/todos');
}

export const useTodosQueryOnce = () => {
  const query = useQuery<Response>({ queryKey: ['todos'], queryFn: getTodos });

  return query;
};
