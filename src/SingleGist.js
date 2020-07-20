import React, { Component } from 'react';
import { ListGroup, Media, Badge, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faJs, faMarkdown, faPython } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';
import Forks from './Forks';

/**
 * remove duplicated file types and return file type badges up to 3
 * @param {*} files 
 */
const FileTypeBadges = ({ files }) => {
    const fileTypes = Object.keys(files).map(function (key) { return files[key].type });
    const uniqueFileTypes = fileTypes.filter((val, type) => fileTypes.indexOf(val) === type);

    return (
        <React.Fragment>
            { // show up to 3 types
                uniqueFileTypes.slice(0, 3).map((type, index) => {
                    return (
                        <Badge className="badge--file-type mr-2 font-11" key={index}>
                            {type}
                        </Badge>
                    );
                })
            }
            {uniqueFileTypes.length - 3 > 0 &&
                <span className="d-inline-block text-muted font-weight-bold ml-2 font-11">and {uniqueFileTypes.length - 3} more</span>
            }
        </React.Fragment>
    );
};

/**
 * Return custom brand icon
 * @param {*} fileType 
 */
const iconFinder = (fileType) => {
    switch (fileType) {
        case 'application/javascript':
            return faJs;
        case 'text/markdown':
            return faMarkdown;
        case 'application/x-python':
            return faPython;
        default:
            return faFile
    }
};

class SingleGist extends Component {

    render() {
        const gist = this.props.gist;
        return (
            <ListGroup.Item>
                <Row>
                    <Col>
                        <Media className="mt-2">
                            <img
                                width={45}
                                height={45}
                                className="mr-3 rounded-circle"
                                src={gist.owner.avatar_url}
                                alt="Avatar"
                            />
                            <Media.Body>
                                <h5 className="mb-1 d-inline-block font-19 font-weight-bold">
                                    {gist.owner.login}
                                </h5>
                                <p className="font-13 d-inline-block float-right">
                                    {moment(gist.created_at).fromNow()}
                                </p>
                                <p className="mb-1 font-13">
                                    {gist.description}
                                </p>
                                <FileTypeBadges files={gist.files} />
                            </Media.Body>
                        </Media>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <span className="mr-2 d-inline-block">
                            <Forks gistId={gist.id} />
                        </span>
                    </Col>
                </Row>
                <Row className="mt-3 mb-2">
                    <Col>
                        {
                            Object.keys(gist.files).map((key) => {
                                return (
                                    <a href={gist.files[key].raw_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="badge--file font-13 cursor-pointer mr-1 text-nowrap d-inline-block mb-1"
                                    key={key}>
                                        <FontAwesomeIcon className="text-primary mr-1" icon={iconFinder(gist.files[key].type)} />
                                        {gist.files[key].filename}
                                    </a>
                                );
                            })
                        }
                    </Col>
                </Row>
            </ListGroup.Item >
        );
    }
}
export default SingleGist;
