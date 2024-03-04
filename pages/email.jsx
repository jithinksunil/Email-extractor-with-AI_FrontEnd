import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

function email() {
  const router = useRouter();
  const email = router.query;
  return (
    <div>
        <div>dfdd</div>
      <Image
        src={'http://localhost:8000/Image1709299164422.jpg'}
        alt='Sample Image'
        width={500}
        height={300}
      />
    </div>
  );
}

export default email;
