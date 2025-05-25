import useAuth from '../../../hooks/useAuth.jsx';

export default function HomePage() {
  const { user, loading } = useAuth();

  return (
    !loading && (
      <div className="text-red-500 font-semibold text-xl leading-tight">
        Sveicināts manā mājaslapā, {user.name} !
      </div>
    )
  );
}
