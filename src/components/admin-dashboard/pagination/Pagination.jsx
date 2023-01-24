import React from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.scss';

import { useSelector, useDispatch } from 'react-redux';
import { updatePage } from '../../../features/order/orderSlice';

const Pagination = () => {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const handlePageClick = async (data) => {
    console.log(data.selected + 1);
    dispatch(updatePage(data.selected + 1));
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  return (
    <>
      <div
        style={{
          margin: '2rem 0',
        }}
      >
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={orders?.numberOfPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    </>
  );
};

export default Pagination;
