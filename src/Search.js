import React, { Component } from 'react';
import { searchGistByUser } from './gistService';
import { ListGroup, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import SingleGist from './SingleGist';

const paginateData = (data, currentPage, itemPerPage) => {
    return data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage);
};

const paginationTotal = (totalCount, currentPage, itemPerPage) => {
    return <div className="d-none d-sm-inline-block mt-3 py-2 font-13">Showing {(currentPage - 1) * itemPerPage + 1} to {currentPage * itemPerPage} of {totalCount}</div>
};

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: '',
            results: [],
            itemPerPage: 5,
            currentPage: 1,
            currentData: []
        };
    }

    /**
     * search by username
     * @param {*} username 
     */
    search = (username) => {
        if (username) {
            searchGistByUser(username).then(response => {
                this.setState({
                    searchInput: username,
                    results: response.data,
                    currentPage: 1,
                    currentData: paginateData(response.data, 1, this.state.itemPerPage)
                });
            }).catch(() => {
                toast("I guess you tried too many times. API rate limit exceeded :(");
            });
        } else {
            this.setState({
                searchInput: username,
                results: [],
                currentPage: 1,
                currentData: paginateData([], 1, this.state.itemPerPage)
            });
        }
    }

    handlePageClick = data => {
        this.setState({
            currentPage: data.selected + 1,
            currentData: paginateData(this.state.results, data.selected + 1, this.state.itemPerPage)
        });
    }

    render() {
        return (
            <>
                <Row className="justify-content-center mt-4">
                    <Col xs={12} md={8}>
                        <InputGroup className="search">
                            <InputGroup.Prepend className="search-icon">
                                <InputGroup.Text className="font-19 pr-0">
                                    <FontAwesomeIcon icon={faSearch} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                className="search-input font-19"
                                type="text"
                                placeholder="Search username"
                                onChange={e => this.search(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col xs={12} md={8}>
                        <ListGroup className="mt-4">
                            {
                                this.state.currentData.map((gist) => {
                                    return <SingleGist key={gist.id} gist={gist} />
                                })
                            }
                            {
                                !this.state.results.length &&
                                <ListGroup.Item>
                                    <h5 className="mb-1 d-inline-block font-19 font-weight-bold">
                                        > No Result Found. Can I suggest?
                                    </h5>
                                    <p className="mb-1 font-13">
                                        #schacon #jraddaoui
                                    </p>
                                </ListGroup.Item>
                            }
                        </ListGroup>
                        {this.state.results.length ?
                            <>
                                {paginationTotal(this.state.results.length, this.state.currentPage, this.state.itemPerPage)}
                                <ReactPaginate
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={Math.ceil(this.state.results.length / this.state.itemPerPage)}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination mt-3 mb-4 float-right font-13'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                />
                            </> : <></>}
                    </Col>
                </Row>
            </>
        )
    }
}

export default Search;