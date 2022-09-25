import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table'
import Helper from './constants/helper';
import apiUrl from './constants/apiPath';
import Delete from './Delete.js';
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const Header = React.lazy(() => import('../DefaultLayout/Header'));

function Home() {
    const [allData, setAllData] = useState([]);
    const [totalitems, setTotalItems] = useState('');
    const [activepage, setActivePage] = useState(1);
    const [query, setQuery] = useState({});

    const getEmployeesList = async (page = activepage) => {
        const itemsPerPage = 10;
        let path;
        setActivePage(page)
        query["page"] = page
        query["itemsPerPage"] = itemsPerPage
        let queryString = Helper.serialize(query);
        path = apiUrl.get_all_employees + `?${queryString}`;
        getData(path)
    };

    const getData = async (path) => {
        const fr = await Helper.get(path);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.success) {
                setAllData(res.results.docs || []);
                setTotalItems(res.results.totalDocs);
                alert.success(res.error);
            } else {
                alert.error(res.error);
            }
        } else {
            alert.error(res.error);
        }
    }

    useEffect(() => {
        getEmployeesList();
    }, [])

    return (
        <div className="container-full">
            <Header title="Home Page" />
            <div className="row mt-3 ">
                <aside className="col-md-9">
                    <div className="row">
                        <div className="row mt-5">
                            <Link to={{ pathname: `/add-employee` }} className="btn-link">
                                <button className="btn btn-warning btn-sm mr-2" type="button" title="Add Employee">
                                    Add Employee
                                </button>
                            </Link>
                        </div>
                        <div className="mt-5">
                            <Table striped bordered={true} hover responsive="lg">
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Name</th>
                                        <th>Email ID</th>
                                        <th>Age</th>
                                        <th>DOB</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allData && allData.map((item, i) => {
                                        return <tr key={i} >
                                            <td>{item.photo}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.age}</td>
                                            <td>{item.dob}</td>
                                            <td>{item.address}</td>
                                            <td className="text-align-center">
                                                <div>
                                                    <Link to={{ pathname: `/edit-employee/${item._id}` }} className="btn-link">
                                                        <button className="btn btn-warning btn-sm mr-2" type="button" title="Edit">
                                                            Edit
                                                        </button>
                                                    </Link>
                                                    <Delete item={item} refreshData={getEmployeesList} />
                                                    {/* <View item={item} /> */}

                                                </div>

                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        </div >
                        {(allData.length > 0 )&& <div className="show-pagination technician-page">
                            <Pagination
                                activeClass={""}
                                activeLinkClass={"page-link active"}
                                itemClass={"page-item"}
                                linkClass={"page-link"}
                                activePage={activepage}
                                itemsCountPerPage={10}
                                totalItemsCount={totalitems}
                                pageRangeDisplayed={4}
                                prevPageText="Previous"
                                nextPageText="Next"
                                firstPageText="<"
                                lastPageText=">"
                                onChange={getEmployeesList}
                            />
                        </div>
                        }
                    </div>
                </aside>
            </div >
        </div >
    )
}

export default Home;