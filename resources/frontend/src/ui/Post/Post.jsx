export default function Post(props) {
  return (
    <div className={'post max-w-1/4'}>
      <div className={'post-title text-amber-50'}>{props.title}</div>
      <div className={'post-content'}>{props.content}</div>
    </div>
  );
}
