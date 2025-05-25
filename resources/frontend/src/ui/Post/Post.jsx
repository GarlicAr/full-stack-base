import { useNavigate } from 'react-router-dom';

export default function Post(props) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/posts/${props.id}`);
  };

  return (
    <div className={'post max-w-1/4 cursor-pointer'} onClick={onClick}>
      <div className={'post-title text-amber-50'}>{props.title}</div>
      <div className={'post-content'}>{props.content}</div>
    </div>
  );
}
