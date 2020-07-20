import React, { Component } from 'react';
import { Modal, ModalBody, ListGroup } from 'react-bootstrap';
import { searchGistForks } from './gistService';

class Forks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forks: [],
            showMore: false
        };
    }

    componentDidMount() {
        if (this.props.gistId) {
            searchGistForks(this.props.gistId).then(response => {
                this.setState({
                    forks: response.data
                });
            });
        }
    }

    /**
     * Toggles the show more modal
     */
    toggleShowMore = () => {
        this.setState(prevState => ({
            showMore: !prevState.showMore,
        }));
    };

    render() {
        return (
            <>
                {this.state.forks.slice(0, 3).map((fork, index) => {
                    return (
                        <span
                            key={index}
                            className="d-inline-block avatar">
                            <img src={fork.owner.avatar_url} className="rounded-circle" alt="users" />
                        </span>
                    );
                })}
                {this.state.forks.length ? <div className="d-inline-block position-absolute ml-md-2 font-11 forks">
                    Forked by
                    <b>
                        {this.state.forks.slice(0, 3).map((fork, index) => {
                            return (
                                <a
                                    key={index}
                                    className="text-default"
                                    href={`https://gist.github.com/${fork.owner.login}/${fork.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"> {fork.owner.login}
                                    {(index < this.state.forks.length - 1 && index < 2) && <span>,</span>}
                                </a>
                            );
                        })}
                    </b>
                    {this.state.forks.length - 3 > 0 && (
                        <React.Fragment>
                            &nbsp;and&nbsp;
                            <b onClick={this.toggleShowMore} className="d-inline-block cursor-pointer">
                                {this.state.forks.length - 3} more
                            </b>
                            <Modal show={this.state.showMore} onHide={this.toggleShowMore}>
                                <Modal.Header>Forks</Modal.Header>
                                <ModalBody>
                                    <ListGroup>
                                        {this.state.forks.map((fork, index) => {
                                            return (
                                                <ListGroup.Item key={index}>
                                                    <img
                                                        width={25}
                                                        height={25}
                                                        className="mr-2 rounded-circle"
                                                        src={fork.owner.avatar_url}
                                                        alt="Avatar"
                                                    />
                                                    <a
                                                        key={index}
                                                        href={`https://gist.github.com/${fork.owner.login}/${fork.id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="d-inline-block mr-1 text-default">
                                                        {fork.owner.login}
                                                    </a>
                                                </ListGroup.Item>
                                            );
                                        })}
                                    </ListGroup>
                                </ModalBody>
                            </Modal>
                        </React.Fragment>
                    )}
                </div> : <div className="d-inline-block ml-md-2 font-11 forks">0 Forks</div>
            }
            </>
        );
    }
}
export default Forks;
