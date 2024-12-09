import { useState } from 'react';
import Navbar from './Navbar';

export default function Home() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Navbar user={user} />
    </div>
  );
}
