import { useParams } from 'react-router-dom';
import { UserFavouritesType } from '../../types/user-data';
import Navigation from '../navigation/navigation';
import UserFilmsBoard from '../user-films-board/user-films-board';

type Params = {
  type: UserFavouritesType;
};

function UserFilmsPage(): JSX.Element {
  const param = useParams<Params>();
  console.log(param.type);

  return (
    <main className="main">
      <Navigation />
      <section className="films">
        <UserFilmsBoard type={param.type as UserFavouritesType} />
      </section>
    </main>
  );
}

export default UserFilmsPage;
