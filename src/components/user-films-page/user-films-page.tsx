import { useParams } from 'react-router-dom';
import Navigation from '../navigation/navigation';
import UserFilmsBoard from '../user-films-board/user-films-board';

function UserFilmsPage(): JSX.Element {
  const param = useParams();
  console.log(param.type);

  return (
    <main className="main">
      <Navigation />
      <section className="films">
        <UserFilmsBoard type={param.type as 'watchlist' | 'history' | 'favorites'} />
      </section>
    </main>
  );
}

export default UserFilmsPage;
