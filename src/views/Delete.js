import React, { useState, useEffect } from 'react';
import Helper from './constants/helper';
import apiUrl from './constants/apiPath';
const Delete = (props) => {
    const [item, setItem] = useState({});
    const deleteItem = async () => {
        // if (confirm("You want to delete employee!")) {
        let postJson = { id: item.id };
        let path = apiUrl.delete_employee + "/" + item._id;
        const fr = await Helper.delete(path);
        const res = await fr.response.json();
        if (fr.status === 200) {
            if (res.success) {
                props.refreshData();
                alert(res.msg);
            } else {
                alert(res.msg);
            }
        } else {
            alert(res.error);
        }
        // }
    };
    useEffect(() => {
        setItem(props.item);
    }, [props.item]);

    return (
        <button onClick={(e) => { deleteItem() }} className="btn btn-warning btn-sm mr-2" type="button" title="Delete">
            Delete
        </button>
    );
}

export default Delete;





