import { useParams } from 'react-router-dom';
import { UserFavouritesType } from '../../types/user-data';
import { Navigation, UserFilmsBoard } from '../../components';

type Params = {
  type: UserFavouritesType;
};

export function UserFilmsPage(): JSX.Element {
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
