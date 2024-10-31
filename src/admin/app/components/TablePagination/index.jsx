import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Icon } from '..'
import { __ } from '@wordpress/i18n';

export default ({ perPage, total, currentPage, onPageChange, onItemsPerPageChange }) => {
    const [current, setCurrent] = useState(currentPage || 1);
    const [notiPerPage, setNotiPerPage] = useState(perPage || 10);
    const page_item = 'text-sm rounded  border-0 flex items-center justify-center transition-colors hover:bg-primary-accent mb-0'
    const page_item_link = 'px-3.5 py-2 font-semibold focus:shadow-none focus:outline-0 focus:text-white hover:text-primary-color'
    const active_page_item = 'bg-primary-color'
    const active_page_item_link = 'text-white'
    const prev_next_button = "rounded flex justify-center items-center mb-0 w-9 h-9 transition-colors hover:bg-primary-accent"

    function handlePageClick(page) {
        onPageChange(page.selected + 1);
        setCurrent(page.selected + 1);
    }

    function handlePerPageChange(e) {
        setNotiPerPage(e.target.value)
    }

    useEffect(() => {
        onItemsPerPageChange(notiPerPage)
    }, [notiPerPage])

    const offset = current * perPage - perPage;
    const nextOffset = current * perPage > total ? total : current * perPage;

    return (
        <div className="flex gap-3 justify-between items-center">
            <div className="text-sm flex-1">
                <span className="font-semibold">{__('Showing', 'pop-and-convert')}</span>
                {` ${total ? `${offset + 1} - ${nextOffset}` : 0} ${__('of', 'pop-and-convert')} ${total} ${__('Notifications', 'pop-and-convert')}`}
            </div>
            <nav className="flex-1 flex justify-end items-center space-x-6">
                <div className="flex items-center space-x-2">
                    <p>{__('Notifications Per Page', 'pop-and-convert')}</p>
                    <div className="dropdown-menu w-[60px]">
                        <select name="per_page" id="per_page" className="list" onChange={handlePerPageChange} value={notiPerPage}>
                            <option value="10">{ __('10', 'pop-and-convert')}</option>    
                            <option value="20">{ __('20', 'pop-and-convert')}</option>
                            <option value="50">{__('50', 'pop-and-convert')}</option>
                            <option value="100">{__('100', 'pop-and-convert')}</option>
                        </select>
                    </div>
                </div>
                <ReactPaginate
                    pageCount={Math.ceil(total / perPage)}
                    onPageChange={handlePageClick}
                    initialPage={current - 1}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    previousLabel={<Icon icon="double-arrow-left" />}
                    nextLabel={<Icon icon="double-arrow-right" />}
                    pageClassName={`${page_item}`}
                    pageLinkClassName={`${page_item_link}`}
                    previousClassName={`${prev_next_button}`}
                    previousLinkClassName="focus:shadow-none focus:outline-0"
                    breakLabel="..."
                    breakClassName={`${page_item}`}
                    breakLinkClassName={`${page_item_link}`}
                    nextClassName={`${prev_next_button}`}
                    nextLinkClassName="focus:shadow-none focus:outline-0"
                    containerClassName='flex gap-2'
                    activeClassName={`${active_page_item}`}
                    activeLinkClassName={`${active_page_item_link}`}
                    disabledClassName="disabled"
                    disabledLinkClassName="disabled:opacity-75 text-gray cursor-not-allowed hover:bg-opacity-75"
                    disableInitialCallback
                />
            </nav>
        </div>
    )
}
