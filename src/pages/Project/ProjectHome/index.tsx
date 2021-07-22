import React from 'react';
import 'antd/dist/antd.css';
import Nav from '../components/Bread';

import Mileage from '@/pages/Statistics/Mileage';
import TableList from '@/pages/Project/ProjectList';

const Project: React.FC<{}> = () => {
  return (
    <>
      <Nav />
      <div>
        <TableList />
        {/* <Mileage /> */}
      </div>

    </>
  );
};

// export default connect(({ SubmitProcess }: { SubmitProcess: StateType }) => ({
//   current: SubmitProcess.current,
// }))(Submit);
export default Project;