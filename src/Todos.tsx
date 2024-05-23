import { useTodosQueryOnce } from './api/useTodos';

export default function Todos() {
  const { data, isFetching, isError } = useTodosQueryOnce();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <ol>
      {data &&
        data.data.map((todo) => (
          <li key={todo.id}>
            <span>
              {todo.title}
              <input type="checkbox" checked={todo.completed} />
            </span>
          </li>
        ))}
    </ol>
  );
}
